import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";

import "tippy.js/dist/tippy.css";

// Tailwind css
import App from "./App";
import { ExpiredProvider } from "./state/expired-context";
import { LoadingProvider } from "./state/loading-context";
import "./tailwind.css";

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";

import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Đăng ký các thành phần của ChartJS
ChartJS.register(
    CategoryScale,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    FunnelController,
    TrapezoidElement,
    LinearScale,
    ChartDataLabels
);

root.render(
    <ExpiredProvider>
        <LoadingProvider>
            <Suspense>
                <Provider store={store}>
                    <App />
                </Provider>
            </Suspense>
        </LoadingProvider>
    </ExpiredProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
