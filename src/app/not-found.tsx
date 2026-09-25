import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "404 :(" };

export default function NotFound() {
  return (
    <main className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>not found :(</p>
    </main>
  );
}
