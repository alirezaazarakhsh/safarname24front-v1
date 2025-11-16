// Creating the type of returned data from api (POST)
export interface POSTCreatePaymentLink {
  amount: number;
  gateway: string;
  payment_link: string;
}
