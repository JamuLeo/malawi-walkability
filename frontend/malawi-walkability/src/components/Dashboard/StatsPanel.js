'use client'

import { useStats } from '@/hooks/useMapData'
import styles from './statsPanel.module.css'

export default function StatsPanel() {
  const { stats, loading } = useStats()

  if (loading) {
    return (
      <div className={`${styles.panel} ${styles.loading}`}>
        <div className={styles.loadingTitle}></div>
        <div className={styles.grid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.loadingBox}></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>Blantyre Overview</h3>

      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={`${styles.value} ${styles.blue}`}>{stats.totalRoads}</p>
          <p className={styles.label}>Total Roads</p>
        </div>

        <div className={styles.card}>
          <p className={`${styles.value} ${styles.green}`}>{stats.avgScore}</p>
          <p className={styles.label}>Avg Score</p>
        </div>

        <div className={styles.card}>
          <p className={`${styles.value} ${styles.orange}`}>{stats.priorityRoads}</p>
          <p className={styles.label}>Priority Roads</p>
        </div>

        <div className={styles.card}>
          <p className={`${styles.value} ${styles.purple}`}>{stats.totalServices}</p>
          <p className={styles.label}>Services</p>
        </div>
      </div>
    </div>
  )
}
