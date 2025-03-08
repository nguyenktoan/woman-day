import styles from "@/styles/FlowerFrame.module.css";

export default function FlowerFrame({ colorTheme }) {
  const flowers = ["🌸", "🌺", "🌹", "🌷", "💐", "🌼", "🌻", "🌿"];

  return (
    <div className={`${styles.flowerFrame} ${styles[colorTheme]}`}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.flower}
          style={{
            "--delay": `${i * 0.5}s`,
            "--angle": `${i * 30}deg`,
          }}
        >
          <span className={styles.flowerIcon}>
            {flowers[i % flowers.length]}
          </span>
        </div>
      ))}
      <div className={styles.decorativeBorder} />
    </div>
  );
}
