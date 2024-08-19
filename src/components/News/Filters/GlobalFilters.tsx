import { DropDownItem } from "../../../interfaces";
import { GlobalFiltersProps } from "../../../interfaces/filters";
import { Sources } from "../../../types";
import { DatePicker } from "../../ui/DatePicker/DatePicker";
import { DropDown } from "../../ui/DropDown/DropDown";

const DATA_SOURCE: DropDownItem[] = [
  { label: "All", value: Sources.All },
  { label: "News", value: Sources.News },
  { label: "The Guardian", value: Sources.The_GUARDIAN_NEWS },
  { label: "New York Times", value: Sources.NEW_YORK_TIMES },
];

export const GlobalFilters = ({
  onDataSourceChange,
  onDateChange,
}: GlobalFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <DropDown
        title="Data Source"
        items={DATA_SOURCE}
        onItemChange={onDataSourceChange}
        className="flex-1"
      />
      <DatePicker
        label="From"
        onDateChange={(date: string) => onDateChange("from", date)}
        className="flex-1"
      />
      <DatePicker
        label="To"
        onDateChange={(date: string) => onDateChange("to", date)}
        className="flex-1"
      />
    </div>
  );
};
