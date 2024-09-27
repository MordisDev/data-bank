import { DateTime } from "luxon";

import type { DataScope, PowerBankRecord } from "./type";
import type { PowerBankMainStore } from "./store";

import { HOURLY_DATE_FORMAT } from "@/utils/dateFormats";

export const addRecord = (
  record: PowerBankRecord,
  state: PowerBankMainStore,
  scope: DataScope
): PowerBankMainStore => ({
  ...state,
  dataRecords: {
    ...state.dataRecords,
    [scope]: [...state.dataRecords[scope], record],
  },
});

export const updateRecord = (
  record: PowerBankRecord,
  state: PowerBankMainStore,
  scope: DataScope
): PowerBankMainStore => ({
  ...state,
  dataRecords: {
    ...state.dataRecords,
    [scope]: [
      ...state.dataRecords[scope].map((stateRecord) =>
        record.date === stateRecord.date ? record : stateRecord
      ),
    ],
  },
});

export const generateFromBase = (
  base: PowerBankRecord[],
  toScope: Exclude<DataScope, "hourly">
): PowerBankRecord[] => {
  console.log("recounting");
  const generated: PowerBankRecord[] = [];
  base.forEach((record) => {
    const targetDate = convertDate(record.date, toScope);
    if (targetDate) {
      const generatedRecordId = generated.findIndex(
        (generatedRecord) => generatedRecord.date === targetDate
      );

      if (generatedRecordId !== -1) {
        generated[generatedRecordId].usage += record.usage;
        generated[generatedRecordId].production += record.production;
        generated[generatedRecordId].balance += record.balance;
      } else {
        generated.push({ ...record, date: targetDate });
      }
    }
  });
  return generated;
};

const convertDate = (date: string, toFormat: Exclude<DataScope, "hourly">) => {
  switch (toFormat) {
    case "daily":
      return DateTime.fromFormat(date, HOURLY_DATE_FORMAT).toISODate();
    case "monthly":
      return DateTime.fromFormat(date, HOURLY_DATE_FORMAT).toFormat("yyyy-LL");
    case "weekly":
      return DateTime.fromFormat(date, HOURLY_DATE_FORMAT).toFormat("yyyy WW");
    case "yearly":
      return DateTime.fromFormat(date, HOURLY_DATE_FORMAT).toFormat("yyyy");
  }
};

const hourlyToDay = (hourlyDate: string) => {
  const dayDate = DateTime.fromFormat(
    hourlyDate,
    HOURLY_DATE_FORMAT
  ).toISODate();

  if (dayDate === null) {
    throw new Error("Incorrect date format!");
  }

  return dayDate;
};
