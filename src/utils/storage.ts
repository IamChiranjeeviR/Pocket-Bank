import type { Account, Transaction } from "./DummyData";

const ACCOUNTS_KEY = "accounts";
const TRANSACTIONS_KEY = "transactions";

export const saveAccounts = (accounts: Account[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const getAccounts = (): Account[] => {
  const data = localStorage.getItem(ACCOUNTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  return data ? JSON.parse(data) : [];
};
