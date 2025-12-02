import styles from './filterControls.module.css'

export default function FilterControls({ filters, setFilters }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Filters</h3>

      <div>

        {/* Score Range */}
        <div className={styles.section}>
          <label className={styles.label}>Walkability Score Range</label>

          <div className={styles.rangeRow}>
            <input
              type="number"
              min="0"
              max="100"
              value={filters.minScore}
              onChange={(e) =>
                setFilters({ ...filters, minScore: parseInt(e.target.value) })
              }
              className={styles.inputSmall}
            />

            <span>to</span>

            <input
              type="number"
              min="0"
              max="100"
              value={filters.maxScore}
              onChange={(e) =>
                setFilters({ ...filters, maxScore: parseInt(e.target.value) })
              }
              className={styles.inputSmall}
            />
          </div>
        </div>

        {/* Road Type */}
        <div className={styles.section}>
          <label className={styles.label}>Road Type</label>

          <select
            value={filters.roadType}
            onChange={(e) =>
              setFilters({ ...filters, roadType: e.target.value })
            }
            className={styles.select}
          >
            <option value="all">All Types</option>
            <option value="primary">Primary Roads</option>
            <option value="secondary">Secondary Roads</option>
            <option value="tertiary">Tertiary Roads</option>
          </select>
        </div>

        {/* Service Toggles */}
        <div className={styles.section}>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={filters.showSchools}
              onChange={(e) =>
                setFilters({ ...filters, showSchools: e.target.checked })
              }
              className={styles.checkbox}
            />
            <span className={styles.checkboxLabel}>Show Schools</span>
          </label>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={filters.showHealth}
              onChange={(e) =>
                setFilters({ ...filters, showHealth: e.target.checked })
              }
              className={styles.checkbox}
            />
            <span className={styles.checkboxLabel}>Show Health Facilities</span>
          </label>
        </div>

      </div>
    </div>
  )
}
