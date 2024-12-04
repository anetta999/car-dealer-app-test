# car-dealer-app-test

This is a Next.js application that allows users to filter vehicles based on their make and model year. It retrieves vehicle data from the National Highway Traffic Safety Administration (NHTSA) API.

## Features

- Fetches and displays a list of vehicle makes.
- Allows users to filter vehicles by make and model year.
- Displays a list of filtered vehicles based on the selected make and model year.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/car-dealer-app.git
   ```

2. Navigate to the project directory:

cd car-dealer-app

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to http://localhost:3000 to see the application in action.

## File Structure

### pages/

index.tsx: The homepage where users can select a vehicle make and model year.
result/[makeId]/[makeYear].tsx: Displays the filtered vehicles based on the selected make and year.

### components/

FilterForm.tsx: A form for selecting vehicle make and model year.
data/

modelYears.ts: A file containing the list of model years available for selection.

### styles/

Global styles for the application.

## Technologies Used

Next.js: React framework for building server-side rendered and static websites.
TypeScript: A superset of JavaScript that adds static types.
React Hook Form: A library for managing forms in React with minimal re-renders.
NHTSA Vehicle API: Used to fetch vehicle makes and models for filtering.
