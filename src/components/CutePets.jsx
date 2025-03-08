import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/CutePets.module.css";

const CUTE_CATS = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/originals/6e/24/db/6e24db7e8d4d98939d65081fc50259ca.png",
    name: "Mochi",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/originals/c1/d3/d9/c1d3d9d508cc317dd3ef7c675c0c6873.png",
    name: "Mimi",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/originals/14/37/54/1437544758d3942af809409da7304fc2.png",
    name: "Neko",
  },
];

export default function CutePets() {
  const [pets, setPets] = useState([]);
  const animationFrameRef = useRef();
  const lastUpdateRef = useRef(0);

  // Initialize pets after component mount
  useEffect(() => {
    setPets(
      CUTE_CATS.map((cat) => ({
        ...cat,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        directionX: Math.random() > 0.5 ? 1 : -1,
        directionY: Math.random() > 0.5 ? 1 : -1,
        isJumping: false,
      }))
    );
  }, []);

  useEffect(() => {
    if (pets.length === 0) return;

    const updatePositions = () => {
      const now = Date.now();
      const delta = (now - lastUpdateRef.current) / 16;
      lastUpdateRef.current = now;

      setPets((prevPets) =>
        prevPets.map((pet) => {
          let { x, y, directionX, directionY, isJumping } = pet;
          const speed = 2;

          // Random direction changes
          if (Math.random() < 0.02) directionX *= -1;
          if (Math.random() < 0.02) directionY *= -1;

          // Random jumping
          if (Math.random() < 0.01 && !isJumping) {
            isJumping = true;
            setTimeout(() => {
              setPets((pets) =>
                pets.map((p) =>
                  p.id === pet.id ? { ...p, isJumping: false } : p
                )
              );
            }, 1000);
          }

          // Update position
          x += speed * directionX * delta;
          y += speed * directionY * delta;

          // Screen boundaries
          const maxX =
            typeof window !== "undefined" ? window.innerWidth - 100 : 1000;
          const maxY =
            typeof window !== "undefined" ? window.innerHeight - 100 : 800;

          if (x <= 0 || x >= maxX) directionX *= -1;
          if (y <= 0 || y >= maxY) directionY *= -1;

          x = Math.max(0, Math.min(maxX, x));
          y = Math.max(0, Math.min(maxY, y));

          return { ...pet, x, y, directionX, directionY, isJumping };
        })
      );

      animationFrameRef.current = requestAnimationFrame(updatePositions);
    };

    updatePositions();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pets.length]);

  if (pets.length === 0) return null;

  return (
    <div className={styles.petsContainer}>
      {pets.map((pet) => (
        <div
          key={pet.id}
          className={`${styles.pet} ${pet.isJumping ? styles.jumping : ""}`}
          style={{
            transform: `translate(${pet.x}px, ${pet.y}px) scaleX(${
              pet.directionX > 0 ? 1 : -1
            })`,
          }}
        >
          <Image
            src={pet.image}
            alt={pet.name}
            width={80}
            height={80}
            className={styles.petImage}
            priority
          />
          <div className={styles.emotions}>
            {pet.isJumping && <span className={styles.emotion}>✨</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
