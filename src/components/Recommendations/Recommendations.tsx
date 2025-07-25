import React from 'react';
import styles from './Recommendations.module.css';

const Recommendations: React.FC = () => {
  return (
    <div className={styles.recommendations}>
      <div className="grid">
        <div style={{ gridColumn: '2 / span 10', width: '100%' }}>
          <p>Recommendations coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;