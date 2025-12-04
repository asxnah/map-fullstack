import { useState } from "react";
import { SourcesLoadingShimmer } from "@/components/SourcesLoadingShimmer";
import { LuChevronRight, LuPlus, LuSearch, LuTrash2 } from "react-icons/lu";

interface Sources {
  sources: Source[];
  handleClick: (id?: string) => void;
  loading: boolean;
  err: string;
  removeSource: (id: string) => void;
}

export const Sources = ({
  sources,
  handleClick,
  loading,
  err,
  removeSource,
}: Sources) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredSources = sources.filter((source) =>
    source.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
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
  );
};
