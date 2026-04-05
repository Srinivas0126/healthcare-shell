import { Link } from "react-router-dom";
import { moduleFederationContract } from "../mfes/registry";
import { RemoteAppConfig } from "../mfes/types";
import * as stylesModule from "./RoutePage.module.css";
import { resolveCssModule } from "../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

type MfePlaceholderPageProps = {
  remoteApp: RemoteAppConfig;
};

const MfePlaceholderPage = ({ remoteApp }: MfePlaceholderPageProps) => {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span className={styles.kicker}>Protected Remote Base Route</span>
        <h2 className={styles.title}>{remoteApp.label} route is reserved in the shell</h2>
        <p className={styles.description}>
          You have passed the shell auth guard for `{remoteApp.basePath}`. In the hosting slices,
          this page will be replaced by a Module Federation remote loader.
        </p>
      </div>

      <div className={styles.infoGrid}>
        <article className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Remote metadata</h3>
          <ul className={styles.list}>
            <li>Remote name: {remoteApp.remoteName}</li>
            <li>Base path: {remoteApp.basePath}</li>
            <li>Exposed module: {remoteApp.exposedModule}</li>
            <li>Remote entry URL: {remoteApp.remoteEntryUrl}</li>
          </ul>
        </article>
        <article className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Federation contract</h3>
          <p className={styles.cardText}>
            The host is configured as {moduleFederationContract.hostName} and expects remotes to expose
            {` ${remoteApp.exposedModule} `}with supported entry modules of
            {` ${moduleFederationContract.supportedExposedModules.join(", ")}. `}
            Shared singleton packages are {moduleFederationContract.sharedPackages.join(", ")}.
          </p>
        </article>
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

export default MfePlaceholderPage;
