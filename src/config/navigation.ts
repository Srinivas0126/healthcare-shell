import { shellRouteDefinitions, type ShellRouteGroup } from "../routes/routeDefinitions";

export type NavItemGroup = ShellRouteGroup | "resources";

export type NavItemConfig = {
  id: string;
  label: string;
  description: string;
  group: NavItemGroup;
  order: number;
  type: "internal" | "external";
  pathOrUrl: string;
  requiresAuth: boolean;
  showInHeader?: boolean;
  showInSidebar?: boolean;
  target?: "_self" | "_blank";
};

export type NavSectionConfig = {
  id: NavItemGroup;
  label: string;
  items: NavItemConfig[];
};

const internalNavItems: NavItemConfig[] = shellRouteDefinitions
  .filter((routeDefinition) => routeDefinition.showInSidebar)
  .map((routeDefinition, index) => ({
    id: routeDefinition.id,
    label: routeDefinition.title,
    description: routeDefinition.description,
    group: routeDefinition.navGroup,
    order: index + 1,
    type: "internal" as const,
    pathOrUrl: routeDefinition.navPath,
    requiresAuth: routeDefinition.requiresAuth,
    showInSidebar: true
  }));

const externalNavItems: NavItemConfig[] = [
  {
    id: "react-docs",
    label: "React docs",
    description: "Official React documentation and release references.",
    group: "resources",
    order: 1,
    type: "external",
    pathOrUrl: "https://react.dev",
    requiresAuth: false,
    showInSidebar: true,
    target: "_blank"
  },
  {
    id: "webpack-mf-docs",
    label: "Webpack federation",
    description: "Module Federation concepts and host or remote configuration guidance.",
    group: "resources",
    order: 2,
    type: "external",
    pathOrUrl: "https://webpack.js.org/concepts/module-federation/",
    requiresAuth: false,
    showInSidebar: true,
    target: "_blank"
  }
];

export const navItems: NavItemConfig[] = [...internalNavItems, ...externalNavItems];

const navSectionLabels: Record<NavItemGroup, string> = {
  shell: "Shell routes",
  apps: "Hosted app base routes",
  resources: "External resources"
};

export const getVisibleSidebarSections = (isAuthenticated: boolean): NavSectionConfig[] => {
  const visibleNavItems = navItems
    .filter((navItem) => navItem.showInSidebar)
    .filter((navItem) => isAuthenticated || !navItem.requiresAuth);

  return (Object.keys(navSectionLabels) as NavItemGroup[])
    .map((sectionId) => {
      const items = visibleNavItems
        .filter((navItem) => navItem.group === sectionId)
        .sort((firstItem, secondItem) => firstItem.order - secondItem.order);

      return {
        id: sectionId,
        label: navSectionLabels[sectionId],
        items
      };
    })
    .filter((section) => section.items.length > 0);
};
