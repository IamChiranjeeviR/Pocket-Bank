import { myAccountsData } from "../utils/DummyData";
import { getAccountBalance } from "../utils/helper";
import AccountCard from "./AccountCard";

const MyAccounts = () => {
  return (
    <div className="flex flex-col gap-3 min-w-0">
      <h2 className="font-semibold text-sm sm:text-base">My Accounts</h2>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto min-w-0">
        {myAccountsData.map((acc) => {
          const balance = getAccountBalance(acc.id);

          return (
            <div key={acc.id} className="w-full sm:w-auto">
              <AccountCard account={acc} balance={balance} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAccounts;
