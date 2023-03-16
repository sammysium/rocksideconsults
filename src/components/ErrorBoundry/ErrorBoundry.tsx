import React, { Component, ErrorInfo, ReactNode } from "react";
import { Text } from "react-native-paper"

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): IState {
  /*
    We have an error here. We can get the error if we want to use it say in sentry or some other analytics lib
    for now just update the state
  */
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Text>Oops! Something in the showing you the form UI, we got uncaught error....</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;