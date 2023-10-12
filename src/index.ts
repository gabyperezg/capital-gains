import readline from "readline";

export interface Operation {
  operation: "buy" | "sell";
  "unit-cost": number;
  quantity: number;
}

export interface TaxResult {
  tax: number;
}

export function calculateTaxes(operations: Operation[]): TaxResult[] {}
