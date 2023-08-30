import ReactDOM from "react-dom";

import App from "./App";
import { initI18n } from "./utils/i18nUtils";
import { createRoot } from 'react-dom/client';

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  const domNode = document.getElementById('app');
  const root = createRoot(domNode);
  root.render(<App />);
});
