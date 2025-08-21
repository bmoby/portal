import React, { useState, useEffect } from "react";
import styles from "./CSVTable.module.css";

type CareerData = {
  profession: string;
  languages: string;
  tools: string;
  platforms: string;
  methodologies: string;
  nextSteps: string;
};

export default function CSVTable() {
  const [data, setData] = useState<CareerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/learn.csv");
        const csvText = await response.text();

        // Parser CSV robuste qui gère les guillemets et séparateurs internes
        const parseCSV = (text: string) => {
          const rows: string[][] = [];
          let currentRow: string[] = [];
          let currentCell = "";
          let inQuotes = false;

          for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
              currentRow.push(currentCell.trim());
              currentCell = "";
            } else if (char === "\n" && !inQuotes) {
              currentRow.push(currentCell.trim());
              if (currentRow.length > 0) {
                rows.push([...currentRow]);
              }
              currentRow = [];
              currentCell = "";
            } else {
              currentCell += char;
            }
          }

          // Ajouter la dernière cellule et ligne
          if (currentCell.trim()) {
            currentRow.push(currentCell.trim());
          }
          if (currentRow.length > 0) {
            rows.push(currentRow);
          }

          return rows;
        };

        const parsedRows = parseCSV(csvText);
        const headers = parsedRows[0];

        const parsedData = parsedRows
          .slice(1)
          .map((row) => {
            return {
              profession: row[0] || "",
              languages: row[1] || "",
              tools: row[2] || "",
              platforms: row[3] || "",
              methodologies: row[4] || "",
              nextSteps: row[5] || "",
            };
          })
          .filter((item) => item.profession.trim() !== "");

        setData(parsedData);
      } catch (error) {
        console.error("Erreur lors du chargement du CSV:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Chargement des carrières...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Карьера в информатике</h2>
        <p className={styles.subtitle}>
          Изучите пути и технологии для каждой профессии
        </p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Профессия</th>
              <th>Языки/технологии</th>
              <th>Инструменты</th>
              <th>Платформы/среда</th>
              <th>Методологии/практики</th>
              <th>Дальше изучать</th>
            </tr>
          </thead>
          <tbody>
            {data.map((career, index) => (
              <tr key={index} className={styles.row}>
                <td className={styles.profession}>{career.profession}</td>
                <td className={styles.cell}>
                  {career.languages.split(" · ").map((item, i) => (
                    <div key={i} className={styles.listItem}>
                      {item.trim()}
                    </div>
                  ))}
                </td>
                <td className={styles.cell}>
                  {career.tools.split(" · ").map((item, i) => (
                    <div key={i} className={styles.listItem}>
                      {item.trim()}
                    </div>
                  ))}
                </td>
                <td className={styles.cell}>
                  {career.platforms.split(" · ").map((item, i) => (
                    <div key={i} className={styles.listItem}>
                      {item.trim()}
                    </div>
                  ))}
                </td>
                <td className={styles.cell}>
                  {career.methodologies.split(" · ").map((item, i) => (
                    <div key={i} className={styles.listItem}>
                      {item.trim()}
                    </div>
                  ))}
                </td>
                <td className={styles.cell}>
                  {career.nextSteps.split(" · ").map((item, i) => (
                    <div key={i} className={styles.listItem}>
                      {item.trim()}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
