import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/styles/CardTemplate.module.css";

export default function CardTemplate({
  template,
  content,
  onSelect,
  isSelected,
}) {
  const { background, fonts, styling } = template;

  return (
    <motion.div
      className={`${styles.templateCard} ${isSelected ? styles.selected : ""}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(template.id)}
    >
      <div className={styles.imageContainer}>
        <Image
          src={background.image}
          alt={template.name}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.backgroundImage}
        />
        <div
          className={styles.patternOverlay}
          style={{
            backgroundImage: `url(${background.pattern})`,
            opacity: 0.15,
          }}
        />
      </div>

      <div className={styles.templatePreview}>
        <h3 className={styles.templateName}>{template.name}</h3>
        <p className={styles.templateDescription}>{template.description}</p>
      </div>

      <div className={styles.templateInfo}>
        <span className={styles.templateFont}>{fonts.title}</span>
        <span className={styles.templateLayout}>
          {template.layout === "vertical" ? "Dọc" : "Ngang"}
        </span>
      </div>
    </motion.div>
  );
}
