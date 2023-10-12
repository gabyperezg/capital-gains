export interface Operation {
  operation: "buy" | "sell";
  "unit-cost": number;
  quantity: number;
}

export interface TaxResult {
  tax: number;
}

export function calculateTaxes(operations: Operation[]): TaxResult[] {
  let weightedAveragePrice = 0;
  let totalQuantity = 0;
  let loss = 0;
  const results: TaxResult[] = [];

  function calculateWeightedAveragePrice(operation: Operation) {
    weightedAveragePrice =
      (totalQuantity * weightedAveragePrice +
        operation.quantity * operation["unit-cost"]) /
      (totalQuantity + operation.quantity);
    totalQuantity += operation.quantity;
  }

  function calculateTax(operation: Operation) {
    const sellingValue = operation.quantity * operation["unit-cost"];
    const WAPValue = operation.quantity * weightedAveragePrice;
    const profit = sellingValue - WAPValue;

    if (profit < 0) {
      loss += profit;
      results.push({ tax: 0.0 });
    } else if (sellingValue <= 20000 || profit === 0) {
      results.push({ tax: 0.0 });
    } else {
      calculateProfitTax(profit);
    }
  }

  function calculateProfitTax(profit: number) {
    if (loss < 0) {
      const remainingProfit = profit + loss;
      loss = remainingProfit;
      if (remainingProfit < 0) {
        results.push({ tax: 0.0 });
      } else {
        const tax = remainingProfit * 0.2;
        results.push({ tax });
      }
    } else {
      const tax = profit * 0.2;
      results.push({ tax });
    }
  }

  for (const operation of operations) {
    if (operation.operation === "buy") {
      calculateWeightedAveragePrice(operation);
      results.push({ tax: 0 });
    } else if (operation.operation === "sell") {
      calculateTax(operation);
      totalQuantity -= operation.quantity;
    }
  }

  return results;
}
