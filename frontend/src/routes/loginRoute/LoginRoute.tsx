import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import API from "../../api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function LoginRoute() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for validation or redirecting will go here
        const res = await API.login(password);
        // if true alert user success by sonner  and re-route to /dashboard
        if (res.success) {
            toast.success("Login successful!", { position: "top-center" });
            navigate("/dashboard");
        }
        // else alert user by sonner, incorrect password
        else {
            toast.error("Incorrect password", { position: "top-center" });
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
                <h1 className="w-full text-center mb-4 text-2xl font-bold">
                    Please Enter Password
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full rounded-md border border-slate-300 px-4 py-2 text-center text-2xl tracking-widest focus:border-zinc-900 focus:outline-none focus:ring-1 "
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="rounded-md border-2 border-slate-800 px-8 py-2 text-lg font-medium transition-colors hover:bg-slate-800 hover:text-white"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}
