import { useState, useRef } from "react";
import Head from "next/head";
import WishForm from "@/components/WishForm";
import WishCard from "@/components/WishCard";
import Confetti from "@/components/Confetti";
import CutePets from "@/components/CutePets";
import CardCapture from "@/components/CardCapture";
import TemplateSelector from "@/components/TemplateSelector";
import styles from "@/styles/Home.module.css";
import { defaultTemplate } from "@/config/templates";

export default function Home() {
  const [name, setName] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [recipientType, setRecipientType] = useState("mother");
  const [colorTheme, setColorTheme] = useState("pink");
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate);
  const cardRef = useRef(null);

  const colorThemes = {
    sage: "Sage Green - Xanh lục nhạt",
    lavender: "Lavender - Tím nhạt",
    peach: "Peach - Cam đào",
    skyBlue: "Sky Blue - Xanh da trời",
    rose: "Rose - Hồng pastel",
  };

  return (
    <div className={`${styles.container} ${styles[colorTheme] || styles.rose}`}>
      <Head>
        <title>Thiệp Chúc Mừng 8/3</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;600&family=Be+Vietnam+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.gradientOverlay} />
        <div className={styles.floatingElements}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`${styles.floatingItem} ${styles[`item${i % 5}`]}`}
            />
          ))}
        </div>
      </div>

      <main className={styles.main}>
        {/* Hero Section with enhanced title */}
        <section className={styles.heroSection}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>
              <div className={styles.titleWrapper}>
                <span className={styles.titleText}>
                  Chúc Mừng Ngày Quốc Tế Phụ Nữ
                </span>
                <div className={styles.highlightWrapper}>
                  <span className={styles.highlight}>8/3</span>
                  <span className={styles.sparkles}>✨</span>
                </div>
              </div>
            </h1>
            <p className={styles.subtitle}>
              Tạo thiệp chúc mừng ý nghĩa dành tặng những người phụ nữ bạn yêu
              thương
            </p>
          </div>
        </section>

        {/* Content Section with Card Creator */}
        <section className={styles.contentSection}>
          {!showCard ? (
            <div className={styles.creatorContainer}>
              <div className={styles.templateSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Chọn Mẫu Thiệp</h2>
                  <p className={styles.sectionDesc}>
                    Lựa chọn mẫu thiệp phù hợp với phong cách của bạn
                  </p>
                </div>
                <div className={styles.templateSelectorWrapper}>
                  <TemplateSelector
                    onSelectTemplate={setSelectedTemplate}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Tùy chỉnh Thiệp</h2>
                  <p className={styles.sectionDesc}>
                    Thêm thông tin và lời chúc của bạn
                  </p>
                </div>
                <div className={styles.wishFormWrapper}>
                  <WishForm
                    setName={setName}
                    setShowCard={setShowCard}
                    setRecipientType={setRecipientType}
                    setColorTheme={setColorTheme}
                    colorThemes={colorThemes}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.previewContainer}>
              <div className={styles.cardWrapper} ref={cardRef}>
                <WishCard
                  name={name}
                  recipientType={recipientType}
                  colorTheme={colorTheme}
                  onBack={() => setShowCard(false)}
                  template={selectedTemplate}
                />
              </div>
              <div className={styles.captureWrapper}>
                <CardCapture cardRef={cardRef} colorTheme={colorTheme} />
              </div>
            </div>
          )}
        </section>
      </main>

      <Confetti show={showCard} />
      <CutePets />

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Với tất cả yêu thương
          <span className={styles.heartIcon}>💖</span>
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
