export interface Account {
  id: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  primary: boolean;
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  category:
    | "salary"
    | "freelance"
    | "food"
    | "shopping"
    | "bills"
    | "fuel"
    | "entertainment"
    | "health"
    | "cashback"
    | "interest"
    | "withdrawal"
    | "bonus";
}

export const myAccountsData: Account[] = [
  {
    id: "acc-1",
    bankName: "Union Bank of India",
    accountNumber: "123456789012345",
    balance: 10000,
    primary: true,
  },
  {
    id: "acc-2",
    bankName: "HDFC Bank",
    accountNumber: "12345678901234",
    balance: 25000,
    primary: false,
  },
  {
    id: "acc-3",
    bankName: "State Bank of India",
    accountNumber: "12345678901234",
    balance: 0,
    primary: false,
  },
  {
    id: "acc-4",
    bankName: "Canara Bank",
    accountNumber: "12345678901234",
    balance: 0,
    primary: false,
  },
];

export const transactionsData: Transaction[] = [
  {
    id: "txn-1",
    accountId: "acc-1",
    date: "2025-01-01",
    description: "Salary Credit",
    amount: 30000,
    type: "credit",
    category: "salary",
  },
  {
    id: "txn-2",
    accountId: "acc-1",
    date: "2025-01-02",
    description: "Interest Credit",
    amount: 2000,
    type: "credit",
    category: "interest",
  },
  {
    id: "txn-3",
    accountId: "acc-1",
    date: "2025-01-03",
    description: "Grocery Store",
    amount: 1200,
    type: "debit",
    category: "food",
  },
  {
    id: "txn-4",
    accountId: "acc-1",
    date: "2025-01-04",
    description: "Mobile Recharge",
    amount: 399,
    type: "debit",
    category: "bills",
  },
  {
    id: "txn-5",
    accountId: "acc-1",
    date: "2025-01-05",
    description: "Performance Bonus",
    amount: 15000,
    type: "credit",
    category: "bonus",
  },
  {
    id: "txn-6",
    accountId: "acc-1",
    date: "2025-01-06",
    description: "Fuel",
    amount: 1800,
    type: "debit",
    category: "fuel",
  },
  {
    id: "txn-7",
    accountId: "acc-1",
    date: "2025-01-07",
    description: "Cashback",
    amount: 1200,
    type: "credit",
    category: "cashback",
  },
  {
    id: "txn-8",
    accountId: "acc-1",
    date: "2025-01-08",
    description: "Restaurant",
    amount: 950,
    type: "debit",
    category: "food",
  },
  {
    id: "txn-9",
    accountId: "acc-1",
    date: "2025-01-09",
    description: "Freelance Side Income",
    amount: 8000,
    type: "credit",
    category: "freelance",
  },
  {
    id: "txn-10",
    accountId: "acc-1",
    date: "2025-01-10",
    description: "Electricity Bill",
    amount: 2100,
    type: "debit",
    category: "bills",
  },
  {
    id: "txn-11",
    accountId: "acc-2",
    date: "2025-01-01",
    description: "Client Project Payment",
    amount: 40000,
    type: "credit",
    category: "freelance",
  },
  {
    id: "txn-12",
    accountId: "acc-2",
    date: "2025-01-02",
    description: "Zomato",
    amount: 650,
    type: "debit",
    category: "food",
  },
  {
    id: "txn-13",
    accountId: "acc-2",
    date: "2025-01-03",
    description: "Netflix Subscription",
    amount: 499,
    type: "debit",
    category: "entertainment",
  },
  {
    id: "txn-14",
    accountId: "acc-2",
    date: "2025-01-04",
    description: "Fuel",
    amount: 1700,
    type: "debit",
    category: "fuel",
  },
  {
    id: "txn-15",
    accountId: "acc-2",
    date: "2025-01-05",
    description: "Freelance Bonus",
    amount: 12000,
    type: "credit",
    category: "bonus",
  },
  {
    id: "txn-16",
    accountId: "acc-2",
    date: "2025-01-06",
    description: "Dining",
    amount: 2200,
    type: "debit",
    category: "food",
  },
  {
    id: "txn-17",
    accountId: "acc-2",
    date: "2025-01-07",
    description: "Consulting Payment",
    amount: 18000,
    type: "credit",
    category: "freelance",
  },
  {
    id: "txn-18",
    accountId: "acc-2",
    date: "2025-01-08",
    description: "Interest Credit",
    amount: 3000,
    type: "credit",
    category: "interest",
  },
  {
    id: "txn-19",
    accountId: "acc-2",
    date: "2025-01-09",
    description: "Shopping",
    amount: 4500,
    type: "debit",
    category: "shopping",
  },
  {
    id: "txn-20",
    accountId: "acc-2",
    date: "2025-01-10",
    description: "Referral Bonus",
    amount: 5000,
    type: "credit",
    category: "bonus",
  },
];
