"use client";

import React, { useState, useRef } from "react";
import styles from "./AboutShowcase.module.css";
import { analytics } from "@/lib/analytics";

const personalPictures = {
  food: [
    { id: "f1", title: "Pizza!", img: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755076186/pizza_v1gr4z.png", date: "Giordano's, Chicago", position: "foodPos1", rotation: "rotateNeg5", tape: "tapeBlue" },
    { id: "f2", title: "Fresh Fruit Tea", img: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755076182/asianfood_hlltzb.png", date: "Chinatown, NYC", position: "foodPos2", rotation: "rotatePos4", tape: "tapePink", hasPin: true },
    { id: "f3", title: "Indian Thali", img: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755076324/food_ubydds.png", date: "North India", position: "foodPos3", rotation: "rotateNeg3", tape: "tapeYellow", sticker: "heart" },
  ],
  activities: [
    { id: "a1", title: "Scuba Diving!", img: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755075172/scooba_sd8qfj.png", date: "Andaman & Nicobar Islands", position: "activityPos1", rotation: "rotateNeg4", tape: "tapeGreen" },
    { id: "a2", title: "Jet Ski", img: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755075182/jetskii_cg9snd.png", date: "Goa, India", position: "activityPos2", rotation: "rotatePos3", hasPin: true, sticker: "star" },
    { id: "a3", title: "White Water Rafting", img: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074655/rafting_usipjy.png", date: "Rishikesh, India", position: "activityPos3", rotation: "rotateNeg6", tape: "tapePurple" },
    { id: "a4", title: "Jet Ski Adventures", img: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074749/jetski_pobjpt.png", date: "Beach Day", position: "activityPos4", rotation: "rotatePos4", tape: "tapeBlue" },
  ],
  books: [
    { id: "b1", title: "Crime and Punishment", author: "Fyodor Dostoevsky", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088217/Crimeandpunishmentcover_hhiiti.png", color: "#1a1a1a", url: "https://www.goodreads.com/book/show/7144.Crime_and_Punishment" },
    { id: "b2", title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088216/tbk_jhxvjz.jpg", color: "#f59e0b", url: "https://www.goodreads.com/book/show/4934.The_Brothers_Karamazov" },
    { id: "b3", title: "Kafka on the Shore", author: "Haruki Murakami", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088214/kafkaonshore_zoqrwd.jpg", color: "#2563eb", url: "https://www.goodreads.com/book/show/4929.Kafka_on_the_Shore" },
    { id: "b4", title: "The Wind-Up Bird Chronicle", author: "Haruki Murakami", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088217/windup_ggshgx.jpg", color: "#06b6d4", url: "https://www.goodreads.com/book/show/11275.The_Wind_Up_Bird_Chronicle" },
    { id: "b5", title: "The Trial", author: "Franz Kafka", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088213/trial_o4weno.jpg", color: "#1a1a1a", url: "https://www.goodreads.com/book/show/17690.The_Trial" },
    { id: "b6", title: "The Stranger", author: "Albert Camus", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088209/stragner_u1pawk.jpg", color: "#8b5cf6", url: "https://www.goodreads.com/book/show/49552.The_Stranger" },
    { id: "b7", title: "Steve Jobs", author: "Walter Isaacson", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088213/steve_ooed42.jpg", color: "#10b981", url: "https://www.goodreads.com/book/show/11084145-steve-jobs" },
    { id: "b8", title: "Don't Make Me Think", author: "Steve Krug", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088209/dont_mjvmsx.jpg", color: "#ef4444", url: "https://www.goodreads.com/book/show/18197267-don-t-make-me-think-revisited" },
    { id: "b9", title: "Ham on Rye", author: "Charles Bukowski", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088210/ham_ulxmu8.jpg", color: "#ec4899", url: "https://www.goodreads.com/book/show/38501.Ham_on_Rye" },
    { id: "b10", title: "Animal Farm", author: "George Orwell", image: "https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755090681/animal_farm_cover2014_vzow4i.jpg", color: "#06b6d4", url: "https://www.goodreads.com/book/show/170448.Animal_Farm" },
  ],
};

type Photo = {
  id: string;
  title: string;
  img: string;
  date: string;
  position: string;
  rotation: string;
  tape?: string;
  hasPin?: boolean;
  sticker?: string;
};

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  color: string;
  url: string;
};

const AboutShowcase: React.FC = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    analytics.trackVideoPlay("Adventure Video");
  };

  const handleVideoPause = () => {
    analytics.trackVideoPause("Adventure Video");
  };

  const handleVideoEnded = () => {
    analytics.trackVideoEnded("Adventure Video");
  };

  const renderTape = (tapeClass?: string) => {
    if (!tapeClass) return null;
    return (
      <div className={`${styles.tape} ${styles[tapeClass]}`}>
        <div className={styles.tapePattern}></div>
      </div>
    );
  };

  const renderPin = () => (
    <div className={styles.pushPin}>
      <div className={styles.pushPinOuter}></div>
      <div className={styles.pushPinMiddle}></div>
      <div className={styles.pushPinInner}></div>
    </div>
  );

  const renderSticker = (sticker?: string) => {
    if (!sticker) return null;
    const stickerEmojis: Record<string, string> = {
      heart: "❤️",
      star: "⭐",
      pizza: "🍕",
      wave: "🌊",
    };
    const stickerClass = `sticker${sticker.charAt(0).toUpperCase() + sticker.slice(1)}`;
    return (
      <span className={`${styles.sticker} ${styles[stickerClass]}`}>
        {stickerEmojis[sticker]}
      </span>
    );
  };

  const renderPhoto = (photo: Photo) => {
    const isHovered = hoveredPhoto === photo.id;

    return (
      <div
        key={photo.id}
        className={`${styles.polaroidCard} ${styles[photo.position]} ${styles[photo.rotation]} ${isHovered ? styles.polaroidHovered : styles.polaroidNormal}`}
        onMouseEnter={() => setHoveredPhoto(photo.id)}
        onMouseLeave={() => setHoveredPhoto(null)}
      >
        {photo.tape && renderTape(photo.tape)}
        {photo.hasPin && renderPin()}
        <div className={styles.polaroidContent}>
          <div className={styles.polaroidPhotoWrapper}>
            <img
              src={photo.img}
              alt={photo.title}
              className={`${styles.polaroidPhoto} ${isHovered ? styles.photoHovered : styles.photoNormal}`}
            />
            <div className={styles.photoOverlay}></div>
          </div>
          <div className={styles.polaroidCaption}>
            <span className={styles.polaroidTitle}>{photo.title}</span>
            <span className={styles.polaroidDate}>{photo.date}</span>
          </div>
          {renderSticker(photo.sticker)}
        </div>
      </div>
    );
  };

  const renderBook = (book: Book, index: number) => {
    const isHovered = hoveredBook === book.id;

    return (
      <a
        key={book.id}
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.bookLink}
        onMouseEnter={() => setHoveredBook(book.id)}
        onMouseLeave={() => setHoveredBook(null)}
      >
        <div
          className={styles.book}
          style={{ "--book-color": book.color } as React.CSSProperties}
        >
          <div className={styles.bookSpine}>
            <span className={styles.bookTitle}>{book.title}</span>
          </div>
          <div className={`${styles.bookCover} ${isHovered ? styles.bookCoverVisible : ""}`}>
            <img src={book.image} alt={book.title} className={styles.bookCoverImage} />
          </div>
        </div>
      </a>
    );
  };

  return (
    <section className={styles.showcase}>
      <div className={styles.scrapbookSection}>
        <div className={styles.scrapbookContainer}>
          <h2 className={styles.scrapbookTitle}>What I love doing outside of work</h2>

          <div className={styles.videoWrapper}>
            <video
              ref={videoRef}
              className={styles.adventureVideo}
              autoPlay
              muted
              playsInline
              controls
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
            >
              <source src="https://res.cloudinary.com/dbvfgfqqh/video/upload/v1766977089/adv_video_veirsx.mp4" type="video/mp4" />
            </video>
          </div>

          <div className={styles.categoriesContainer}>
            {/* Food Tours */}
            <div className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>Food Tours</h3>
              <div className={styles.scrapbookBoard}>
                {(personalPictures.food as Photo[]).map((photo) => renderPhoto(photo))}
              </div>
            </div>

            {/* Adventures */}
            <div className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>Adventures</h3>
              <div className={styles.scrapbookBoard}>
                {(personalPictures.activities as Photo[]).map((photo) => renderPhoto(photo))}
              </div>
            </div>

            {/* Reading List */}
            <div className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>Reading List</h3>
              <div className={styles.bookshelf}>
                {personalPictures.books.map((book, index) => renderBook(book, index))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutShowcase;
