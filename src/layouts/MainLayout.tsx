import { PropsWithChildren, ReactNode } from "react";
import * as stylesModule from "./MainLayout.module.css";
import { resolveCssModule } from "../utils/resolveCssModule";

const styles = resolveCssModule(stylesModule);

type MainLayoutProps = PropsWithChildren<{
  footer?: ReactNode;
  sidebar: ReactNode;
}>;

const MainLayout = ({ footer, sidebar, children }: MainLayoutProps) => {
  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.mainColumn}>
        <main className={styles.content}>{children}</main>
        <footer className={styles.footer}>{footer}</footer>
      </div>
    </div>
  );
};

export default MainLayout;
