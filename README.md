# Setup, Installation & Credentials for login

1. **Clone the Repository:**

```
    git clone <repo-url>
    cd game-portal
```

2. **Install Dependencies (with workspaces support)::**

```
    npm install
```

3. **Initialize Husky:**

```
    npx husky install
    npx husky add .husky/pre-commit "npm run lint"
    npx husky add .husky/pre-push "npm run test"
```

4. **Run the Development Server:**

   - Run All BRANDS
     - For Casino-A: http://localhost:3055
     - For Casino-B: http://localhost:3056

   ```
       npm run dev
   ```

   - For Specific Brand

```
   npm run dev --workspace=apps/casino-a

```

5. **Build the Application:**

```
    npm run build --workspace=apps/casino-a
```

6. **Run Tests:**

```
    npm run test --workspace=packages/shared

```

7. **Lint the Code::**

```
    npm run lint

```

8. **Credentials for login:**

```
[
  {
    "username": "jack_sparrow",
    "password": "TestUser1",
    "market": "en",
    "firstName": "jack",
    "lastName": "sparrow"
  },
  {
    "username": "captain_america",
    "password": "TestUser2",
    "market": "ca",
    "firstName": "captain",
    "lastName": "america"
  }
]


```

# Casino Portal Game App

Welcome to the Game Portal App project! This repository contains a scalable, modular game portal built with Next.js and React. The project is organized as a monorepo using Turborepo and is designed for flexibility, high performance, and maintainability.

---

## Table of Contents

- [Overview](#overview)
- [Architecture & File Organization](#architecture--file-organization)
- [Tools & Technologies](#tools--technologies)
- [Features & Functionality](#features--functionality)
- [Styling & Multi-Theme Support](#styling--multi-theme-support)
- [Future Improvements](#future-improvements)
- [Conclusion](#conclusion)

---

## Overview

The main objective of this assignment was to build a scalable, flexible game portal application with multiple casino layouts tailored to different markets (e.g., `/en` and `/ca`). The application supports:

- **User authentication** using a JSON-based data source.
- **Market-specific routing** enforced with middleware.
- **Dynamic and responsive layouts** (with different numbers of columns for mobile, tablet, and desktop).
- **State management** with Redux Toolkit and data fetching with React Query (including infinite scroll).
- **Optional features** such as a modal queue, IndexedDB caching, and WebSocket integration for real-time updates.
- **Strong type safety** with TypeScript, code quality enforced with ESLint/Prettier, and streamlined task orchestration with Turborepo.
- **Multi-theme support** via browser CSS variables, enabling flexible design for multiple casino brands.

---

## Architecture & File Organization

The project is organized as a monorepo with multiple workspaces for better separation of concerns:

```bash
game-portal
├── turbo.json
├── package.json
├── README.md
├── .husky/
│   ├── pre-commit
│   └── pre-push
├── apps
│   ├── casino-a
│   │   ├── app
│   │   ├── pages
│   │   ├── package.json
│   │   └── README.md
│   ├── casino-b
│   │   ├── app
│   │   ├── pages
│   │   ├── package.json
│   │   └── README.md
├── packages
│   ├── constants
│   │   ├── brands
│   │   │   ├── casino-a
│   │   │   │   └── content.ts
│   │   │   ├── casino-b
│   │   │   │  └── content.ts
│   │   │   ├── config.ts           // Common configs USE_QUERY_DB, IMAGES_PATTERN, PAGE_SIZE Entry API_ENDPOINTS & WEB_SOCKET_CONFIG
│   │   │   └── index.ts            // Contains FEATURE_FLAGS, MARKETS, CASINO_CONTENT Entry point & BRANDS
│   │   ├── games.json
│   │   ├── users.json              // A folder containing a JSON file with sample user credentials for authentication.
│   │   └── package.json
│   ├── jest-config
│   ├── shared                     // Shared across all the BRANDS
│   │   ├── __tests__
│   │   ├── components
│   │   ├── helpers
│   │   ├── hooks
│   │   ├── modules
│   │   ├── redux
│   │   ├── themes                 // Contains BRANDS css variables for design system
│   │   │   ├── casino-a
│   │   │   ├── casino-b
│   │   │   └── common            // Contains FEATURE_FLAGS, MARKETS, CASINO_CONTENT Entry point & BRANDS
│   │   └── package.json
│   ├── types
│   │   ├── package.json          // Shared TypeScript type definitions (e.g., interfaces for Game and User objects) to ensure consistency.
│   │   └── index.ts
└── └──  typescript-config
```

This structure makes the code easy to maintain and scale.

---

## Features & Functionality

- **Multi-Market Support:**  
  The app supports two markets (`/en` and `/ca`) with dynamic routing. Middleware ensures that users remain in their designated market after login.

- **User Authentication:**  
  Credentials are stored in a JSON file. A simple login flow verifies credentials and sets the authenticated user's market and identity using Redux.

- **Responsive Layout:**  
  A responsive grid displays game thumbnails. The grid adapts dynamically:

  - **Mobile:** 1 column
  - **Tablet:** 3 - 4 columns
  - **Desktop:** 5 columns  
    Virtualization via react-window boosts performance.

- **Infinite Scroll:**  
  The live casino lobby page uses React Query’s infinite query feature to load additional games on scroll.

- **Multi-Theme Support:**  
  The app supports different themes (e.g., CasinoA and CasinoB) via CSS variables. Themes can be switched by changing the import path. Also we using attribute `[data-theme="casino-a"]` on the `<html>` element for changing styles.

- **Pages:**

  - /market → Greets you with a customized welcome message based on your region.
  - /market/login → Allows you to sign in using simple credentials stored in a file. (not accessible when logged in)
  - /market/casino → Shows a list of games you can play using `FixedSizeGrid`, `memo`, `dynamic lazy load`, `useQuery` & `idb`
  - /market/live-casino → Lobby page with a list of games using infinity scrolling using `FixedSizeGrid`, `memo`, `dynamic lazy load`, `useInfiniteQuery` & `idb`
  - /market/my-profile → Profile settings (users can customize their name and surname) (not accessible when logged out)
  - /market/casino/{slug} → Show simple game card

- **Redux Toolkit (RTK):**  
  Manages our app's global state (like user login, brand data, modal notification and market selection) in a simple, organized way.

- **TanStack Query:**  
  Efficiently fetches and caches data from our mocked game API, and supports infinite scrolling for a smooth experience.

- **Testing:**  
  We ensure reliability with unit tests (e.g., for our modal queue) and end-to-end tests that simulate real user interactions.

- **Mocked API:**  
  Simulates game & user data during development, so we can build and test the app without needing a live backend.

- **Modal Queue:**  
  Displays notifications one at a time in an organized queue, ensuring users see important messages without being overwhelmed.

- **IndexedDB:**  
  Caches game data directly in the browser, improving performance and reliability even with flaky network connections.

- **WebSockets:**  
  Provides real-time updates (such as live game statuses) so users see current information immediately without refreshing. (Need-more-work)

- **Feature Flags:**  
  Enables or disables features for different markets/brands, allowing us to tailor the user experience dynamically. like in casino home page display text based on the feature flag (just to see working)

- **Brand-Specific Configurations:**  
  Separates style and layout settings for different casino brands, making it easy to switch the look and feel without large code changes.

- **Constants Package:**  
  Centralizes global settings like API endpoints, dynamic content (only modal support for now) and feature flags, so all parts of the app reference the same values.

- **Types Package:**  
  Contains shared TypeScript definitions that enforce consistency and reduce errors across the entire project.

- **Code Style, Strong Typing, & File Organization:**  
  Using ESLint, Prettier, and TypeScript, our code remains clean, consistent, and well-organized for easier maintenance and scalability.

- **Quality & Automation:**  
  ESLint and Prettier maintain code quality. Husky runs Git hooks (pre-commit and pre-push) to enforce linting and tests. Turborepo orchestrates tasks across the monorepo.

---

## Tools & Technologies

- **Next.js & React:**  
  The foundation of the app, leveraging server-side rendering (SSR) and file-system routing.
- **Redux Toolkit:**  
  For predictable state management.
- **React Query (TanStack Query):**  
  To efficiently fetch, cache, and manage data with infinite scrolling.
- **react-window:**  
  For efficient rendering of large lists via virtualization.
- **CSS Modules & Global CSS:**  
  Provides component-scoped styling alongside a global CSS file for browser CSS variables.
- **ESLint & Prettier:**  
  Ensure a consistent and high-quality codebase.
- **Husky: (Need-more-work)**  
  Automates Git hooks for pre-commit and pre-push actions.
- **Turborepo:**  
  Manages task execution across the monorepo effectively.
- **TypeScript:**  
  Adds strong typing for improved reliability and maintainability.
- **Material UI:**  
  Provides wide range of components (such as buttons, forms, layouts, dialogs, and more) that are ready to use.

---

## Styling & Multi-Theme Support

We use Next.js-supported CSS Modules with a global CSS file (`themes`) to manage browser CSS variables. This allows:

- **Component-Level Styling:**  
  Using CSS Modules for encapsulated styles.

- **Material UI Theming:**  
   A custom hook (e.g., useTheme) can later be used to switch themes dynamically. For example:

```tsx
export const casinoATheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: getCssVariable('--primary-color', '#872db6'),
    },
    secondary: {
      main: getCssVariable('--secondary-color', '#d48ed4'),
    },
    background: {
      default: getCssVariable('--background-color', '#ffffff'),
    },
    error: {
      main: getCssVariable('--error-color', '#e00'),
    },
  },
  typography: {
    fontFamily: getCssVariable(
      '--font-family',
      "'Helvetica Neue', Helvetica, Arial, sans-serif",
    ),
    fontSize: Number(getCssVariable('--font-size', '16')),
  },
});
```

- **Dynamic Theming:**  
   Global CSS variables are defined to support multiple themes. For example:

  ```css
  /* Casino A theme */
  :root {
    --primary: #872db6;
    --primary-interaction-low: #fff0e7;
    --primary-interaction-medium: #d48ed4;
    --on-primary: #ffffff;
    --secondary: #d48ed4;
    --secondary-interaction-low: #ecf7ec;
    --secondary-interaction-medium: #d48ed4;
  }

  /* Casino B theme */
  :root {
    --primary: #298190;
    --primary-interaction-low: #4edab9;
    --primary-interaction-medium: #298190;
    --on-primary: #ffffff;
    --secondary: #298190;
    --secondary-interaction-low: #ecf7ec;
    --secondary-interaction-medium: #298190;
  }

  /* Define casino b variables in Modal Queue*/
  :root[data-theme='casino-b'] {
    .container {
      color: #68bb2c;
    }
  }
  ```

---

## Future Improvements

- **Dynamic Theme Switching:**  
   Use a ThemeContext to allow users to change themes (e.g., CasinoA, CasinoB, Dark) in real time.

- **Optimized Data Fetching:**  
  Integrate SWR or further optimize React Query caching.

- **Enhanced Real-Time Features:**  
  Expand WebSocket functionality for live game updates and interactive features.

- **PWA Support:**  
  Add offline capabilities and push notifications for a native-like experience.

- **Additional Update Needed:**
  - Increase test coverage with comprehensive unit, integration, and end-to-end tests.
  - Responsive UI: Mobile first approach
  - Caching store - to increase performance
  - Organize folder structure - to follow atomic design, separate business logic, central api service, error handling & better config management
  - Increase support for dynamic content in all pages
  - Add story book
  - Manage package dependencies
  - Manage brand specific cookies
  - Fix docker

## Conclusion

This project demonstrates a fully-featured casino game portal built using Next.js, React, and modern tools like Redux Toolkit, React Query, react-window, ESLint, Prettier, Husky, and Turborepo. The modular codebase supports dynamic theming, multi-market routing, infinite scrolling, and real-time updates—all while ensuring high quality and maintainability.
