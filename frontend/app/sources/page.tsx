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
import { SourcesLoadingShimmer } from "@/components/SourcesLoadingShimmer";

import { LuChevronRight, LuPlus, LuSearch, LuTrash2 } from "react-icons/lu";

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

  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");

  const [placemarkList, setPlacemarkList] = useState<PlacemarkProps[]>([]);
  const [placemark, setPlacemark] = useState<PlacemarkProps>();

  const [searchValue, setSearchValue] = useState("");
  const [formShown, setFormShown] = useState<boolean>(false);

  const [data, setData] = useState<Source>(emptyData);

  const getSources = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/sources");
      dispatch(setSources(res.data));

      setErr("");
    } catch (err) {
      setErr("Ошибка загрузки данных");
    }
    setLoading(false);
  };
  useEffect(() => {
    getSources();
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
    }));
    setPlacemarkList(data);
  }, [sources]);

  useEffect(() => {
    setPlacemark({
      coords: [data.latitude, data.longitude],
      status: data.status,
    });
  }, [data.latitude, data.longitude, data.status]);

  const filteredSources = sources.filter((source) =>
    source.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <main
      className={`relative grid ${
        formShown ? "grid-cols-[26rem_26rem_auto]" : "grid-cols-[26rem_auto]"
      } gap-6 bg-[#f8f9fa] dark:bg-[#212529]`}
    >
      <ThemeSwitcher />
      <section className="p-4 h-full w-full bg-[#e9ecef] dark:bg-[#343a40] rounded-2xl">
        <h1 className="mb-6 text-center text-2xl text-[#212529] dark:text-[#f8f9fa]">
          Источники
        </h1>
        <div className="grid gap-4">
          <div className="p-2 px-3 grid gap-1 bg-[#f8f9fa] dark:bg-[#495057] rounded-xl">
            <label
              className="text-sm text-[#212529] dark:text-[#f8f9fa]"
              htmlFor="search"
            >
              Поиск
            </label>
            <div className="flex items-center gap-2">
              <LuSearch stroke="#797980" />
              <input
                id="search"
                name="search"
                className="w-full text-base text-[#212529] placeholder:text-[#6c757d] dark:text-[#f8f9fa] dark:placeholder:text-[#adb5bd] focus-visible:outline-none"
                type="text"
                placeholder="Поиск по названию или ID..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl">
            <span className="text-[#212529] dark:text-[#f8f9fa]">
              Новый источник
            </span>
            <button
              aria-label="Добавить источник"
              className="p-2 rounded-xl bg-[#f8f9fa] hover:bg-[#e9ecef] transition duration-300 ease-in-out"
              onClick={() => handleClick()}
            >
              <LuPlus aria-hidden="true" stroke="#212529" />
            </button>
          </div>
          {err && <p className="text-[#e5383b]">{err}</p>}
          {loading && <SourcesLoadingShimmer />}
          <ul className="grid gap-2">
            {filteredSources.map((source) => (
              <li key={source.id} className="flex gap-3">
                <div className="grow flex gap-1">
                  <button
                    className="w-full py-2 px-3 flex items-center justify-between bg-[#495057] hover:bg-[#6c757d] transition duration-300 ease-in-out font-medium rounded-xl"
                    onClick={() => handleClick(source.id)}
                  >
                    <span className="text-[#f8f9fa]">{source.title}</span>
                    <LuChevronRight stroke="#f8f9fa" />
                  </button>
                </div>
                <button
                  aria-label="Удалить источник"
                  className="px-3 py-2 rounded-xl bg-[#f8f9fa] hover:bg-[#e9ecef] transition duration-300 ease-in-out"
                  onClick={() => removeSource(source.id)}
                >
                  <LuTrash2 aria-hidden="true" stroke="#212529" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {formShown && (
        <SourceForm
          onSubmit={(formData) => saveData(formData)}
          onChange={setData}
          onClick={() => setFormShown(false)}
          initialData={data}
        />
      )}

      {formShown ? (
        <YandexMapComponent placemark={placemark} />
      ) : (
        <YandexMapComponent placemarkList={placemarkList} />
      )}
    </main>
  );
}
