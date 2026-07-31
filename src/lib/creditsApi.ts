import { api } from "./api";

export type CreditBalance = {
  balance: number;
  tier: string;
  monthlyAllowance: number;
};

/** Powers any proactive "you have N credits" / pay-confirmation UI — e.g.
 *  the Academy enroll gate — before a credit-charging action is attempted. */
export async function fetchCreditBalance(): Promise<CreditBalance> {
  const { data } = await api.get(`/credits/balance`);
  return data?.data ?? data;
}
