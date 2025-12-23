import { myAccountsData, transactionsData } from "./DummyData";
import {
  getAccounts,
  saveAccounts,
  getTransactions,
  saveTransactions,
} from "./storage";

export const initStorage = () => {
  if (getAccounts().length === 0) {
    saveAccounts(myAccountsData);
  }

  if (getTransactions().length === 0) {
    saveTransactions(transactionsData);
  }
};
