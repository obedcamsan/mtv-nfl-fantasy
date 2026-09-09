import { useState } from "react";
import type { FantasyTeam } from "@/types/league";
import styles from "./FranchiseHeader.module.css";

export function FranchiseHeader({ team }: { team: FantasyTeam }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    const url = `${window.location.origin}${window.location.pathname}#team-${team.slug}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.identity}>
        <span className={styles.position}>DRAFT SLOT #{team.draftPosition}</span>
        <h3 className={styles.name}>{team.name}</h3>
        <span className={styles.manager}>Manager &middot; {team.manager}</span>
      </div>

      <button type="button" className={styles.copyButton} onClick={handleCopyLink}>
        {copied ? "LINK COPIADO" : "COPIAR LINK"}
      </button>
    </div>
  );
}
