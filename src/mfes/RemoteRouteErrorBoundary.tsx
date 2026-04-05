import React from "react";
import { isRemoteUnavailableError } from "./remoteRuntime";
import RemoteRouteState from "./RemoteRouteState";
import type { RemoteAppConfig } from "./types";

type RemoteRouteErrorBoundaryProps = {
  children: React.ReactNode;
  onRetry: () => void;
  remoteApp: RemoteAppConfig;
};

type RemoteRouteErrorBoundaryState = {
  error: Error | null;
};

class RemoteRouteErrorBoundary extends React.Component<
  RemoteRouteErrorBoundaryProps,
  RemoteRouteErrorBoundaryState
> {
  state: RemoteRouteErrorBoundaryState = {
    error: null
  };

  static getDerivedStateFromError(error: Error): RemoteRouteErrorBoundaryState {
    return {
      error
    };
  }

  render() {
    if (this.state.error) {
      const LocalFallbackComponent = this.props.remoteApp.localFallbackComponent;

      if (LocalFallbackComponent && isRemoteUnavailableError(this.state.error)) {
        return <LocalFallbackComponent />;
      }

      return (
        <RemoteRouteState
          errorMessage={this.state.error.message}
          onRetry={this.props.onRetry}
          remoteApp={this.props.remoteApp}
          variant="error"
        />
      );
    }

    return this.props.children;
  }
}

export default RemoteRouteErrorBoundary;
