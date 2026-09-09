import { useState } from "react";
import { getPlayerImageUrl } from "@/lib/utils/players";
import styles from "./PlayerImage.module.css";

interface PlayerImageProps {
  sleeperId: string | null;
  alt: string;
  priority?: boolean;
}

export function PlayerImage({ sleeperId, alt, priority = false }: PlayerImageProps) {
  const [failed, setFailed] = useState(false);
  const url = getPlayerImageUrl(sleeperId);

  if (!url || failed) {
    return (
      <div className={styles.placeholder} role="img" aria-label={alt}>
        <span aria-hidden="true">MTV</span>
      </div>
    );
  }

  return (
    <img
      className={styles.image}
      src={url}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
