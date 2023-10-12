# Capital Gains Calculator - Command Line Application

This is a TypeScript Node.js command-line application (CLI) that calculates how much tax you should pay based on the profit or losses of a stock market investment.

## Technical and Architectural Decisions

### Project Structure

The project has a simple file structure with a `src` folder for the source code and a `test` folder for testing. The key files and their purposes are:

- `src/index.ts`: The main entry point of the CLI application that uses the `readline` module to interact with the user.
- `src/calculateTax.ts`: Contains the logic for calculating tax based on the stock market investment and diferent conditions.

### Dependencies

This project solely relies on TypeScript for type checking and Jest for testing.

Sure, if you want to assume that users already have the project code, you can remove the cloning step. Here are the updated instructions:

## Instructions to Compile and Run the Project

To compile and run the project using Node.js and NPM:

1. **Navigate to the Project Directory:**

   ```bash
   cd /path/to/your/project/directory
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Build the Project:**

   ```bash
   npm run build
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```

Additionally, you can run tests to ensure the functionality is working correctly:

4. **Run the Application:**
   ```bash
   npm test
   ```

## Additional Notes

- The `calculateTax` function in `src/calculateTax.ts` is the primary function responsible for the tax calculation so this was the function that needed test implementation but there can be additional tests added for the independent functions.
