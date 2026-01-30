import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";

export default function NotFoundRoute() {
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-slate-900/60 backdrop-blur">
        <p className="text-md uppercase font-bold tracking-[0.7em] text-blue-600">
          404
        </p>
        <h1 className="mt-4 text-5xl font-semibold text-black">
          PAGE NOT FOUND!
        </h1>
        <p className="mt-3 text-lg text-black">
          We could not find the page you were looking for.
        </p>
        <Button
          onClick={() => {
            nav("/dashboard");
          }}
          className="mt-4 text-2xl bg-blue-600 text-white p-[1em]"
          variant={"secondary"}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
