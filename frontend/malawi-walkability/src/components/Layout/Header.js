import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.row}>
          
          <div>
            <h1 className={styles.title}>Blantyre Walkability Analysis</h1>
            <p className={styles.subtitle}>
              Urban pedestrian accessibility mapping for Blantyre District, Malawi
            </p>
          </div>

          <div className={styles.dataSource}>
            <p className={styles.dataTitle}>HDX Malawi Data</p>
            <p className={styles.dataSub}>Real-time Infrastructure Analysis</p>
          </div>

        </div>
      </div>
    </header>
  );
}
