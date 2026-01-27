import { BrowserRouter, Routes, Route } from "react-router";
import LoginRoute from "./routes/loginRoute/LoginRoute";
import { Toaster } from "./components/ui/sonner";
import DashboardRoute from "./routes/dashboardRoute/DashboardRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>Hello</>} />
                <Route path="login" element={<LoginRoute />} />
                <Route path="dashboard" element={<DashboardRoute />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
