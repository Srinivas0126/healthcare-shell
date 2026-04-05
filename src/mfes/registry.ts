import HealthRecordsPage from "../pages/HealthRecordsPage";
import { ModuleFederationContract, RemoteAppConfig } from "./types";

const defaultRemoteEntryUrls = {
  dashboard: "http://localhost:3004/remoteEntry.js",
  healthRecords: "http://localhost:3005/remoteEntry.js",
  appointments: "http://localhost:3002/remoteEntry.js",
  billing: "http://localhost:3003/remoteEntry.js"
} as const;

const defaultHostName = "healthcare_shell";

export const moduleFederationContract: ModuleFederationContract = {
  defaultExposedModule: "./App",
  hostName: typeof __MF_HOST_NAME__ !== "undefined" ? __MF_HOST_NAME__ : defaultHostName,
  sharedPackages: ["react", "react-dom", "react-router-dom"],
  supportedExposedModules: ["./App", "./Routes"]
};

export const remoteEntryUrls = {
  dashboard:
    typeof __DASHBOARD_REMOTE_ENTRY_URL__ !== "undefined"
      ? __DASHBOARD_REMOTE_ENTRY_URL__
      : defaultRemoteEntryUrls.dashboard,
  healthRecords:
    typeof __HEALTH_RECORDS_REMOTE_ENTRY_URL__ !== "undefined"
      ? __HEALTH_RECORDS_REMOTE_ENTRY_URL__
      : defaultRemoteEntryUrls.healthRecords,
  appointments:
    typeof __APPOINTMENTS_REMOTE_ENTRY_URL__ !== "undefined"
      ? __APPOINTMENTS_REMOTE_ENTRY_URL__
      : defaultRemoteEntryUrls.appointments,
  billing:
    typeof __BILLING_REMOTE_ENTRY_URL__ !== "undefined"
      ? __BILLING_REMOTE_ENTRY_URL__
      : defaultRemoteEntryUrls.billing
} as const;

export const remoteApps: RemoteAppConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    basePath: "/dashboard",
    remoteName: "dashboard",
    remoteEntryUrl: remoteEntryUrls.dashboard,
    exposedModule: moduleFederationContract.defaultExposedModule,
    requiresAuth: true,
    showInMenu: true,
    menuOrder: 1
  },
  {
    id: "health-records",
    label: "Health records",
    basePath: "/health-records",
    remoteName: "healthRecords",
    remoteEntryUrl: remoteEntryUrls.healthRecords,
    exposedModule: moduleFederationContract.defaultExposedModule,
    requiresAuth: true,
    showInMenu: true,
    menuOrder: 2,
    localFallbackComponent: HealthRecordsPage
  },
  {
    id: "appointments",
    label: "Appointments",
    basePath: "/appointments",
    remoteName: "appointments",
    remoteEntryUrl: remoteEntryUrls.appointments,
    exposedModule: moduleFederationContract.defaultExposedModule,
    requiresAuth: true,
    showInMenu: true,
    menuOrder: 3
  },
  {
    id: "billing",
    label: "Billing",
    basePath: "/billing",
    remoteName: "billing",
    remoteEntryUrl: remoteEntryUrls.billing,
    exposedModule: moduleFederationContract.defaultExposedModule,
    requiresAuth: true,
    showInMenu: true,
    menuOrder: 4
  }
];
