"use client";

import React from 'react';
import Image from 'next/image';
import { Container, Grid, GridItem } from '@/components/layout/Grid';
import styles from './WorkShowcase.module.css';
import Description from './Description';

interface WorkItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const WorkShowcase: React.FC = () => {
  const workItems: WorkItem[] = [
    { id: 1, image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755584562/whiteboarding_y6ro8b.jpg', title: 'Research and Brainstorming', subtitle: 'with startup founders' },
    { id: 2, image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074582/hack_dtm0q6.png', title: 'Frontend Engineering', subtitle: 'at Harvard Innovation Labs' },
    { id: 3, image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074594/hackwin_q1xfde.png', title: 'Building at Hackathons', subtitle: 'Across Boston’s Innovation Hubs' },
    { id: 4, image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755074592/bpl_sovi44.png', title: 'Networking and Collaboration', subtitle: 'at Coworking Spaces' },
    { id: 5, image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1758840241/online_d3fry4.png', title: 'Organizing Meetups and Events', subtitle: 'across Boston\'s design community' },
    { id: 6, image: 'https://res.cloudinary.com/dbvfgfqqh/image/upload/v1758840383/arasri_mxqnbk.png', title: 'Meeting Industry Leaders', subtitle: 'at Harvard Business School' }
  ];

  return (
    <section className={styles.showcase}>
      <Container>
        <Grid>
          <GridItem span={4} mdSpan={8} lgSpan={12}>
            <h2 className={styles.mainTitle}>
              <span className={styles.titleTextRight}>What my typical work</span>
              <Image
                src="https://res.cloudinary.com/dbvfgfqqh/image/upload/v1755687712/workweek_tkfgsu.png"
                alt="A stick figure working at a desk"
                className={styles.mainTitleImage}
                width={48}
                height={48}
                priority
              />
              <span className={styles.titleTextLeft}>week looks like</span>
            </h2>
          </GridItem>
        </Grid>

        <Grid className={styles.workGrid}>
          {workItems.map((item) => (
            <React.Fragment key={item.id}>
              <GridItem span={4} lgStart={1} lgSpan={4} className={styles.colTitle}>
                <div className={styles.workCaption}>
                  <h3 className={styles.workTitle}>{item.title}</h3>
                  <p className={styles.workSubtitle}>{item.subtitle}</p>
                </div>
              </GridItem>

              <GridItem span={4} lgStart={5} lgSpan={4} className={styles.colImage}>
                <Image
                  src={item.image}
                  alt={item.title}
                  className={styles.workImage}
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                />
              </GridItem>

              <GridItem span={4} lgStart={9} lgSpan={4} className={styles.colDesc}>
                <div className={styles.workCaption}>
                  <Description />
                </div>
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default WorkShowcase;