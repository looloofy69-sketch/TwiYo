import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("The TwiYo root element is missing.");

createRoot(container).render(<App/>);
