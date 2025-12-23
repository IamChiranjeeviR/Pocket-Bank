import type { Transaction } from "./DummyData";
import { getTransactions, saveTransactions } from "./storage";

export const getChartData = (accountId: string | null) => {
  if (!accountId) return [];

  const transactions = getTransactions();
  const map = new Map<string, number>();

  transactions
    .filter((txn) => txn.accountId === accountId)
    .forEach((txn) => {
      const value = txn.type === "credit" ? txn.amount : -txn.amount;
      map.set(txn.date, (map.get(txn.date) || 0) + value);
    });

  return Array.from(map.entries()).map(([date, amount]) => ({
    date,
    amount,
  }));
};

export const getIncomeExpenseAndBalance = (accountId: string | null) => {
  let income = 0;
  let expense = 0;

  if (!accountId) {
    return { income, expense, balance: 0 };
  }

  const transactions = getTransactions();

  transactions
    .filter((txn) => txn.accountId === accountId)
    .forEach((txn) => {
      if (txn.type === "credit") {
        income += txn.amount;
      } else {
        expense += txn.amount;
      }
    });

  return {
    income,
    expense,
    balance: income - expense,
  };
};

export const getAccountBalance = (accountId: string) => {
  const transactions = getTransactions();
  let balance = 0;

  transactions
    .filter((txn) => txn.accountId === accountId)
    .forEach((txn) => {
      balance += txn.type === "credit" ? txn.amount : -txn.amount;
    });

  return balance;
};

export const addTransaction = (transaction: Transaction) => {
  const transactions = getTransactions();
  saveTransactions([transaction, ...transactions]);
};
