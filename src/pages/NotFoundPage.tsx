import { Link } from "react-router-dom";
import * as stylesModule from "./RoutePage.module.css";
import { resolveCssModule } from "../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

const NotFoundPage = () => {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span className={styles.kicker}>404</span>
        <h2 className={styles.title}>This shell route does not exist</h2>
        <p className={styles.description}>
          The router is now handling unknown top-level paths with a local shell-owned
          not-found experience.
        </p>
      </div>

      <div className={styles.actions}>
        <Link className={styles.linkButton} to="/">
          Back to home
        </Link>
        <Link className={styles.secondaryLink} to="/login">
          Open login route
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
