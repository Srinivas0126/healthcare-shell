import { Link } from "react-router-dom";
import { moduleFederationContract } from "./registry";
import type { RemoteAppConfig } from "./types";
import * as stylesModule from "./RemoteRouteState.module.css";
import { resolveCssModule } from "../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

type RemoteRouteStateProps = {
  errorMessage?: string;
  onRetry?: () => void;
  remoteApp: RemoteAppConfig;
  variant: "loading" | "error";
};

const loadingDescription =
  "The shell is fetching the remote entry, preparing the shared federation scope, and mounting the hosted route in the content area.";

const errorDescription =
  "The shell reached the protected base route, but the hosted app could not be rendered. The shell layout is still available and you can retry this route without reloading the entire host app.";

const RemoteRouteState = ({ errorMessage, onRetry, remoteApp, variant }: RemoteRouteStateProps) => {
  const isError = variant === "error";

  return (
    <section className={styles.statePage}>
      <div className={styles.hero}>
        <span className={`${styles.kicker} ${isError ? styles.errorKicker : ""}`.trim()}>
          {isError ? "Remote load failed" : "Remote loading"}
        </span>
        <h2 className={styles.title}>
          {isError ? `${remoteApp.label} could not be loaded` : `Loading ${remoteApp.label}`}
        </h2>
        <p className={styles.description}>{isError ? errorDescription : loadingDescription}</p>
        {!isError ? (
          <div className={styles.statusStrip}>
            <div aria-hidden="true" className={styles.loaderRow}>
              <span className={styles.loaderDot} />
              <span className={styles.loaderDot} />
              <span className={styles.loaderDot} />
            </div>
            <span>Route-scoped fallback loader is active</span>
          </div>
        ) : null}
      </div>

      <div className={styles.panelGrid}>
        <article className={styles.panel}>
          <h3 className={styles.panelTitle}>Remote details</h3>
          <ul className={styles.detailList}>
            <li>Remote name: {remoteApp.remoteName}</li>
            <li>Entry URL: {remoteApp.remoteEntryUrl}</li>
            <li>Exposed module: {remoteApp.exposedModule}</li>
            <li>Base route: {remoteApp.basePath}</li>
          </ul>
        </article>

        <article className={`${styles.panel} ${isError ? styles.errorPanel : ""}`.trim()}>
          <h3 className={styles.panelTitle}>{isError ? "Error boundary" : "Shared scope"}</h3>
          {isError ? (
            <p className={styles.bodyText}>{errorMessage}</p>
          ) : (
            <p className={styles.bodyText}>
              The host {moduleFederationContract.hostName} is preparing singleton packages of
              {` ${moduleFederationContract.sharedPackages.join(", ")}.`}
            </p>
          )}
        </article>
      </div>

      {isError ? (
        <div className={styles.actionRow}>
          <button className={styles.primaryButton} onClick={onRetry} type="button">
            Retry remote load
          </button>
          <Link className={styles.secondaryLink} to="/">
            Back to home
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default RemoteRouteState;
