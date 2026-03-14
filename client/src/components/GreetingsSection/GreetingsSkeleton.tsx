import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./styles/GreetingsSection.module.css";

export const GreetingsSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className={styles.skeletonCard}>
        <div
          className={styles.sigCardHeader}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            <Skeleton width={75} />
            <Skeleton width={24} />
          </div>

          <Skeleton width={40} />
        </div>

        <Skeleton count={2} style={{ marginTop: "0.5rem" }} />
      </div>
    ))}
  </>
);
