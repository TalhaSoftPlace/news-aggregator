import React, { ReactNode, createContext, useContext } from "react";
import { ToastContextType, ToastType } from "../../interfaces";
import { Toast } from "../Toast/toast";

declare global {
  function showSuccess(message: string): void;
  function showError(message: string, toastType?: ToastType): void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

class ToastProvider extends React.Component<{
  children: ReactNode;
}> {
  state = {
    toast: null as { type: ToastType; message: string } | null,
  };

  componentDidMount() {
    globalThis.showError = this.showError;
    globalThis.showSuccess = this.showSuccess;
  }

  showError = (message: string, toastType?: ToastType) => {
    this.setState({ toast: { type: toastType || "error", message } });
  };

  showSuccess = (message: string) => {
    this.setState({ toast: { type: "success", message } });
  };

  handleToastClose() {
    this.setState({ toast: null });
  }
  

  render() {
    const { children } = this.props;

    return (
      <ToastContext.Provider
        value={{
          showError: this.showError,
          showSuccess: this.showSuccess,
        }}
      >
        {children}
        {this.state.toast && (
          <Toast
            message={this.state.toast.message}
            type={this.state.toast.type}
          />
        )}
      </ToastContext.Provider>
    );
  }
}

export default ToastProvider;

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
