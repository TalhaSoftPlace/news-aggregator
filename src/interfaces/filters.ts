import { FiltersKeys } from "../types/filters";

export interface GlobalFiltersProps {
  [FiltersKeys.onDataSourceChange]: (sources: string) => void;
  [FiltersKeys.onDateChange]: (range: "from" | "to", date: string) => void;
}
