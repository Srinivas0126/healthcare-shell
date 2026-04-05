import type { ShellRouteDefinition } from "../../routes/routeDefinitions";
import * as stylesModule from "./ShellHeader.module.css";
import { resolveCssModule } from "../../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

type ShellHeaderProps = {
  activeRoute?: ShellRouteDefinition;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

const ShellHeader = ({ activeRoute, isSidebarOpen, onToggleSidebar }: ShellHeaderProps) => {
  const activeLabel = activeRoute?.title ?? "Shell";

  return (
    <div className={styles.bar}>
      <div aria-hidden="true" className={styles.windowChrome}>
        <span className={`${styles.dot} ${styles.dotRed}`.trim()} />
        <span className={`${styles.dot} ${styles.dotAmber}`.trim()} />
        <span className={`${styles.dot} ${styles.dotGreen}`.trim()} />
      </div>

      <div className={styles.statusRow}>
        <span className={styles.environmentLabel}>app.healthos.io | TLS 1.3 | HIPAA-compliant</span>
        <span className={styles.routePill}>{activeLabel}</span>
      </div>

      <button
        aria-controls="shell-sidebar-navigation"
        aria-expanded={isSidebarOpen}
        aria-label="Toggle navigation menu"
        className={styles.menuButton}
        onClick={onToggleSidebar}
        type="button"
      >
        <span className={styles.menuLine} />
        <span className={styles.menuLine} />
        <span className={styles.menuLine} />
      </button>
    </div>
  );
};

export default ShellHeader;
