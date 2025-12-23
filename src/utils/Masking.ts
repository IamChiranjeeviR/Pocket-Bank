export const maskAccountNumber = (accountNumber: string) => {
  const last4 = accountNumber.slice(-4);
  return `**** **** **** ${last4}`;
};
