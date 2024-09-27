import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>MAIN</h1>
      <h3>To Do:</h3>
      <div style={{ marginLeft: "2rem", marginBottom: "1rem" }}>
        <ul>
          <li>Store data (indexedDB or localStorage)</li>
          <li>Define headers (labels)</li>
          <li>Check and display completion of the data</li>
          <li>Display graph</li>
          <li>Highlights (alerts) on anomalies</li>
          <li>Multiple possible datasets</li>
        </ul>
      </div>
      <h5 style={{ marginTop: "1rem" }}>Stage 1</h5>
      <p>Make store for only power data with set labels and store</p>
      <h5 style={{ marginTop: "1rem" }}>Stage 2</h5>
      <p>
        make it generic so you can add any form of data with custom defined
        labels
      </p>
    </main>
  );
}
