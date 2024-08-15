import { DropDownKeys } from "../types/ui";

export interface DropDownItem {
  [DropDownKeys.label]: string;
  [DropDownKeys.value]: string;
}

export interface DropDownProps {
  [DropDownKeys.items]: DropDownItem[] | null;
  [DropDownKeys.onItemChange]: (value: string) => void;
  loading: boolean;
}
