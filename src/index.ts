import readline from "readline";
import { Operation, TaxResult, calculateTaxes } from "./calculateTax.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputBuffer = "";
const inputArrays: Operation[][] = [];
let taxResults: TaxResult[] = [];

function processInput() {
  try {
    const parsedInput = JSON.parse(inputBuffer);
    console.log("-------------------");
    console.log("Your input:", parsedInput);
    inputArrays.push(parsedInput);

    if (parsedInput.length > 0) {
      for (const operations of inputArrays) {
        const results = calculateTaxes(operations);
        taxResults = results;
      }

      console.log("-------------------");
      console.log("Your tax result:");
      console.log(taxResults);
      console.log("-------------------");

      rl.close();
    }
  } catch (error) {
    console.error("Error parsing input:", error.message);
    rl.close();
  }
  inputBuffer = "";
}

rl.on("line", (line) => {
  inputBuffer += line;
  processInput();
});

rl.on("close", () => {
  process.exit(0);
});
