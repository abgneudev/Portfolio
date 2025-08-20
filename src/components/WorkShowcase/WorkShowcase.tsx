import React, { useEffect, useState } from 'react';
import styles from './WorkShowcase.module.css';

interface WorkItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  position: {
    img: { left: number; top: number; width: number; height: number };
    text: { left: number; top: number };
  };
}

const WorkShowcase: React.FC = () => {
  // Track when to switch to stacked layout to avoid fighting inline styles on mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => {
      mq.removeEventListener?.('change', update);
    };
  }, []);

  // Subtle rotation variations for captions
  const captionRotations = [-1, 0.8, -0.3, 1.2, -0.7, 0.4];

  const workItems: WorkItem[] = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755584562/whiteboarding_y6ro8b.jpg',
      title: 'Research and Brainstorming',
      subtitle: 'with startup founders',
      position: {
        img: { left: 163, top: 412, width: 402, height: 536 },
        text: { left: 595, top: 654 }
      }
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074582/hack_dtm0q6.png',
      title: 'Frontend Engineering',
      subtitle: 'at Harvard Innovation Labs',
      position: {
        img: { left: 798, top: 959, width: 554, height: 769 },
        text: { left: 983, top: 846 }
      }
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074594/hackwin_q1xfde.png',
      title: 'Impact Award Winner',
      subtitle: 'at AWS',
      position: {
        img: { left: 240, top: 1182, width: 375, height: 323 },
        text: { left: 311, top: 1065 }
      }
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074592/bpl_sovi44.png',
      title: 'Collaborative Design Process',
      subtitle: 'at Boston Public Library',
      position: {
        img: { left: 139, top: 1762, width: 479, height: 635 },
        text: { left: 240, top: 1666 }  
      }
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074634/proto_h32v3g.png',
      title: 'Design Community Engagement',
      subtitle: 'at Bentley University',
      position: {
        img: { left: 694, top: 2220, width: 690, height: 391 },
        text: { left: 873, top: 2119 }
      }
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074581/arasri_mxqnbk.png',
      title: 'Meeting Industry Leaders',
      subtitle: 'at Harvard Business School',
      position: {
        img: { left: 220, top: 2707, width: 947, height: 525 },
        text: { left: 511, top: 3266 }
      }
    }
  ];

  return (
    <section className={styles.showcase}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>
          What my typical work <img
            src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755687712/workweek_tkfgsu.png"
            alt="A stick figure working at a desk"
            className={styles.mainTitleImage}
            style={{
              width: 40,
              margin: '0 8px 0 12px',
              height: 'auto',
              opacity: 0.92,
              maxWidth: '100%'
            }}
          /> week looks like
        </h2>

        {workItems.map((item, idx) => (
          <React.Fragment key={item.id}>
            <img 
              className={styles.image}
              style={{
                ...(isMobile
                  ? {}
                  : {
                      left: `${item.position.img.left}px`,
                      top: `${item.position.img.top}px`,
                      width: `${item.position.img.width}px`,
                      height: `${item.position.img.height}px`
                    }),
                // Per-item animation delay for nicer stagger
                animationDelay: `${0.1 * idx}s`
              }}
              src={item.image}
              alt={item.title}
              loading="lazy"
            />
            <div 
              className={styles.caption}
              style={{
                ...(isMobile
                  ? {}
                  : {
                      left: `${item.position.text.left}px`,
                      top: `${item.position.text.top}px`
                    }),
                animationDelay: `${0.15 + 0.1 * idx}s`
              }}
            >
              <span className={styles.captionTitle}>{item.title}</span>
              <br />
              <span
                className={styles.captionSubtitle}
                style={{ transform: `rotate(${captionRotations[idx % captionRotations.length]}deg)` }}
              >
                {item.subtitle}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default WorkShowcase;