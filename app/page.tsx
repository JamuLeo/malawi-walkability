"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Map from '../components/Map/Index'

export default function Home() {
  return (
    <div className={styles.page}>
      <Map/>
     </div>
  );
}
