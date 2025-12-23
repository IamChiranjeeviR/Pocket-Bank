import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { getAccounts } from "../utils/storage";
import { getAccountBalance, addTransaction } from "../utils/helper";
import { toast } from "react-toastify";

export type AppContextType = {
  isSendMoney: boolean;
  setIsSendMoney: (v: boolean) => void;

  selectedAccountId: string;
  setSelectedAccountId: (id: string) => void;

  receiver: string;
  setReceiver: (v: string) => void;

  amount: string;
  setAmount: (v: string) => void;

  category: string;
  setCategory: (v: string) => void;

  loading: boolean;

  balance: number;
  hasInsufficientFunds: boolean;
  isValid: boolean;

  handleConfirm: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const accounts = getAccounts();

  const [isSendMoney, setIsSendMoney] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.primary)?.id || ""
  );
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("withdrawal");
  const [loading, setLoading] = useState(false);

  const balance = selectedAccountId ? getAccountBalance(selectedAccountId) : 0;

  const numericAmount = Number(amount);
  const hasInsufficientFunds = numericAmount > balance;

  const isValid = Boolean(
    selectedAccountId &&
      receiver.trim() &&
      numericAmount > 0 &&
      !hasInsufficientFunds &&
      !loading
  );

  const handleConfirm = () => {
    if (!isValid) return;

    setLoading(true);

    addTransaction({
      id: crypto.randomUUID(),
      accountId: selectedAccountId,
      date: new Date().toISOString().split("T")[0],
      description: `Sent to ${receiver}`,
      amount: numericAmount,
      type: "debit",
      category: category as any,
    });

    setTimeout(() => {
      setLoading(false);
      setIsSendMoney(false);
      setReceiver("");
      setAmount("");
      setCategory("withdrawal");
      toast.success("Money sent successfully 💸");
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        isSendMoney,
        setIsSendMoney,
        selectedAccountId,
        setSelectedAccountId,
        receiver,
        setReceiver,
        amount,
        setAmount,
        category,
        setCategory,
        loading,
        balance,
        hasInsufficientFunds,
        isValid,
        handleConfirm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
