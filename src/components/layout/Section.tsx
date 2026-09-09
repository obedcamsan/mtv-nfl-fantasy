import type { ReactNode } from "react";
import { Container } from "./Container";
import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  children: ReactNode;
  bleed?: boolean;
  className?: string;
}

export function Section({ id, children, bleed = false, className }: SectionProps) {
  const content = bleed ? children : <Container>{children}</Container>;

  return (
    <section id={id} className={[styles.section, className].filter(Boolean).join(" ")}>
      {content}
    </section>
  );
}
