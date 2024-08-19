import { GlobalKeys } from "../types";
import { DatePickerKeys, DropDownKeys } from "../types/ui";

export interface DropDownItem {
  [DropDownKeys.label]: string;
  [DropDownKeys.value]: string;
}

export interface DropDownProps {
  [DropDownKeys.items]?: DropDownItem[] | null;
  [DropDownKeys.onItemChange]: (value: string) => void;
  [DropDownKeys.title]: string;
  [GlobalKeys.className]?: string;
}

export interface DatePickerProps {
  [DatePickerKeys.onDateChange]: (value: string) => void;
  [DatePickerKeys.label]: string;
  [GlobalKeys.className]?: string;
}
