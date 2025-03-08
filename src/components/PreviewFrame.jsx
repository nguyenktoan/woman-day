export default function PreviewFrame({ children, device }) {
  const frameStyles = {
    mobile: { width: "375px", height: "667px" },
    tablet: { width: "768px", height: "1024px" },
    desktop: { width: "1200px", height: "800px" },
  };

  return (
    <div className={styles.frameContainer}>
      <div className={styles.frame} style={frameStyles[device]}>
        {children}
      </div>
    </div>
  );
}
