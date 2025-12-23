import MyAccounts from "../components/MyAccounts";
import { useAppContext } from "../hooks/useAppContext";
import useDateTime from "../hooks/useDateTime";
import { myAccountsData } from "../utils/DummyData";
import { maskAccountNumber } from "../utils/Masking";
import { ArrowUpRight, ArrowDownRight, UserRound } from "lucide-react";
import { getChartData, getIncomeExpenseAndBalance } from "../utils/helper";
import TransactionBarChart from "../components/TransactionBarChart";
import { getTransactions } from "../utils/storage";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const { time, date } = useDateTime();
  const { selectedAccountId } = useAppContext();
  const transactions = getTransactions();
  const latestTransactions = selectedAccountId
    ? transactions.filter((txn) => txn.accountId === selectedAccountId)
    : transactions;

  const { income, expense, balance } =
    getIncomeExpenseAndBalance(selectedAccountId);

  const chartData = getChartData(selectedAccountId);

  return (
    <div className="px-3 md:px-10 h-full overflow-y-auto overflow-x-hidden flex flex-col">
      <div className="bg-white px-5 md:px-10 py-5 rounded-b-xl shrink-0">
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row font-semibold">
          <div className="flex gap-1 sm:gap-3 flex-col sm:flex-row">
            <p className="text-[#2549BD]">Dashboard</p>
            <span className="hidden sm:block">|</span>
            <p>Hello Chiru Welcome back!</p>
          </div>

          <div className="text-gray-500 text-sm">
            {time}, {date}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-700 overflow-hidden my-5">
            <MyAccounts />
          </div>

          <div className="w-full lg:px-10 lg:border-l-2 border-gray-200">
            <p className="font-semibold text-lg">Balance</p>

            {!selectedAccountId && (
              <p className="text-sm text-gray-400 mt-5">
                Select an account to view balance
              </p>
            )}

            {myAccountsData
              .filter((acc) => acc.id === selectedAccountId)
              .map((acc) => (
                <div key={acc.id} className="mt-7">
                  <h2 className="text-4xl text-[#2549BD]">
                    ₹{balance.toLocaleString()}
                  </h2>
                  <p className="text-[#2549BD] mt-3">
                    {maskAccountNumber(acc.accountNumber)}
                  </p>
                  <p className="text-[#2549BD]">{acc.bankName}</p>

                  <div className="flex flex-col sm:flex-row sm:gap-20 mt-5">
                    <div>
                      <span className="text-gray-400 text-xs">Income</span>
                      <div className="flex items-center gap-2 mt-2">
                        <ArrowUpRight className="text-green-500 w-4 h-4" />
                        <p className="font-semibold">
                          +₹{income.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400 text-xs">Expense</span>
                      <div className="flex items-center gap-2 mt-2">
                        <ArrowDownRight className="text-red-500 w-4 h-4" />
                        <p className="font-semibold">
                          -₹{expense.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 sm:px-5 lg:overflow-hidden">
        <div className="p-5 flex flex-col flex-1 min-h-75">
          <h2 className="font-medium shrink-0">Spending Overview</h2>
          <div className="flex-1 mt-3">
            <TransactionBarChart data={chartData} />
          </div>
        </div>

        <div className="p-5 flex flex-col w-full lg:w-100 min-h-75">
          <span className="font-semibold px-1">Latest transaction</span>

          <div className="flex-1 overflow-visible lg:overflow-y-auto mt-3">
            {latestTransactions
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, 5)
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-gray-300"
                >
                  <div className="flex gap-3 items-center">
                    <div className="p-2 rounded-full border border-gray-300 bg-white">
                      <UserRound className="text-gray-700" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-800">
                        {transaction.description}
                      </span>
                      <span className="text-xs font-semibold text-[#2549BD]">
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
                    <span className="text-xs font-semibold text-gray-400">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center px-3 justify-between my-5 shrink-0">
            <button
              onClick={() => navigate("/transactions")}
              className="bg-linear-to-tr from-[#1f2f63] to-[#3167fc] text-white px-4 py-2 text-xs rounded-sm"
            >
              New transaction
            </button>

            <button className="bg-white border border-gray-500 px-4 py-2 text-xs rounded-sm">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
