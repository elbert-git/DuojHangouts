import { BrowserRouter, Routes, Route } from "react-router";
import LoginRoute from "./routes/loginRoute/LoginRoute";
import LogoutRoute from "./routes/logoutRoute/LogoutRoute";
import { Toaster } from "./components/ui/sonner";
import DashboardRoute from "./routes/dashboardRoute/DashboardRoute";
import NotFoundRoute from "./routes/notFoundRoute/NotFoundRoute";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<>Hello</>} />
          <Route path="login" element={<LoginRoute />} />
          <Route path="dashboard" element={<DashboardRoute />} />
          <Route path="logout" element={<LogoutRoute />} />
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
        <Toaster />
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
