# Firebase Studio - Series Sphere

This is a Next.js application called "Series Sphere" for tracking TV shows, getting recommendations, and joining community clubs. It uses Genkit for AI-powered features.

## Getting Started

To get this application up and running on your local machine, follow these steps.

### Prerequisites

*   **Node.js**: Make sure you have Node.js installed (version 18.x or later recommended). You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** or **yarn**: These package managers come with Node.js. Choose one to manage your dependencies.

### 1. Setup Project Files

Ensure you have all the project files in a directory on your local machine. If you've been working with an AI assistant to generate these files, make sure all provided files are correctly placed in their respective paths (e.g., `src/app/page.tsx`, `package.json`, etc.).

### 2. Install Dependencies

Navigate to the root directory of the project in your terminal and run one of the following commands to install the necessary packages:

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Set Up Environment Variables

This project uses Genkit with Google AI. You'll need to configure an API key for the AI functionalities to work.

1.  Create a new file named `.env` in the root of your project.
2.  Add your Google AI API key to this file:

    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
    ```

    Replace `YOUR_GOOGLE_API_KEY` with your actual API key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

    *Note: The existing `.env` file in the project might be empty. You need to add this line.*

### 4. Run the Development Servers

This application requires two separate development servers to be running concurrently:
*   The **Genkit server** for AI flows.
*   The **Next.js server** for the web application itself.

You'll need to open two separate terminal windows or tabs for this.

**Terminal 1: Start the Genkit Server**

In your first terminal, navigate to the project root and run:
```bash
npm run genkit:watch
```
or
```bash
yarn genkit:watch
```
This command starts the Genkit development server in watch mode, meaning it will automatically reload if you make changes to your AI flows (files in `src/ai/flows/`).
You should see output indicating that Genkit has started. The Genkit Developer UI will typically be available at `http://localhost:4000/`.

**Terminal 2: Start the Next.js Server**

In your second terminal, navigate to the project root and run:
```bash
npm run dev
```
or
```bash
yarn dev
```
This command starts the Next.js development server. By default (as configured in `package.json`), it will run on port `9002`.

### 5. Access the Application

Once both servers are running:

*   Open your web browser and go to `http://localhost:9002` to see the Series Sphere application.
*   You can also explore your Genkit flows and their traces in the Genkit Developer UI, typically at `http://localhost:4000/`.

### Project Structure Highlights

*   **Next.js Pages & Components**: Located in `src/app/` and `src/components/`. The main page is `src/app/page.tsx`.
*   **AI Flows (Genkit)**: Located in `src/ai/flows/`. These define the AI-powered logic.
*   **Global Styles**: `src/app/globals.css`.
*   **Static Assets**: Public assets can be placed in the `public/` directory.

### Building for Production

When you're ready to build the application for production, you can run:
```bash
npm run build
```
And then to start the production server:
```bash
npm run start
```
Ensure Genkit flows are also appropriately deployed or accessible by your production environment. Refer to Genkit documentation for deployment strategies.

Enjoy using Series Sphere!
