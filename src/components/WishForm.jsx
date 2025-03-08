import { useState } from "react";
import styles from "@/styles/Form.module.css";

export default function WishForm({
  setName,
  setShowCard,
  setRecipientType,
  setColorTheme,
  colorThemes,
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [recipient, setRecipient] = useState("mother");
  const [selectedTheme, setSelectedTheme] = useState("rose"); // Default theme

  const recipients = {
    mother: { label: "Mẹ", icon: "👩" },
    sister: { label: "Chị/Em gái", icon: "👧" },
    wife: { label: "Vợ/Bạn gái", icon: "👰" },
    teacher: { label: "Cô giáo", icon: "👩‍🏫" },
    friend: { label: "Bạn", icon: "🤝" },
    colleague: { label: "Đồng nghiệp", icon: "👩‍💼" },
  };

  const themes = {
    rose: {
      label: "Rose - Hồng pastel",
      colors: {
        primary: "#ff8fa3",
        secondary: "#ff6b84",
        background: "linear-gradient(135deg, #fff0f3 0%, #ffe6eb 100%)",
        text: "#ff1493",
        headingText: "#d4365f",
        labelText: "#666666",
      },
    },
    sage: {
      label: "Sage - Xanh lục nhạt",
      colors: {
        primary: "#7fa382",
        secondary: "#516c57",
        background: "linear-gradient(135deg, #e8efe6 0%, #d1e2cc 100%)",
        text: "#2e4a32",
        headingText: "#3c5a41",
        labelText: "#557659",
      },
    },
    lavender: {
      label: "Lavender - Tím nhạt",
      colors: {
        primary: "#9d7bb0",
        secondary: "#6a4d7c",
        background: "linear-gradient(135deg, #f2e6ff 0%, #e6d9f2 100%)",
        text: "#4a2d5f",
        headingText: "#573671",
        labelText: "#6d548a",
      },
    },
    peach: {
      label: "Peach - Cam đào",
      colors: {
        primary: "#ff9a7b",
        secondary: "#e67d5f",
        background: "linear-gradient(135deg, #ffe8e0 0%, #ffd6cc 100%)",
        text: "#d45d3c",
        headingText: "#c24e2e",
        labelText: "#b25e47",
      },
    },
    skyBlue: {
      label: "Sky Blue - Xanh da trời",
      colors: {
        primary: "#7bb3d9",
        secondary: "#4d8ab8",
        background: "linear-gradient(135deg, #e6f3ff 0%, #cce6ff 100%)",
        text: "#2c679d",
        headingText: "#3d7ab3",
        labelText: "#5189bd",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setName(inputValue.trim());
      setRecipientType(recipient);
      setColorTheme(selectedTheme);
      setShowCard(true);
    } else {
      setError("Vui lòng nhập tên người nhận");
      // Clear error after 3 seconds
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleThemeChange = (theme) => {
    const themeColors = themes[theme].colors;
    setSelectedTheme(theme);
    setColorTheme(theme);

    // Update all CSS variables including text colors
    document.documentElement.style.setProperty(
      "--theme-primary",
      themeColors.primary
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      themeColors.secondary
    );
    document.documentElement.style.setProperty(
      "--theme-background",
      themeColors.background
    );
    document.documentElement.style.setProperty(
      "--theme-text",
      themeColors.text
    );
    document.documentElement.style.setProperty(
      "--theme-heading-text",
      themeColors.headingText
    );
    document.documentElement.style.setProperty(
      "--theme-label-text",
      themeColors.labelText
    );
    document.documentElement.style.setProperty(
      "--theme-border",
      themeColors.primary + "80"
    );
    document.documentElement.style.setProperty(
      "--theme-shadow",
      themeColors.primary + "33"
    );
    document.documentElement.style.setProperty(
      "--theme-hover",
      themeColors.primary + "1A"
    );
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>
          <span className={styles.decorativeIcon}>🌸</span>
          Thiệp Chúc Mừng 8/3
          <span className={styles.decorativeIcon}>🌸</span>
        </h2>

        <p className={styles.description}>
          Tạo lời chúc đặc biệt để gửi đến người phụ nữ bạn yêu quý
        </p>

        <div className={styles.recipientSelector}>
          <h3 className={styles.sectionTitle}>Bạn muốn gửi lời chúc đến ai?</h3>
          <div className={styles.radioGroup}>
            {Object.entries(recipients).map(([key, { label, icon }]) => (
              <label key={key} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="recipient"
                  value={key}
                  checked={recipient === key}
                  onChange={(e) => setRecipient(e.target.value)}
                  className={styles.radioInput}
                />
                <span className={styles.radioButton}>
                  <span className={styles.icon}>{icon}</span>
                  <span className={styles.label}>{label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="recipientName" className={styles.inputLabel}>
              Tên người nhận
            </label>
            <input
              id="recipientName"
              type="text"
              placeholder={`Nhập tên ${recipients[recipient].label}`}
              className={`${styles.input} ${error ? styles.error : ""}`}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError("");
              }}
              autoComplete="off"
              required
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
          <button type="submit" className={styles.button}>
            Tạo thiệp
          </button>
        </form>

        <div className={styles.themeSelector}>
          <h3 className={styles.sectionTitle}>Chọn màu sắc cho thiệp</h3>
          <div className={styles.themeRadioGroup}>
            {Object.entries(themes).map(([key, { label, colors }]) => (
              <label key={key} className={styles.themeRadioLabel}>
                <input
                  type="radio"
                  name="theme"
                  value={key}
                  checked={selectedTheme === key}
                  onChange={() => handleThemeChange(key)}
                  className={styles.themeRadioInput}
                />
                <span
                  className={styles.themeRadioButton}
                  style={{
                    "--theme-preview-bg": colors.background,
                    "--theme-preview-color": colors.primary,
                  }}
                >
                  <span className={styles.themePreview}></span>
                  <span className={styles.themeLabel}>{label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
