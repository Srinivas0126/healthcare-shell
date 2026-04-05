import { remoteApps } from "../mfes/registry";

export type ShellRouteKind = "local" | "remote";
export type ShellRouteGroup = "shell" | "apps";

export type ShellRouteDefinition = {
  description: string;
  id: string;
  kind: ShellRouteKind;
  navGroup: ShellRouteGroup;
  navPath: string;
  path: string;
  requiresAuth: boolean;
  showInSidebar: boolean;
  title: string;
};

const shellBaseRoutes: ShellRouteDefinition[] = [
  {
    id: "home",
    title: "Home",
    description: "Shell landing page and implementation overview.",
    path: "/",
    navPath: "/",
    requiresAuth: false,
    kind: "local",
    navGroup: "shell",
    showInSidebar: true
  },
  {
    id: "login",
    title: "Login",
    description: "Local shell login route for shell-managed authentication.",
    path: "/login",
    navPath: "/login",
    requiresAuth: false,
    kind: "local",
    navGroup: "shell",
    showInSidebar: true
  }
];

const remoteBaseRoutes: ShellRouteDefinition[] = remoteApps.map((remoteApp) => ({
  id: remoteApp.id,
  title: remoteApp.label,
  description: `${remoteApp.label} base route reserved for the hosted micro frontend.`,
  path: `${remoteApp.basePath}/*`,
  navPath: remoteApp.basePath,
  requiresAuth: remoteApp.requiresAuth,
  kind: "remote",
  navGroup: "apps",
  showInSidebar: remoteApp.showInMenu
}));

export const shellRouteDefinitions: ShellRouteDefinition[] = [
  ...shellBaseRoutes,
  ...remoteBaseRoutes
];

export const getActiveShellRoute = (pathname: string): ShellRouteDefinition | undefined => {
  const normalizedPathname = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  return [...shellRouteDefinitions]
    .sort((firstRoute, secondRoute) => secondRoute.navPath.length - firstRoute.navPath.length)
    .find((routeDefinition) => {
      if (routeDefinition.navPath === "/") {
        return normalizedPathname === "/";
      }

      return (
        normalizedPathname === routeDefinition.navPath ||
        normalizedPathname.startsWith(`${routeDefinition.navPath}/`)
      );
    });
};
