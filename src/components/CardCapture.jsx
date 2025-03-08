import { useState } from "react";
import html2canvas from "html2canvas";
import styles from "@/styles/CardCapture.module.css";

export default function CardCapture({ cardRef, colorTheme }) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    if (!cardRef.current || isCapturing) return;

    try {
      setIsCapturing(true);

      // Create wrapper with minimal padding
      const wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "-9999px";
      wrapper.style.width = "1000px"; // Reduced width
      wrapper.style.padding = "0"; // Remove padding
      wrapper.style.backgroundColor = "transparent";
      document.body.appendChild(wrapper);

      // Clone and enhance card
      const cardClone = cardRef.current.cloneNode(true);

      // Optimize card styling for better space usage
      Object.assign(cardClone.style, {
        transform: "none",
        margin: "0",
        width: "100%",
        aspectRatio: "1 / 1",
        padding: "30px", // Reduced padding
        borderRadius: "20px",
        background: `linear-gradient(135deg, 
          ${getComputedStyle(document.documentElement).getPropertyValue(
            "--theme-background"
          )},
          ${getComputedStyle(document.documentElement).getPropertyValue(
            "--theme-background-secondary"
          )} 110%
        )`,
        border: "none",
        boxShadow: `
          0 10px 30px rgba(0, 0, 0, 0.15),
          0 0 0 2px ${getComputedStyle(
            document.documentElement
          ).getPropertyValue("--theme-primary")}
        `,
      });

      // Enhance text styling with better contrast
      cardClone.querySelectorAll(".title, .recipient").forEach((el) => {
        el.style.textShadow = "2px 2px 8px rgba(0, 0, 0, 0.25)"; // Stronger shadow
        el.style.fontWeight = "700"; // Bolder text
        el.style.transform = "scale(1.2)"; // Larger scale
        el.style.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--theme-text");
      });

      // Optimize message text
      cardClone.querySelectorAll(".message").forEach((el) => {
        el.style.fontSize = "1.4em"; // Larger text
        el.style.lineHeight = "1.6";
        el.style.maxWidth = "95%"; // Use more space
        el.style.margin = "15px auto";
        el.style.color = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--theme-secondary");
      });

      // Optimize flower decorations
      cardClone.querySelectorAll(".flower-decoration").forEach((flower) => {
        flower.style.position = "absolute";
        flower.style.fontSize = "36px"; // Larger flowers
        flower.style.opacity = "0.9"; // More visible
      });

      wrapper.appendChild(cardClone);

      // Capture with optimized settings
      const canvas = await html2canvas(wrapper, {
        scale: 2, // Reduced scale for better performance
        useCORS: true,
        backgroundColor: null,
        logging: false,
        width: 1000,
        height: 1000,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const content = clonedDoc.querySelector("#card-content");
          if (content) {
            content.style.transform = "none";
          }
        },
      });

      // Generate high-quality PNG
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const timestamp = new Date()
          .toLocaleDateString("vi-VN")
          .replace(/\//g, "-");
        const recipientName =
          cardRef.current.querySelector("[data-recipient-name]")?.textContent ||
          "";
        const sanitizedName = recipientName
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase();
        const filename = `thiep-8-3-${sanitizedName}-${timestamp}.png`;

        const link = document.createElement("a");
        link.download = filename;
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
      }, "image/png");

      document.body.removeChild(wrapper);
    } catch (error) {
      console.error("Lỗi khi tạo thiệp:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className={styles.captureContainer}>
      <button
        onClick={handleCapture}
        className={`${styles.captureButton} ${styles[colorTheme]}`}
        disabled={isCapturing}
      >
        <span className={styles.captureIcon}>{isCapturing ? "⏳" : "✨"}</span>
        {isCapturing ? "Đang tạo thiệp..." : "Lưu thiệp HD"}
      </button>
    </div>
  );
}
