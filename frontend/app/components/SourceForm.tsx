import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/ui/Input";
import { LuChevronLeft } from "react-icons/lu";

interface CreateSourceProps {
  onChange: (data: Source) => void;
  onSubmit: (formData: Source) => void;
  onClick: () => void;
  initialData: Source;
}

export const SourceForm = ({
  onChange,
  onSubmit,
  onClick,
  initialData,
}: CreateSourceProps) => {
  const [formData, setFormData] = useState<Source>({
    id: "",
    title: "",
    latitude: 0,
    longitude: 0,
    email: "",
    tel: "",
    workingHours: "",
    company: "",
    status: "notSpecified",
  });

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    onChange({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <section className="flex flex-col gap-6 p-4 h-full bg-[#e9ecef] dark:bg-[#343a40] rounded-2xl">
      <div className="flex justify-between items-center">
        <button
          onClick={onClick}
          aria-label={`Скрыть форму ${
            formData.id ? "изменения" : "создания"
          } источника`}
        >
          <LuChevronLeft
            aria-hidden="true"
            size={20}
            className="stroke-[#212529] dark:stroke-[#f8f9fa]"
          />
        </button>
        <h1 className="text-center text-2xl text-[#212529] dark:text-[#f8f9fa]">
          {formData.id ? "Изменить источник" : "Создать источник"}
        </h1>
      </div>
      <form className="h-full flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            label="Наименование"
            id="title"
            placeholder="Карьер #1"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Широта"
            id="latitude"
            type="number"
            step="any"
            min={-90}
            max={90}
            value={formData.latitude}
            onChange={handleChange}
            required
          />
          <Input
            label="Долгота"
            id="longitude"
            type="number"
            step="any"
            min={-180}
            max={180}
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="mail@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Телефон"
            id="tel"
            type="tel"
            placeholder="+7 (900) 123-45-67"
            telValue={formData.tel}
            onTelChange={(value) => setFormData({ ...formData, tel: value })}
          />
          <Input
            label="Часы работы"
            id="workingHours"
            placeholder="Пн-пт, 9-17"
            value={formData.workingHours}
            onChange={handleChange}
          />
          <Input
            label="Название компании"
            id="company"
            placeholder='ООО "Название компании"'
            value={formData.company}
            onChange={handleChange}
          />
          <div className="grid gap-1 py-2 px-3 bg-[#f8f9fa] dark:bg-[#495057] rounded-xl">
            <label
              htmlFor="status"
              className={"text-sm text-[#212529] dark:text-[#f8f9fa]"}
            >
              Статус
            </label>
            <select
              name="status"
              id="status"
              className="text-base text-[#212529] placeholder:text-[#6c757d] dark:text-[#f8f9fa] dark:placeholder:text-[#adb5bd] focus-visible:outline-none"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="notSpecified">Не указан</option>
              <option value="active">Активный</option>
              <option value="inactive">Неактивный</option>
              <option value="inProgress">В разработке</option>
            </select>
          </div>
        </div>

        <button
          className="w-full mt-auto py-2 px-3 text-[#f8f9fa] bg-[#212529] hover:bg-[#343a40] dark:bg-[#f8f9fa] dark:hover:bg-[#e9ecef] transition duration-300 ease-in-out rounded-xl font-medium dark:text-[#212529]"
          type="submit"
        >
          {formData.id ? "Сохранить" : "Добавить"}
        </button>
      </form>
    </section>
  );
};
