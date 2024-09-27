import { StateCreator } from "zustand";

import type { PowerBankMainStore } from "../store";

export type DataStateType = {
  dataState: {
    startDate?: string;
    stateRecords: (DataStateRecord & {
      year: string;
      monthRecords: (DataStateRecord & {
        month: string;
        dayRecords: (DataStateRecord & {
          day: string;
        })[];
      })[];
      weekRecords: (DataStateRecord & {
        week: string;
      })[];
    })[];
  };
};

type DataStateRecord = {
  dataState: string;
  dataItemsCompletion: string;
};

export const dataStateSlice: StateCreator<
  PowerBankMainStore,
  [],
  [],
  DataStateType
> = (set, get) => ({
  dataState: { stateRecords: [] },
});
