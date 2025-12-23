import { useState, useMemo, useEffect } from "react";
import { ArrowUpRight, UserRound } from "lucide-react";
import { getAccounts, getTransactions } from "../utils/storage";
import { getAccountBalance } from "../utils/helper";
import SendMoneyModal from "../components/SendMoneyModal";
import { useAppContext } from "../hooks/useAppContext";

const ITEMS_PER_PAGE = 10;

const Transactions = () => {
  const { isSendMoney, setIsSendMoney } = useAppContext();

  const accounts = getAccounts();
  const allTransactions = getTransactions();

  const primaryAccount = accounts.find((acc) => acc.primary);
  const primaryBalance = primaryAccount
    ? getAccountBalance(primaryAccount.id)
    : 0;

  const [dateFilter, setDateFilter] = useState<"all" | "today" | "yesterday">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">(
    "all"
  );

  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter, typeFilter]);

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  // FILTER + SORT
  const filteredTransactions = useMemo(() => {
    return allTransactions
      .filter((txn) => {
        if (typeFilter !== "all" && txn.type !== typeFilter) return false;

        const txnDate = new Date(txn.date);
        const today = new Date();

        if (dateFilter === "today") {
          return isSameDay(txnDate, today);
        }

        if (dateFilter === "yesterday") {
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          return isSameDay(txnDate, yesterday);
        }

        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allTransactions, dateFilter, typeFilter]);

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="px-5 h-full overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white p-5 flex justify-between items-center">
        <button
          onClick={() => setIsSendMoney(true)}
          className="border p-4 rounded-xl flex items-center gap-2"
        >
          Send Money <ArrowUpRight />
        </button>

        {primaryAccount && (
          <div className="text-right">
            <p className="text-gray-500">Primary Account</p>
            <p className="text-2xl font-semibold text-[#2549BD]">
              ₹{primaryBalance.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-400">{primaryAccount.bankName}</p>
          </div>
        )}
      </div>

      <h1 className="text-3xl mt-10 font-semibold">All Transactions</h1>

      {/* FILTERS */}
      <div className="flex gap-3 mt-5">
        <select
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value as "all" | "today" | "yesterday")
          }
          className="border px-3 py-2 text-sm rounded-sm"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as "all" | "credit" | "debit")
          }
          className="border px-3 py-2 text-sm rounded-sm"
        >
          <option value="all">All</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </div>

      {/* TRANSACTION LIST */}
      <div className="mt-5">
        {paginatedTransactions.length === 0 && (
          <p className="text-sm text-gray-400 text-center mt-10">
            No transactions found
          </p>
        )}

        {paginatedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex bg-white items-center justify-between p-3  rounded-md  mb-3 "
          >
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-full border bg-white">
                <UserRound />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  {transaction.description}
                </span>
                <span className="text-xs text-[#2549BD]">
                  {transaction.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span
                className={`font-semibold text-sm ${
                  transaction.type === "credit"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"} ₹
                {transaction.amount}
              </span>
              <span className="text-xs text-gray-400">{transaction.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION UI */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 my-6">
          {/* PREVIOUS */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="mr-4 disabled:opacity-40"
          >
            ‹
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-md text-sm transition-all ${
                    page === currentPage
                      ? "bg-indigo-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* NEXT */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="ml-4 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      )}

      {isSendMoney && <SendMoneyModal />}
    </div>
  );
};

export default Transactions;
