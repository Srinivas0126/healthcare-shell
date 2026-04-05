import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import * as stylesModule from "./ShellSidebar.module.css";
import { resolveCssModule } from "../../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

type SidebarIconId =
  | "grid"
  | "records"
  | "calendar"
  | "pulse"
  | "pill"
  | "message"
  | "video"
  | "brand";

type SidebarItem = {
  id: string;
  label: string;
  to?: string;
  section: "navigation" | "care";
  requiresAuth: boolean;
  icon: SidebarIconId;
  badge?: string;
  disabled?: boolean;
};

const patientProfile = {
  name: "Sarah Mitchell",
  details: "DOB Apr 14 1984 | MRN 003821"
};

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    to: "/dashboard",
    section: "navigation",
    requiresAuth: true,
    icon: "grid"
  },
  {
    id: "records",
    label: "Health records",
    to: "/health-records",
    section: "navigation",
    requiresAuth: true,
    icon: "records"
  },
  {
    id: "scheduling",
    label: "Scheduling",
    to: "/appointments",
    section: "navigation",
    requiresAuth: true,
    icon: "calendar"
  },
  {
    id: "vitals",
    label: "Vitals",
    to: "/",
    section: "navigation",
    requiresAuth: false,
    icon: "pulse"
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    to: "/billing",
    section: "navigation",
    requiresAuth: true,
    icon: "pill"
  },
  {
    id: "messaging",
    label: "Messaging",
    section: "care",
    requiresAuth: true,
    icon: "message",
    badge: "3",
    disabled: true
  },
  {
    id: "telehealth",
    label: "Telehealth",
    section: "care",
    requiresAuth: true,
    icon: "video",
    disabled: true
  }
];

const sidebarSections = [
  { id: "navigation", label: "Navigation" },
  { id: "care", label: "Care" }
] as const;

const getUserInitials = (displayName?: string) =>
  displayName
    ?.split(" ")
    .map((segment) => segment[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "GS";

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `${styles.link} ${isActive ? styles.activeLink : ""}`.trim();

const renderIcon = (icon: SidebarIconId) => {
  switch (icon) {
    case "grid":
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <rect height="5" rx="1.2" width="5" x="2" y="2" />
          <rect height="5" rx="1.2" width="5" x="13" y="2" />
          <rect height="5" rx="1.2" width="5" x="2" y="13" />
          <rect height="5" rx="1.2" width="5" x="13" y="13" />
        </svg>
      );
    case "records":
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <path d="M6 2.5h5l3 3V17a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M11 2.5V6h3" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M7.5 9.2h5M7.5 12.1h5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        </svg>
      );
    case "calendar":
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <rect fill="none" height="13" rx="2.3" stroke="currentColor" strokeWidth="1.7" width="14" x="3" y="4" />
          <path d="M6.2 2.5v3.1M13.8 2.5v3.1M3 8h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        </svg>
      );
    case "pulse":
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <path d="M2 10h3l2.1-4.1 3.1 8.2 2.3-5.1H18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    case "pill":
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <path d="M7.3 5.2a3.6 3.6 0 0 1 5 0l2.5 2.5a3.6 3.6 0 0 1 0 5l-2.1 2.1a3.6 3.6 0 0 1-5 0L5.2 12.3a3.6 3.6 0 0 1 0-5Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="m7.1 12.9 5.8-5.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "message":
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <path d="M4 4.5h12a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 16 14.5H8l-4.5 3V6A1.5 1.5 0 0 1 5 4.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    case "video":
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <rect fill="none" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" width="10" x="3" y="5" />
          <path d="m13 8 4-2.2v8.4L13 12" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" className={styles.iconSvg} viewBox="0 0 20 20">
          <path d="M10 3v14M3 10h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <circle cx="10" cy="10" fill="none" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
};

const ShellSidebar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const visibleItems = sidebarItems.filter((item) => isAuthenticated || !item.requiresAuth);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
      return;
    }

    navigate("/login");
  };

  return (
    <div className={styles.panel} id="shell-sidebar-navigation">
      <div className={styles.brandBlock}>
        <div className={styles.brandMark}>{renderIcon("brand")}</div>
        <div>
          <strong className={styles.brandName}>HealthOS</strong>
        </div>
      </div>

      <div className={styles.patientCard}>
        <strong className={styles.patientName}>{patientProfile.name}</strong>
        <span className={styles.patientDetails}>{patientProfile.details}</span>
      </div>

      {sidebarSections.map((section) => {
        const items = visibleItems.filter((item) => item.section === section.id);

        if (items.length === 0) {
          return null;
        }

        return (
          <section className={styles.section} key={section.id}>
            <p className={styles.sectionLabel}>{section.label}</p>
            <nav aria-label={section.label} className={styles.nav}>
              {items.map((item) => {
                if (item.disabled || !item.to) {
                  return (
                    <button
                      aria-disabled="true"
                      className={`${styles.link} ${styles.disabledLink}`.trim()}
                      key={item.id}
                      type="button"
                    >
                      <span className={styles.linkIcon}>{renderIcon(item.icon)}</span>
                      <span className={styles.linkLabel}>{item.label}</span>
                      {item.badge ? <span className={styles.alertBadge}>{item.badge}</span> : null}
                    </button>
                  );
                }

                return (
                  <NavLink
                    className={getNavLinkClassName}
                    end={item.to === "/"}
                    key={item.id}
                    to={item.to}
                  >
                    <span className={styles.linkIcon}>{renderIcon(item.icon)}</span>
                    <span className={styles.linkLabel}>{item.label}</span>
                    {item.badge ? <span className={styles.alertBadge}>{item.badge}</span> : null}
                  </NavLink>
                );
              })}
            </nav>
          </section>
        );
      })}

      <div className={styles.sidebarFooter}>
        <div className={styles.userIdentity}>
          <span className={styles.avatar}>{getUserInitials(user?.displayName)}</span>
          <div className={styles.userMeta}>
            <strong className={styles.userName}>
              {isAuthenticated ? user?.displayName ?? "Sarah Mitchell" : "Guest session"}
            </strong>
            <span className={styles.userStatus}>
              {isAuthenticated ? "Connected" : "Sign in required"}
            </span>
          </div>
        </div>

        <button className={styles.authButton} onClick={handleAuthAction} type="button">
          {isAuthenticated ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default ShellSidebar;
