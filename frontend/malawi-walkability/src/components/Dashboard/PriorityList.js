'use client'

import { usePriorities } from '@/hooks/useMapData'
import styles from './priorityList.module.css'

export default function PriorityList({ onSelectRoad }) {
  const { priorities, loading } = usePriorities()

  if (loading) {
    return <div className={styles.loading}></div>
  }

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.header}>
        <h3 className={styles.title}>Priority Improvement Areas</h3>
        <p className={styles.subtitle}>Roads requiring urgent attention</p>
      </div>

      <div className={styles.list}>
        {priorities.length === 0 ? (
          <div className={styles.empty}>
            <p>No priority areas found</p>
            <p className={styles.emptySmall}>Connect to backend to load data</p>
          </div>
        ) : (
          priorities.map((area, index) => (
            <div 
              key={area.id}
              className={styles.item}
              onClick={() => onSelectRoad && onSelectRoad(area)}
            >
              <div className={styles.row}>
                <div className={styles.left}>
                  
                  <div className={styles.rankLine}>
                    <span className={styles.rank}>#{index + 1}</span>
                    <h4 className={styles.name}>{area.name || `Area ${area.id}`}</h4>
                  </div>

                  <div className={styles.details}>
                    <span>Score: {area.avg_score}/100</span>
                    <span>•</span>
                    <span>{area.population_affected} people affected</span>
                  </div>

                  {area.missing_services?.length > 0 && (
                    <div className={styles.badges}>
                      {area.missing_services.map(service => (
                        <span key={service} className={styles.badge}>{service}</span>
                      ))}
                    </div>
                  )}
                </div>

                <span className={`${styles.priorityLabel} ${
                  area.priority === 'critical'
                    ? styles.priorityCritical
                    : area.priority === 'high'
                    ? styles.priorityHigh
                    : styles.priorityMedium
                }`}>
                  {area.priority}
                </span>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
