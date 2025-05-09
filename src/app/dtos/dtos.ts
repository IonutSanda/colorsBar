// export type ServiceTitle  = {
//   JUICE_BAR: "Juice Bar",
//   COCKTAIL_BAR: "Cocktail Bar",
//   COFFEE_BAR: "Coffee Bar",
//   ICE_DELIVERY: "Ice Delivery",
//   LOGISTICS: "Logistics",
//   DEFAULT: "Default"
// }

export interface Service {
  title: string;
  description: string;
  image: string;
}

export interface ContactInfo {
  phoneNr: string;
  email: string;
  address: string;
}
