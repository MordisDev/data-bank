import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { dataSlice, type DataSlice } from "./slices/dataSlice";
import { dataStateSlice, type DataStateType } from "./slices/dataStateSlice";

export type PowerBankMainStore = DataSlice & DataStateType;

export const usePowerBankStore = create<PowerBankMainStore>()(
  persist(
    (...a) => ({
      ...dataSlice(...a),
      ...dataStateSlice(...a),
    }),
    {
      name: "power-bank",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dataRecords: state.dataRecords,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        dataRecords: (persistedState as RecordsType).dataRecords,
      }),
    }
  )
);

type RecordsType = { dataRecords: DataSlice["dataRecords"] };
