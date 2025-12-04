"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  setSources,
  addSource,
  editSource,
  deleteSource,
} from "@/store/slices/sourcesSlice";

import { SourceForm } from "@/components/SourceForm";
import YandexMapComponent from "@/components/Map";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Sources } from "@/components/Sources";

export default function SourcesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const sources = useSelector((state: RootState) => state.sources.list);
  const emptyData = {
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

  const [data, setData] = useState<Source>(emptyData);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");

  const [placemarkList, setPlacemarkList] = useState<PlacemarkProps[]>([]);
  const [placemark, setPlacemark] = useState<PlacemarkProps>();

  const [formShown, setFormShown] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/sources");
        dispatch(setSources(res.data));

        setErr("");
      } catch (err) {
        setErr("Ошибка загрузки данных");
      }
      setLoading(false);
    })();
  }, []);

  const saveSource = async (source: Source) => {
    try {
      const { id, ...rest } = source;
      const res = await axios.post("/api/sources", rest);
      dispatch(addSource(res.data));

      setErr("");
    } catch (err) {
      setErr("Ошибка сохранения данных");
    }
  };

  const updateSource = async (source: Source) => {
    try {
      const { id, ...rest } = source;
      const res = await axios.patch(`/api/sources/${source.id}`, rest);
      dispatch(editSource(res.data));

      setErr("");
    } catch (err) {
      setErr("Ошибка изменения данных");
    }
  };

  const saveData = (newData: Source) => {
    if (newData.id) {
      updateSource(newData);
    } else {
      saveSource(newData);
    }
    setData(emptyData);
    setFormShown(false);
  };

  const removeSource = async (id: string) => {
    try {
      await axios.delete(`/api/sources/${id}`);
      dispatch(deleteSource(id));

      setErr("");
    } catch (err) {
      setErr("Ошибка удаления данных");
    }
    if (data.id) setFormShown(false);
  };

  const handleClick = (id?: string) => {
    setFormShown(true);

    if (id) {
      const sourceFound = sources.find((source: Source) => source.id === id);
      if (sourceFound) setData(sourceFound);
    } else {
      setData(emptyData);
    }
  };

  useEffect(() => {
    const data: PlacemarkProps[] = sources.map((source) => ({
      coords: [source.latitude, source.longitude],
      status: source.status,
      sourceID: source.id,
    }));
    setPlacemarkList(data);
  }, [sources]);

  useEffect(() => {
    setPlacemark({
      coords: [data.latitude, data.longitude],
      status: data.status,
      sourceID: data.id,
    });
  }, [data.latitude, data.longitude, data.status, data.id]);

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
        err={err}
        removeSource={removeSource}
        handleClick={handleClick}
      />
      {formShown && (
        <SourceForm
          onSubmit={(formData) => saveData(formData)}
          onChange={setData}
          onClick={() => setFormShown(false)}
          initialData={data}
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
