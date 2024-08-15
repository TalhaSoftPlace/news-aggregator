import React, { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../../interfaces";
import { Button } from "react-bootstrap";
import { ReactComponent as ArrowIcon } from "../Images/ArrowIcon.svg";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  handleTryAgain = (): void => {
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-left ">
            <h2 className="text-2xl font-bold mb-4">
              Oops, something went wrong!
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              We apologize for the inconvenience.
            </p>
            <Button
              className="card-btn"
              onClick={this.handleTryAgain}
              target="_blank"
            >
              Try Again <ArrowIcon className="arrow-icon" />
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
