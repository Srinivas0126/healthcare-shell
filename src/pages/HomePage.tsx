import { Link } from "react-router-dom";
import * as stylesModule from "./HomePage.module.css";
import { resolveCssModule } from "../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

const shellHighlights = [
  {
    title: "Persistent app frame",
    description:
      "Header, sidebar, content region, and footer stay anchored while the shell owns the route frame."
  },
  {
    title: "Protected hosted routes",
    description:
      "Hosted micro frontend base paths remain protected behind shell auth before any remote code is rendered."
  },
  {
    title: "Runtime remote loading",
    description:
      "The shell now fetches remoteEntry files, initializes the federation scope, and lazy-loads hosted apps."
  },
  {
    title: "Route-scoped resilience",
    description:
      "Each hosted route now gets a branded fallback loader and isolated error boundary without breaking the rest of the shell."
  }
];

const implementationSteps = [
  "Add-new-MFE workflow refinement",
  "Optional header quick links from shared navigation config",
  "Remote integration checks against live remotes"
];

const quickLinks = [
  { label: "Open login route", to: "/login" },
  { label: "Open dashboard route", to: "/dashboard" },
  { label: "Open health records route", to: "/health-records" },
  { label: "Open appointments base route", to: "/appointments" },
  { label: "Open billing base route", to: "/billing" }
];

const HomePage = () => {
  return (
    <>
      <section className={styles.heroPanel} id="overview">
        <div>
          <span className={styles.eyebrow}>Shell 10</span>
          <h2 className={styles.heroTitle}>The host shell now owns routing, loading, navigation, and route-scoped recovery</h2>
          <p className={styles.heroText}>
            The shell now carries the persistent route frame, protects hosted app base routes, loads
            Module Federation remotes at runtime, renders a config-driven sidebar, and keeps remote
            failures isolated with a dedicated fallback loader and route-scoped error boundary.
          </p>
          <div className={styles.quickLinkRow}>
            {quickLinks.map((quickLink) => (
              <Link className={styles.quickLink} key={quickLink.to} to={quickLink.to}>
                {quickLink.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricValue}>4</span>
          <span className={styles.metricLabel}>Registered shell remotes</span>
          <p className={styles.metricText}>
            Dashboard, health records, appointments, and billing are now configured for protected
            runtime loading from the host shell with route-scoped recovery states.
          </p>
        </div>
      </section>

      <section className={styles.cardGrid} aria-label="Shell implementation highlights" id="layout-regions">
        {shellHighlights.map((item) => (
          <article className={styles.contentCard} key={item.title}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.description}</p>
          </article>
        ))}
      </section>

      <section className={`${styles.contentPanel} ${styles.roadmapPanel}`.trim()} id="implementation-roadmap">
        <div>
          <span className={styles.eyebrow}>Next slices</span>
          <h3 className={styles.roadmapTitle}>What the current shell foundation unlocks</h3>
        </div>

        <ol className={styles.roadmapList}>
          {implementationSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </>
  );
};

export default HomePage;
