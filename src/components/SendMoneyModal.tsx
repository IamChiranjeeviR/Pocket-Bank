import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { getAccounts } from "../utils/storage";
import { useAppContext } from "../hooks/useAppContext";

const SendMoneyModal = () => {
  const {
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
  } = useAppContext();

  const accounts = getAccounts();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      !loading
    ) {
      setIsSendMoney(false);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div ref={modalRef} className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="font-semibold text-lg mb-4">Send Money</h2>

        <select
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          disabled={loading}
          className="w-full border px-3 py-2 mb-2"
        >
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.bankName}
            </option>
          ))}
        </select>

        <p className="text-sm text-gray-500 mb-2">
          Available balance: ₹{balance.toLocaleString("en-IN")}
        </p>

        {hasInsufficientFunds && (
          <p className="text-sm text-red-600 mb-2">Insufficient funds</p>
        )}

        <input
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Receiver name"
          className="w-full border px-3 py-2 mb-2"
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount"
          className="w-full border px-3 py-2 mb-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
        >
          <option value="withdrawal">Withdrawal</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
        </select>

        <div className="flex gap-3">
          <button
            onClick={() => setIsSendMoney(false)}
            disabled={loading}
            className="w-full border py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!isValid || loading}
            className={`w-full py-2 rounded-md text-white flex items-center justify-center gap-2
    ${
      loading || !isValid
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-600 hover:bg-red-700"
    }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;
