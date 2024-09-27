import { StateCreator } from "zustand";

import type { PowerBankMainStore } from "../store";
import type { DataScope, PowerBankRecord } from "../type";
import { addRecord, updateRecord, generateFromBase } from "../utils";

export type DataSlice = {
  dataRecords: Record<DataScope, PowerBankRecord[]>;
  addNewRecord: (item: PowerBankRecord, targetScope: DataScope) => void;
  updateRecord: (item: PowerBankRecord, targetScope: DataScope) => void;
  updateFromHour: (targetScope: Exclude<DataScope, "hourly">) => void;
  clearStore: () => void;
};

const initialState: DataSlice["dataRecords"] = {
  daily: [],
  hourly: [],
  weekly: [],
  monthly: [],
  yearly: [],
};

export const dataSlice: StateCreator<PowerBankMainStore, [], [], DataSlice> = (
  set,
  get
) => ({
  dataRecords: initialState,
  addNewRecord: (item, targetScope) =>
    set((state) => {
      if (
        state.dataRecords[targetScope].some(
          (record) => record.date === item.date
        )
      ) {
        return state;
      }
      return addRecord(item, state, targetScope);
    }),
  updateRecord: (item, targetScope) =>
    set((state) => {
      const updatedRecordId = state.dataRecords[targetScope].find(
        (record) => record.date === item.date
      );
      if (updatedRecordId) {
        return updateRecord(item, state, targetScope);
      }
      return addRecord(item, state, targetScope);
    }),
  updateFromHour: (targetScope) =>
    set((state) => {
      const newArray = generateFromBase(get().dataRecords.hourly, targetScope);

      return {
        ...state,
        dataRecords: {
          ...state.dataRecords,
          [targetScope]: newArray,
        },
      };
    }),
  clearStore: () => set((state) => ({ ...state, dataRecords: initialState })),
});
