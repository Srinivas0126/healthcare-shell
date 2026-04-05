import { useAuth } from "../auth/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as stylesModule from "./RoutePage.module.css";
import { resolveCssModule } from "../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const requestedLocation = location.state as { from?: { pathname?: string } } | null;
  const returnTo = requestedLocation?.from?.pathname ?? "/";

  const handleLogin = () => {
    login();
    navigate(returnTo, { replace: true });
  };

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <span className={styles.kicker}>Shell 4</span>
        <h2 className={styles.title}>Sign in to open hosted apps</h2>
        <p className={styles.description}>
          The shell now protects hosted micro frontend base routes and redirects unauthenticated users
          here before returning them to the original destination.
        </p>
      </div>

      <div className={styles.infoGrid}>
        <article className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Return path</h3>
          <p className={styles.cardText}>
            {isAuthenticated
              ? `You are already signed in. Your current return destination is ${returnTo}.`
              : `After sign-in, the shell will send you back to ${returnTo}.`}
          </p>
        </article>
        <article className={styles.infoCard}>
          <h3 className={styles.cardTitle}>Current slice</h3>
          <p className={styles.cardText}>
            This demo login uses shell-managed state so the auth guard and route redirect flow are in place
            before a real identity provider is connected.
          </p>
        </article>
      </div>

      <div className={styles.actions}>
        {!isAuthenticated ? (
          <button className={styles.primaryButton} onClick={handleLogin} type="button">
            Sign in as demo user
          </button>
        ) : (
          <button className={styles.primaryButton} onClick={() => navigate(returnTo, { replace: true })} type="button">
            Continue to requested route
          </button>
        )}
        <Link className={styles.secondaryLink} to="/">
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;
