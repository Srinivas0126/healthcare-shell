import React from "react";
import type { RemoteAppConfig } from "./types";

type ModuleFederationContainer = {
  get: (module: string) => Promise<() => unknown>;
  init: (shareScope: unknown) => Promise<void> | void;
  __healthcareShellInitialized__?: boolean;
};

type RemoteWindow = Record<string, unknown>;

type RemoteLoadErrorCode =
  | "container_init_failed"
  | "container_missing"
  | "entry_unavailable"
  | "module_unavailable";

export class RemoteLoadError extends Error {
  code: RemoteLoadErrorCode;

  constructor(message: string, code: RemoteLoadErrorCode) {
    super(message);
    this.name = "RemoteLoadError";
    this.code = code;
  }
}

export const isRemoteUnavailableError = (error: unknown) =>
  error instanceof RemoteLoadError &&
  ["container_init_failed", "container_missing", "entry_unavailable"].includes(error.code);

const remoteScriptCache = new Map<string, Promise<void>>();
const remoteComponentCache = new Map<string, React.LazyExoticComponent<React.ComponentType>>();

const getRemoteWindow = (): RemoteWindow => window as unknown as RemoteWindow;

const getRemoteCacheKey = (remoteApp: RemoteAppConfig, retryToken: number) =>
  `${remoteApp.remoteName}:${remoteApp.exposedModule}:${retryToken}`;

const removeRemoteScripts = (remoteApp: RemoteAppConfig) => {
  const matchingScripts = document.querySelectorAll<HTMLScriptElement>(
    `script[data-remote="${remoteApp.remoteName}"]`
  );

  matchingScripts.forEach((scriptElement) => {
    scriptElement.remove();
  });
};

export const clearRemoteRuntime = (remoteApp: RemoteAppConfig, retryToken?: number) => {
  remoteScriptCache.delete(remoteApp.remoteEntryUrl);

  if (typeof retryToken === "number") {
    remoteComponentCache.delete(getRemoteCacheKey(remoteApp, retryToken));
  }

  removeRemoteScripts(remoteApp);

  const remoteWindow = getRemoteWindow();
  delete remoteWindow[remoteApp.remoteName];
};

const getRemoteContainer = (remoteApp: RemoteAppConfig): ModuleFederationContainer => {
  const remoteWindow = getRemoteWindow();
  const remoteContainer = remoteWindow[remoteApp.remoteName] as ModuleFederationContainer | undefined;

  if (!remoteContainer) {
    throw new RemoteLoadError(
      `Remote container ${remoteApp.remoteName} was not found on window.`,
      "container_missing"
    );
  }

  return remoteContainer;
};

const ensureRemoteScript = (remoteApp: RemoteAppConfig) => {
  const existingContainer = getRemoteWindow()[remoteApp.remoteName] as ModuleFederationContainer | undefined;

  if (existingContainer) {
    return Promise.resolve();
  }

  const existingRequest = remoteScriptCache.get(remoteApp.remoteEntryUrl);

  if (existingRequest) {
    return existingRequest;
  }

  const scriptRequest = new Promise<void>((resolve, reject) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = remoteApp.remoteEntryUrl;
    scriptElement.type = "text/javascript";
    scriptElement.async = true;
    scriptElement.dataset.remote = remoteApp.remoteName;

    scriptElement.onload = () => {
      try {
        getRemoteContainer(remoteApp);
        resolve();
      } catch (error) {
        clearRemoteRuntime(remoteApp);
        reject(error);
      }
    };

    scriptElement.onerror = () => {
      clearRemoteRuntime(remoteApp);
      reject(new RemoteLoadError(`Unable to load remote entry for ${remoteApp.label}.`, "entry_unavailable"));
    };

    document.head.appendChild(scriptElement);
  });

  remoteScriptCache.set(remoteApp.remoteEntryUrl, scriptRequest);
  return scriptRequest;
};

const initializeRemoteContainer = async (remoteApp: RemoteAppConfig) => {
  await __webpack_init_sharing__("default");

  const remoteContainer = getRemoteContainer(remoteApp);

  if (!remoteContainer.__healthcareShellInitialized__) {
    try {
      await remoteContainer.init(__webpack_share_scopes__.default);
      remoteContainer.__healthcareShellInitialized__ = true;
    } catch (error) {
      throw new RemoteLoadError(
        `Unable to initialize remote container for ${remoteApp.label}: ${
          error instanceof Error ? error.message : "Unknown remote initialization failure."
        }`,
        "container_init_failed"
      );
    }
  }

  return remoteContainer;
};

const loadRemoteModule = async (remoteApp: RemoteAppConfig) => {
  await ensureRemoteScript(remoteApp);
  const remoteContainer = await initializeRemoteContainer(remoteApp);
  const moduleFactory = await remoteContainer.get(remoteApp.exposedModule);
  const moduleExports = moduleFactory() as Record<string, unknown>;
  const resolvedModule = moduleExports.default ?? moduleExports;

  if (!resolvedModule) {
    throw new RemoteLoadError(
      `Remote ${remoteApp.remoteName} did not provide a usable module for ${remoteApp.exposedModule}.`,
      "module_unavailable"
    );
  }

  return {
    default: resolvedModule as React.ComponentType
  };
};

export const getLazyRemoteComponent = (remoteApp: RemoteAppConfig, retryToken: number) => {
  const cacheKey = getRemoteCacheKey(remoteApp, retryToken);
  const cachedComponent = remoteComponentCache.get(cacheKey);

  if (cachedComponent) {
    return cachedComponent;
  }

  const lazyRemoteComponent = React.lazy(() => loadRemoteModule(remoteApp));
  remoteComponentCache.set(cacheKey, lazyRemoteComponent);
  return lazyRemoteComponent;
};
