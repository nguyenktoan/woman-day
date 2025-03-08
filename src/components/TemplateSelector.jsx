import { useState } from "react";
import { cardTemplates, defaultTemplate } from "@/config/templates";
import styles from "@/styles/TemplateSelector.module.css";

export default function TemplateSelector({
  onSelectTemplate,
  selectedTemplate,
}) {
  const handleTemplateChange = (templateId) => {
    onSelectTemplate(cardTemplates[templateId]);
  };

  return (
    <div className={styles.selectorContainer}>
      <h2 className={styles.selectorTitle}>Chọn Mẫu Thiệp</h2>

      <div className={styles.templatesGrid}>
        {Object.values(cardTemplates).map((template) => (
          <label key={template.id} className={styles.templateOption}>
            <input
              type="radio"
              name="template"
              value={template.id}
              checked={selectedTemplate?.id === template.id}
              onChange={() => handleTemplateChange(template.id)}
              className={styles.templateRadio}
            />

            <div
              className={styles.templateCard}
              style={{
                backgroundImage: `
                  linear-gradient(
                    ${template.background.overlay},
                    ${template.background.overlay}
                  ),
                  url(${template.background.pattern}),
                  url(${template.background.image})
                `,
                backgroundSize: "cover, 200px 200px, cover",
                backgroundPosition: "center",
                backgroundBlendMode: "normal, soft-light, normal",
              }}
            >
              <div className={styles.templatePreview}>
                <h3 className={styles.templateName}>{template.name}</h3>
                <p className={styles.templateDescription}>
                  {template.description}
                </p>
              </div>

              <div className={styles.templateInfo}>
                <span className={styles.templateFont}>
                  {template.fonts.title}
                </span>
                <span className={styles.templateLayout}>
                  {template.layout === "vertical" ? "Dọc" : "Ngang"}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
