import React from "react";
import RemoteRouteErrorBoundary from "./RemoteRouteErrorBoundary";
import { clearRemoteRuntime, getLazyRemoteComponent } from "./remoteRuntime";
import RemoteRouteState from "./RemoteRouteState";
import type { RemoteAppConfig } from "./types";

type RemoteRouteProps = {
  remoteApp: RemoteAppConfig;
};

const RemoteRoute = ({ remoteApp }: RemoteRouteProps) => {
  const [retryToken, setRetryToken] = React.useState(0);
  const LazyRemoteComponent = React.useMemo(
    () => getLazyRemoteComponent(remoteApp, retryToken),
    [remoteApp, retryToken]
  );

  const handleRetry = () => {
    clearRemoteRuntime(remoteApp, retryToken);
    setRetryToken((currentToken) => currentToken + 1);
  };

  return (
    <RemoteRouteErrorBoundary
      key={`${remoteApp.id}:${retryToken}`}
      onRetry={handleRetry}
      remoteApp={remoteApp}
    >
      <React.Suspense fallback={<RemoteRouteState remoteApp={remoteApp} variant="loading" />}>
        <LazyRemoteComponent />
      </React.Suspense>
    </RemoteRouteErrorBoundary>
  );
};

export default RemoteRoute;
