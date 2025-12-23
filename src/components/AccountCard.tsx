import { useState } from "react";
import type { Account } from "../utils/DummyData";
import { Eye, EyeOff } from "lucide-react";
import { useAppContext } from "../hooks/useAppContext";
import { maskAccountNumber } from "../utils/Masking";

type AccountCardProps = {
  account: Account;
  balance: number;
};

const AccountCard = ({ account, balance }: AccountCardProps) => {
  const [isMasked, setIsMasked] = useState(true);
  const { setSelectedAccountId } = useAppContext();

  return (
    <div
      className="cursor-pointer bg-linear-to-tr from-[#1f2f63] to-[#3167fc] text-white p-4 rounded-lg w-60 shadow-md shrink-0"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedAccountId(account.id);
      }}
    >
      <h3 className="font-bold mb-8">{account.bankName}</h3>

      <p className="text-2xl font-semibold">
        ₹{balance.toLocaleString("en-IN")}
      </p>

      <div className="mt-2 text-sm opacity-90 flex items-center justify-between">
        <p className="text-sm">
          {isMasked
            ? maskAccountNumber(account.accountNumber)
            : account.accountNumber}
        </p>
        <div
          className="cursor-pointer"
          onClick={() => setIsMasked((prev) => !prev)}
        >
          {isMasked ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
