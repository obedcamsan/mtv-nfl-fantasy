import type { ReactNode } from "react";
import { StickyNavigation } from "@/components/navigation/StickyNavigation";
import { Footer } from "./Footer";
import styles from "./AppShell.module.css";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={styles.shell}>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <StickyNavigation />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
