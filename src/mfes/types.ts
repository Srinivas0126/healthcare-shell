import type { ComponentType } from "react";

export type RemoteExposedModule = "./App" | "./Routes";

export type ModuleFederationContract = {
  defaultExposedModule: RemoteExposedModule;
  hostName: string;
  sharedPackages: readonly string[];
  supportedExposedModules: readonly RemoteExposedModule[];
};

export type RemoteAppConfig = {
  id: string;
  label: string;
  basePath: string;
  remoteName: string;
  remoteEntryUrl: string;
  exposedModule: RemoteExposedModule;
  requiresAuth: boolean;
  showInMenu: boolean;
  menuOrder: number;
  icon?: string;
  localFallbackComponent?: ComponentType;
};
