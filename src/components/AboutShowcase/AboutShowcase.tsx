import React, { useState } from 'react';
import styles from './AboutShowcase.module.css';

// Personal pictures data organized by category
const personalPictures = {
  food: [
    { id: 'f1', title: 'Pizza!', img: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755076186/pizza_v1gr4z.png', date: 'Giordano\'s, Chicago', rotation: -5 },
    { id: 'f2', title: 'Fresh Fruit Tea', img: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755076182/asianfood_hlltzb.png', date: 'Chinatown, NYC', rotation: 3 },
    { id: 'f3', title: 'Indian Thali', img: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755076324/food_ubydds.png', date: 'North India', rotation: -4 },
  ],
  activities: [
    { id: 'a1', title: 'Scuba Diving!', img: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755075172/scooba_sd8qfj.png', date: 'Andaman & Nicobar Islands', rotation: 7 },
    { id: 'a2', title: 'Jet Ski', img: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755075182/jetskii_cg9snd.png', date: 'Goa, India', rotation: -3 },
    { id: 'a3', title: 'White Water Rafting', img: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074655/rafting_usipjy.png', date: 'Rishikesh, India', rotation: 4 },
    { id: 'a4', title: 'Jet Ski', img: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074749/jetski_pobjpt.png', date: 'Chicago Skyline', rotation: -6 },
  ],
  books: [
    { id: 'b1', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088217/Crimeandpunishmentcover_hhiiti.png' },
    { id: 'b2', title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088216/tbk_jhxvjz.jpg' },
    { id: 'b3', title: 'Kafka on the Shore', author: 'Haruki Murakami', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088214/kafkaonshore_zoqrwd.jpg' },
    { id: 'b4', title: 'The Wind-Up Bird Chronicle', author: 'Haruki Murakami', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088217/windup_ggshgx.jpg' },
    { id: 'b5', title: 'The Trial', author: 'Franz Kafka', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088213/trial_o4weno.jpg' },
    { id: 'b6', title: 'The Stranger', author: 'Albert Camus', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088209/stragner_u1pawk.jpg' },
    { id: 'b7', title: 'Steve Jobs', author: 'Walter Isaacson', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088213/steve_ooed42.jpg' },
    { id: 'b8', title: 'Don\'t Make Me Think', author: 'Steve Krug', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088209/dont_mjvmsx.jpg' },
    { id: 'b9', title: 'Ham on Rye', author: 'Charles Bukowski', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755088210/ham_ulxmu8.jpg' },
    { id: 'b10', title: 'Animal Farm', author: 'George Orwell', image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755090681/animal_farm_cover2014_vzow4i.jpg' },
  ]
};

type PersonalPicture = {
  id: string;
  title: string;
  img: string;
  date: string;
  rotation: number;
};

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const AboutShowcase: React.FC = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);

  // Tape colors mapping
  const tapeColorClasses = [
    styles.tapeYellow,
    styles.tapePink,
    styles.tapeBlue,
    styles.tapeGreen,
    styles.tapePurple
  ];

  // Tape component for scrapbook
  const Tape = ({ colorIndex }: { colorIndex: number }) => {
    return (
      <div className={`${styles.tape} ${tapeColorClasses[colorIndex % tapeColorClasses.length]}`}>
        <div className={styles.tapePattern} />
      </div>
    );
  };

  // Push pin component
  const PushPin = () => (
    <div className={styles.pushPin}>
      <div className={styles.pushPinOuter} />
      <div className={styles.pushPinMiddle} />
      <div className={styles.pushPinInner} />
    </div>
  );

  // Get position class based on index within category
  const getPositionClass = (category: string, index: number) => {
    if (category === 'food') {
      const positions = [styles.foodPos1, styles.foodPos2, styles.foodPos3];
      return positions[index % positions.length];
    } else if (category === 'activities') {
      const positions = [styles.activityPos1, styles.activityPos2, styles.activityPos3, styles.activityPos4];
      return positions[index % positions.length];
    } else {
      const positions = [styles.bookPos1, styles.bookPos2, styles.bookPos3];
      return positions[index % positions.length];
    }
  };

  // Render book for bookshelf
  const renderBook = (book: Book, index: number) => {
    const isHovered = hoveredBookId === book.id;
    
    // Book colors - clean distinct palette matching reference
    const bookColors = [
      '#1a1a1a', // Black
      '#f59e0b', // Orange  
      '#2563eb', // Blue
      '#06b6d4', // Cyan
      '#1a1a1a', // Black
      '#8b5cf6', // Purple
      '#10b981', // Green
      '#ef4444', // Red
      '#6366f1', // Indigo
      '#ec4899'  // Pink
    ];

    // Rotation values for natural positioning
    const rotations = [-2, 1, -1, 2, -1.5, 1.5, -0.5, 1, -1, 0.5];
    
    return (
      <div
        key={book.id}
        className={`${styles.book} ${isHovered ? styles.bookHovered : ''}`}
        onMouseEnter={() => setHoveredBookId(book.id)}
        onMouseLeave={() => setHoveredBookId(null)}
        style={{ 
          '--book-color': bookColors[index % bookColors.length],
          '--base-rotation': `${rotations[index % rotations.length]}deg`
        } as React.CSSProperties}
      >
        <div className={styles.bookSpine}>
          <span className={styles.bookTitle}>{book.title}</span>
        </div>
        <div className={`${styles.bookCover} ${isHovered ? styles.bookCoverVisible : ''}`}>
          <img 
            src={book.image} 
            alt={book.title}
            className={styles.bookCoverImage}
          />
        </div>
      </div>
    );
  };

  // Render polaroid card
  const renderPolaroidCard = (item: PersonalPicture, category: string, index: number) => {
    const isHovered = hoveredCardId === item.id;
    const colorIndex = category === 'food' ? index : category === 'activities' ? index + 3 : index + 7;
    
    return (
      <div
        key={item.id}
        className={`${styles.polaroidCard} ${getPositionClass(category, index)} ${
          isHovered ? styles.polaroidHovered : styles.polaroidNormal
        } ${styles[`rotate${item.rotation > 0 ? 'Pos' : 'Neg'}${Math.abs(item.rotation)}`]}`}
        onMouseEnter={() => setHoveredCardId(item.id)}
        onMouseLeave={() => setHoveredCardId(null)}
      >
        <div className={styles.polaroidContent}>
          {/* Tape or Pin */}
          {index % 2 === 0 ? (
            <Tape colorIndex={colorIndex} />
          ) : (
            <PushPin />
          )}
          
          {/* Photo */}
          <div className={styles.polaroidPhotoWrapper}>
            <img
              src={item.img}
              alt={item.title}
              className={`${styles.polaroidPhoto} ${
                isHovered ? styles.photoHovered : styles.photoNormal
              }`}
            />
            <div className={styles.photoOverlay} />
          </div>
          
          {/* Handwritten caption */}
          <div className={styles.polaroidCaption}>
            <h3 className={styles.polaroidTitle}>
              {item.title}
            </h3>
            <p className={styles.polaroidDate}>
              {item.date}
            </p>
          </div>
          
          {/* Decorative stickers based on category and index */}
          {category === 'food' && index === 0 && (
            <div className={`${styles.sticker} ${styles.stickerPizza}`}>
              🍕
            </div>
          )}
          {category === 'food' && index === 2 && (
            <div className={`${styles.sticker} ${styles.stickerHeart}`}>
              ❤️
            </div>
          )}
          {category === 'activities' && index === 0 && (
            <div className={`${styles.sticker} ${styles.stickerWave}`}>
              🌊
            </div>
          )}
          {category === 'activities' && index === 1 && (
            <div className={`${styles.sticker} ${styles.stickerStar}`}>
              ⭐
            </div>
          )}
          {category === 'activities' && index === 2 && (
            <div className={`${styles.sticker} ${styles.stickerLightning}`}>
              ⚡
            </div>
          )}
        </div>
        
        {/* Paper clip for specific items */}
        {(category === 'food' && index === 1) || (category === 'activities' && index === 3) ? (
          <div className={styles.paperClip} />
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles.showcase}>
      {/* Personal Section - Scrapbook Style */}
      <section className={styles.scrapbookSection}>
        <div className={styles.scrapbookContainer}>
          <h1 className={styles.scrapbookTitle}>
            What I love doing outside of work
          </h1>
          
          {/* Two column container for Food and Activities */}
          <div className={styles.categoriesContainer}>
            {/* Food Section - Left Column */}
            <div className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>Food Tours</h2>
              <div className={styles.scrapbookBoard}>
                {personalPictures.food.map((item, index) => 
                  renderPolaroidCard(item, 'food', index)
                )}
              </div>
            </div>

            {/* Activities Section - Right Column */}
            <div className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>Sports and Nature!</h2>
              <div className={styles.scrapbookBoard}>
                {personalPictures.activities.map((item, index) => 
                  renderPolaroidCard(item, 'activities', index)
                )}
              </div>
            </div>
          </div>

          {/* Books Section - Bookshelf */}
          <div className={styles.bookshelfSection}>
            <h2 className={styles.categoryTitle}>My Reading List</h2>
            <div className={styles.bookshelfContainer}>
              <div className={styles.bookshelf}>
                {personalPictures.books.map((book, index) => 
                  renderBook(book, index)
                )}
                <div className={styles.shelf}></div>
              </div>
            </div>
          </div>
          
          {/* Footer decorations */}
          <div className={styles.scrapbookFooter}>
            <p className={styles.scrapbookFooterText}>
              ~ Stay hungry. Stay foolish. ~
            </p>
            <div className={`${styles.decoration} ${styles.decorationFlower}`}>
              🌻
            </div>
            <div className={`${styles.decoration} ${styles.decorationCamera}`}>
              📷
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutShowcase;