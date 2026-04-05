import { Link } from "react-router-dom";
import { appMetadata } from "../../config/appMetadata";
import * as stylesModule from "./ShellFooter.module.css";
import { resolveCssModule } from "../../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

const currentYear = new Date().getFullYear();

const ShellFooter = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.identityBlock}>
        <span className={styles.eyebrow}>Shell footer</span>
        <strong className={styles.productName}>{appMetadata.name}</strong>
        <p className={styles.caption}>
          Shared host shell for healthcare micro frontends with protected routing and runtime remote
          loading.
        </p>
      </div>

      <div className={styles.metaBlock}>
        <div className={styles.pillRow}>
          <span className={styles.pill}>v{appMetadata.version}</span>
          <span className={styles.pill}>{appMetadata.environment}</span>
          <span className={styles.pill}>{currentYear}</span>
        </div>

        <nav aria-label="Footer links" className={styles.linkRow}>
          <Link className={styles.link} to="/">
            Home
          </Link>
          <Link className={styles.link} to="/login">
            Login
          </Link>
          <a className={styles.link} href="https://react.dev" rel="noreferrer" target="_blank">
            React docs
          </a>
        </nav>
      </div>
    </div>
  );
};

export default ShellFooter;
