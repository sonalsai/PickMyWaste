import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Snackbar from "./shared/components/Snackbar/Snackbar.jsx";
import Loader from "./shared/components/Loader/Loader.jsx";

const Main = () => (
  <StrictMode>
    <Provider store={store}>
      <Loader />
      <App />
      <Snackbar />
    </Provider>
  </StrictMode>
);

createRoot(document.getElementById("root")).render(<Main />);
