"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { Coords } from "@/types/coords";

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
  };

  const [allCoords, setAllCoords] = useState<Coords[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [formShown, setFormShown] = useState<boolean>(false);
  const [data, setData] = useState<Source>(emptyData);
  const [mapData, setMapData] = useState<Coords>();
  const [err, setErr] = useState<string>("");

  const getSources = async () => {
    try {
      const res = await axios.get("/api/sources");
      dispatch(setSources(res.data));

      setErr("");
    } catch (err) {
      setErr("Ошибка загрузки данных");
    }
  };

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

  const removeSource = async (id: string) => {
    try {
      await axios.delete(`/api/sources/${id}`);
      dispatch(deleteSource(id));

      setErr("");
    } catch (err) {
      setErr("Ошибка удаления данных");
    }
  };

  useEffect(() => {
    getSources();
  }, []);

  useEffect(() => {
    const coords: Coords[] = sources.map((source) => [
      source.latitude,
      source.longitude,
    ]);
    setAllCoords(coords);
  }, [sources]);

  useEffect(() => {
    setMapData([data.latitude, data.longitude]);
  }, [data.latitude, data.longitude]);

  const filteredSources = sources.filter((source) =>
    source.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleClick = (id?: string) => {
    setFormShown(true);

    if (id) {
      const sourceFound = sources.find((source: Source) => source.id === id);
      if (sourceFound) setData(sourceFound);
    } else {
      setData(emptyData);
    }
  };

  const saveData = (newData: Source) => {
    if (newData.id) {
      updateSource(newData);
    } else {
      saveSource(newData);
    }
    setData(emptyData);
  };

  return (
    <main
      className={`relative grid ${
        formShown ? "grid-cols-[26rem_26rem_auto]" : "grid-cols-[26rem_auto]"
      } gap-6 bg-[#f8f9fa] dark:bg-[#212529]`}
    >
      <ThemeSwitcher />
      <section className="p-4 h-full w-full bg-[#e9ecef] dark:bg-[#343a40] rounded-2xl">
        <h1 className="mb-6 text-center text-2xl dark:text-[#f8f9fa]">
          Источники
        </h1>
        <div className="grid gap-4">
          <div className="p-2 px-3 grid gap-1 bg-[#f8f9fa] dark:bg-[#495057] rounded-xl">
            <label className="text-sm dark:text-[#f8f9fa]" htmlFor="search">
              Поиск
            </label>
            <div className="flex items-center gap-2">
              <LuSearch stroke="#797980" />
              <input
                id="search"
                name="search"
                className="w-full text-base dark:text-[#f8f9fa] dark:placeholder:text-[#adb5bd] focus-visible:outline-none"
                type="text"
                placeholder="Поиск по названию или ID..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl dark:text-[#f8f9fa]">
            <span>Новый источник</span>
            <button
              aria-label="Добавить источник"
              className="p-2 rounded-xl bg-[#f8f9fa] hover:bg-[#e9ecef] transition duration-300 ease-in-out"
              onClick={() => handleClick()}
            >
              <LuPlus aria-hidden="true" stroke="#212529" />
            </button>
          </div>
          {err && <p className="text-[#e5383b]">{err}</p>}
          <ul className="grid gap-2">
            {filteredSources.map((source) => (
              <li key={source.id} className="flex gap-3">
                <div className="grow flex gap-1">
                  <button
                    className="w-full py-2 px-3 flex items-center justify-between bg-[#495057] hover:bg-[#6c757d] transition duration-300 ease-in-out font-medium rounded-xl text-[#f8f9fa]"
                    onClick={() => handleClick(source.id)}
                  >
                    <span>{source.title}</span>
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
          initialData={data}
        />
      )}

      {data.latitude !== 0 && data.longitude !== 0 ? (
        <YandexMapComponent coords={mapData} />
      ) : (
        <YandexMapComponent allCoords={allCoords} />
      )}
    </main>
  );
}
