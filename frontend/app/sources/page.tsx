"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { set, add, update, remove } from "@/store/slices/sourcesSlice";

import { SourceForm } from "@/components/SourceForm";
import YandexMapComponent from "@/components/Map";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Sources } from "@/components/Sources";

export default function SourcesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const sources = useSelector((state: RootState) => state.sources.list);
  const emptySource = {
    id: "",
    title: "",
    latitude: 0,
    longitude: 0,
    email: "",
    tel: "",
    workingHours: "",
    company: "",
    status: "notSpecified",
  };

  const [source, setSource] = useState<Source>(emptySource);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [placemarkList, setPlacemarkList] = useState<PlacemarkProps[]>([]);
  const [placemark, setPlacemark] = useState<PlacemarkProps>();

  const [formShown, setFormShown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/sources");
        dispatch(set(res.data));
      } catch (error) {
        setError("Ошибка загрузки данных");
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const list: PlacemarkProps[] = sources.map((source) => ({
      coords: [source.latitude, source.longitude],
      status: source.status,
      sourceID: source.id,
    }));
    setPlacemarkList(list);
  }, [sources]);

  useEffect(() => {
    setPlacemark({
      coords: [source.latitude, source.longitude],
      status: source.status,
      sourceID: source.id,
    });
  }, [source.latitude, source.longitude, source.status, source.id]);

  const saveSource = async (source: Source) => {
    try {
      const { id, ...rest } = source;
      const res = await axios.post("/api/sources", rest);
      dispatch(add(res.data));
    } catch (error) {
      setError("Ошибка сохранения данных");
    }
  };

  const updateSource = async (source: Source) => {
    try {
      const { id, ...rest } = source;
      const res = await axios.patch(`/api/sources/${source.id}`, rest);
      dispatch(update(res.data));
    } catch (error) {
      setError("Ошибка изменения данных");
    }
  };

  const removeSource = async (id: string) => {
    try {
      await axios.delete(`/api/sources/${id}`);
      dispatch(remove(id));
    } catch (error) {
      setError("Ошибка удаления данных");
    }
    if (source.id) setFormShown(false);
  };

  const handleData = (newData: Source) => {
    if (newData.id) {
      updateSource(newData);
    } else {
      saveSource(newData);
    }
    setSource(emptySource);
    setFormShown(false);
  };

  const handleClick = (id?: string) => {
    setFormShown(true);

    if (id) {
      const sourceFound = sources.find((source: Source) => source.id === id);
      if (sourceFound) setSource(sourceFound);
    } else {
      setSource(emptySource);
    }
  };

  return (
    <main
      className={`relative grid ${
        formShown ? "grid-cols-[26rem_26rem_auto]" : "grid-cols-[26rem_auto]"
      } gap-6 bg-[#f8f9fa] dark:bg-[#212529]`}
    >
      <ThemeSwitcher />
      <Sources
        sources={sources}
        loading={loading}
        error={error}
        removeSource={removeSource}
        handleClick={handleClick}
      />
      {formShown && (
        <SourceForm
          onSubmit={(formData) => handleData(formData)}
          onChange={setSource}
          onClick={() => setFormShown(false)}
          initialData={source}
        />
      )}

      {formShown ? (
        <YandexMapComponent placemark={placemark} onClick={handleClick} />
      ) : (
        <YandexMapComponent
          placemarkList={placemarkList}
          onClick={handleClick}
        />
      )}
    </main>
  );
}
