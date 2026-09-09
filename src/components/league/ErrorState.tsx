import { Button } from "@/components/ui/Button";
import styles from "./ErrorState.module.css";

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.wrapper} role="alert">
      <p className={`text-display-md ${styles.title}`}>NO SIGNAL</p>
      <p className="text-body">No fue posible cargar los datos de la liga.</p>
      <Button variant="ghost" onClick={onRetry}>
        REINTENTAR
      </Button>
    </div>
  );
}
