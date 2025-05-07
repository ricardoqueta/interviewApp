export interface CartItem {
  id: number;
  name: string;
  type: "fruit" | "vegetable" ;
  priceByUnit: number;
  quantity: number;
  unit: "kg" | "head"| "unit" | "piece";
  sale: boolean;
}
