import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/WishCard.module.css";
import { defaultTemplate } from "@/config/templates";
import FlowerFrame from "./FlowerFrame";

export default function WishCard({
  name,
  recipientType,
  colorTheme,
  onBack,
  template = defaultTemplate,
}) {
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(true);

  const activeTemplate = template || defaultTemplate;

  const honorifics = {
    mother: "Kính gửi mẹ yêu",
    sister:
      name.startsWith("chị") || name.startsWith("Chị") ? "Gửi" : "Gửi chị",
    wife: "Gửi em yêu",
    girlfriend: "Gửi em yêu",
    teacher: "Kính gửi cô giáo",
    friend: "Gửi bạn",
    colleague: "Gửi chị",
    other: "Kính gửi",
  };

  useEffect(() => {
    async function generateWish() {
      try {
        const response = await fetch("/api/generate-wish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, recipientType }),
        });
        const data = await response.json();
        setWish(data.wish);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    generateWish();
  }, [name, recipientType]);

  const greeting = `${honorifics[recipientType]} ${name}`;

  return (
    <div className={`${styles.cardWrapper} ${styles[colorTheme]}`}>
      <button onClick={onBack} className={styles.backButton}>
        ← Quay lại
      </button>

      <div className={`${styles.card} ${styles[template.layout]}`}>
        <div className={styles.imageContainer}>
          <Image
            src={template.background.image}
            alt="Card background"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className={styles.backgroundImage}
          />
          <div
            className={styles.patternOverlay}
            style={{
              backgroundImage: `url(${template.background.pattern})`,
              opacity: 0.15,
            }}
          />
        </div>

        <div
          className={styles.cardContent}
          style={{
            padding: template.styling.padding,
            borderRadius: template.styling.borderRadius,
            background: template.background.overlay,
          }}
        >
          <h1 className={styles.title}>Chúc Mừng Ngày 8/3</h1>
          <h2 className={styles.recipient} data-recipient-name>
            {honorifics[recipientType]} {name}
          </h2>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.loadingDot}></div>
              <div className={styles.loadingDot}></div>
              <div className={styles.loadingDot}></div>
            </div>
          ) : (
            <p className={styles.message}>{wish}</p>
          )}
        </div>
      </div>
    </div>
  );
}
