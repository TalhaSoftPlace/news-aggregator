export type ToastType = "error" | "success" | "info";

export interface ToastContextType {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}
