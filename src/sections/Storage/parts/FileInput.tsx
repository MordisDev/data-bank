import { DateTime } from "luxon";
import { ChangeEvent, useState, useEffect } from "react";

import Papa from "papaparse";

import { usePowerBankStore } from "@/store/store";

import { INPUT_DATE_FORMAT, HOURLY_DATE_FORMAT } from "@/utils/dateFormats";

export const FileInput = () => {
  const [csvFile, setCsvFile] = useState<File>();

  const { dataRecords, updateRecord, updateFromHour, clearStore } =
    usePowerBankStore((state) => state);

  console.log(dataRecords);

  const { hourly, daily, weekly, monthly } = dataRecords;

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setCsvFile(event.target.files[0]);
    }
  };
  const parseHandler = () => {
    if (csvFile) {
      Papa.parse<string[]>(csvFile, {
        skipEmptyLines: true,
        complete: (result) => {
          result.data.map((item) => {
            const date = DateTime.fromFormat(item[0], INPUT_DATE_FORMAT);

            if (date.isValid) {
              updateRecord(
                {
                  date: date.toFormat(HOURLY_DATE_FORMAT),
                  usage: parseFloat(item[1].replace(/,/, ".")),
                  production: parseFloat(item[2].replace(/,/, ".")),
                  balance: parseFloat(item[3].replace(/,/, ".")),
                  lastUpdated: DateTime.now().toISO(),
                },
                "hourly"
              );
            }
          });
        },
      });
    }
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={inputHandler} />
      <button onClick={parseHandler}>Parse</button>
      {hourly ? (
        <div style={{ maxHeight: "300px", overflow: "scroll" }}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Wykorzystane</th>
                <th>Produkcja</th>
                <th>Bilans</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {hourly.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.usage}</td>
                  <td>{item.production}</td>
                  <td>{item.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : undefined}
      <button onClick={() => updateFromHour("daily")}>Generate daily</button>
      {daily ? (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Wykorzystane</th>
              <th>Produkcja</th>
              <th>Bilans</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {daily.map((item, index) => {
              const dayOfWeek = DateTime.fromISO(item.date).toFormat("ccc");
              return (
                <tr
                  key={index}
                  style={{
                    color:
                      dayOfWeek === "Sat" || dayOfWeek === "Sun"
                        ? "red"
                        : "black",
                  }}
                >
                  <td>
                    {DateTime.fromISO(item.date).toFormat("yyyy-LL-dd (ccc)")}
                  </td>
                  <td>{item.usage.toFixed(3)}</td>
                  <td>{item.production.toFixed(3)}</td>
                  <td>{item.balance.toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : undefined}
      <button onClick={() => updateFromHour("weekly")}>Generate Weekly</button>
      {weekly ? (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Wykorzystane</th>
              <th>Produkcja</th>
              <th>Bilans</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {weekly.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.usage.toFixed(3)}</td>
                <td>{item.production.toFixed(3)}</td>
                <td>{item.balance.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : undefined}
      <button onClick={() => updateFromHour("monthly")}>
        Generate Monthly
      </button>
      {monthly ? (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Wykorzystane</th>
              <th>Produkcja</th>
              <th>Bilans</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {monthly.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.usage.toFixed(3)}</td>
                <td>{item.production.toFixed(3)}</td>
                <td>{item.balance.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : undefined}
      <button onClick={clearStore}>Clear</button>
    </>
  );
};
