import { BrowserRouter, Routes, Route } from "react-router";
import LoginRoute from "./routes/loginRoute/LoginRoute";
import { Toaster } from "./components/ui/sonner";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>Hello</>} />
                <Route path="login" element={<LoginRoute />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
