export type DataScope = "hourly" | "daily" | "weekly" | "monthly" | "yearly";

export type PowerBankRecord = {
  date: string;
  usage: number;
  production: number;
  balance: number;
  lastUpdated: string;
};
