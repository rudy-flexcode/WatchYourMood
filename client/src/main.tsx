// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./Main.css";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

import ContactPage from "./pages/Contact";

import Base from "./pages/Base-globale";

import MyMood from "./pages/MyMood";

import Watchlist from "./pages/Watchlist";

// Importe le composant styleprovider de StyleContext
import { StyleProvider } from "./context/StyleContext";

// Import additional components for new routes

// Try creating these components in the "pages" folder

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/base",
    element: <Base />,
  },
  {
    path: "/watchlist",
    element: <Watchlist />,
  },
  {
    path: "/mood/:emotionID",
    element: <MyMood />,
    loader: async ({ params }) => {
      let emotionID = 27;
      switch (params.emotionID) {
        case "joie":
          emotionID = 35;
          break;
        case "tristesse":
          emotionID = 18;
          break;
        case "peur":
          emotionID = 27;
          break;
        case "colere":
          emotionID = 80;
          break;
      }
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=01e787d764d61219a648b30bc425cdc9&with_genres=${emotionID}&language=fr-FR&sort_by=popularity.desc`,
        );
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error("Error loading mood", error);
      }
    },
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
//Enveloppement de RouterProvider avec StyleProvider : Cela garantit que tous les composants ont accès au contexte, y compris ceux rendus par le routage.
createRoot(rootElement).render(
  <StrictMode>
      {/** StyleProvider etant le 1er provider ne connait pas les hooks de ses enfants  */}
    <StyleProvider>
      {/**
       *RouterProvider étant l'enfant de StyleProvider, il connait ses hooks.
       */}
      <RouterProvider router={router} />
    </StyleProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
