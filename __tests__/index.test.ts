import { Operation, TaxResult, calculateTaxes } from "../src/calculateTax.js";

interface TestCase {
  case: string;
  operations: Operation[] | Operation[][];
  expectedTaxResults: TaxResult[] | TaxResult[][];
}

const testCases: TestCase[] = [
  {
    case: "1",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 100 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
      { operation: "sell", "unit-cost": 15.0, quantity: 50 },
    ],
    expectedTaxResults: [{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }],
  },
  {
    case: "2",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
    ],
    expectedTaxResults: [{ tax: 0.0 }, { tax: 10000.0 }, { tax: 0.0 }],
  },
  {
    case: "1+2",
    operations: [
      [
        { operation: "buy", "unit-cost": 10.0, quantity: 100 },
        { operation: "sell", "unit-cost": 15.0, quantity: 50 },
        { operation: "sell", "unit-cost": 15.0, quantity: 50 },
      ],
      [
        { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
        { operation: "sell", "unit-cost": 20.0, quantity: 5000 },
        { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
      ],
    ],
    expectedTaxResults: [
      [{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }],
      [{ tax: 0.0 }, { tax: 10000.0 }, { tax: 0.0 }],
    ],
  },
  {
    case: "3",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 5.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 3000 },
    ],
    expectedTaxResults: [{ tax: 0.0 }, { tax: 0.0 }, { tax: 1000.0 }],
  },
  {
    case: "4",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
    ],
    expectedTaxResults: [{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }],
  },
  {
    case: "5",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 25.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 5000 },
    ],
    expectedTaxResults: [
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 10000.0 },
    ],
  },
  {
    case: "6",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
    ],
    expectedTaxResults: [
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 3000.0 },
    ],
  },
  {
    case: "7",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 2.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 20.0, quantity: 2000 },
      { operation: "sell", "unit-cost": 25.0, quantity: 1000 },
      { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 5000 },
      { operation: "sell", "unit-cost": 30.0, quantity: 4350 },
      { operation: "sell", "unit-cost": 30.0, quantity: 650 },
    ],
    expectedTaxResults: [
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 3000.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 3700.0 },
      { tax: 0.0 },
    ],
  },
  {
    case: "8",
    operations: [
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
      { operation: "buy", "unit-cost": 20.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 50.0, quantity: 10000 },
    ],
    expectedTaxResults: [
      { tax: 0.0 },
      { tax: 80000.0 },
      { tax: 0.0 },
      { tax: 60000.0 },
    ],
  },
  {
    case: "9",
    operations: [
      { operation: "buy", "unit-cost": 5000.0, quantity: 10 },
      { operation: "sell", "unit-cost": 4000.0, quantity: 5 },
      { operation: "buy", "unit-cost": 15000.0, quantity: 5 },
      { operation: "buy", "unit-cost": 4000.0, quantity: 2 },
      { operation: "buy", "unit-cost": 23000.0, quantity: 2 },
      { operation: "sell", "unit-cost": 20000.0, quantity: 1 },
      { operation: "sell", "unit-cost": 12000.0, quantity: 10 },
      { operation: "sell", "unit-cost": 15000.0, quantity: 3 },
    ],
    expectedTaxResults: [
      { tax: 0 },
      { tax: 0 },
      { tax: 0 },
      { tax: 0 },
      { tax: 0 },
      { tax: 0 },
      { tax: 1000 },
      { tax: 2400 },
    ],
  },
];

describe("calculateTax", () => {
  it.each(testCases)(
    "should calculate taxes correctly for case $case",
    ({ operations, expectedTaxResults }) => {
      if (Array.isArray(operations[0])) {
        const taxResults = (operations as Operation[][]).map((simulation) =>
          calculateTaxes(simulation)
        );
        expect(taxResults).toEqual(expectedTaxResults);
      } else {
        const taxResults = calculateTaxes(operations as Operation[]);

        expect(taxResults).toEqual(expectedTaxResults as TaxResult[]);
      }
    }
  );
});
