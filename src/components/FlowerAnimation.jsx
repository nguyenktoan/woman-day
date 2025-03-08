import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

export default function FlowerAnimation() {
  // Sử dụng hình ảnh hoa từ nguồn online
  const flowerImages = [
    "https://i.imgur.com/8YkBB8L.png", // Hoa hồng
    "https://i.imgur.com/QJP3nBL.png", // Hoa đào
    "https://i.imgur.com/6oH9h8x.png", // Hoa tulip
    "https://i.imgur.com/JR8P0Wm.png", // Hoa cúc
  ];

  const flowers = Array(15).fill(0);

  return (
    <div className={styles.flowerContainer}>
      {flowers.map((_, index) => {
        const randomFlower =
          flowerImages[Math.floor(Math.random() * flowerImages.length)];
        return (
          <motion.div
            key={index}
            className={styles.flower}
            initial={{
              top: `${Math.random() * -20}%`,
              left: `${Math.random() * 100}%`,
              opacity: 1,
            }}
            animate={{
              top: "100%",
              opacity: 0.7,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              width: `${Math.random() * 30 + 20}px`,
              height: `${Math.random() * 30 + 20}px`,
              backgroundImage: `url(${randomFlower})`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
