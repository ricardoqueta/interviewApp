export interface Product {
  id: number;
  title: string;
  name: string;
  type: "fruit" | "vegetable" ;
  countryOfOrigin: string;
  nutritionalValues: {
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  sustainability: {
    fairTrade: boolean;
    organic: boolean;
    local: boolean;
    carbonFootprint: number;
  };
  notices: {
    allergens: string[];
    warnings: string[];
    certifications: string[];
  };
  unit: "kg" | "head"| "unit" | "piece";
  priceByUnit: number;
  salePriceByUnit: number | null;
  rating : number;
}
