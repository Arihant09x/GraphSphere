"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrainCircuit } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setBusy(true);

    try {
      await register(form);
      router.replace("/explorer");
    } catch {
      toast.error("Unable to create your account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#07111f] p-5 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-2xl"
      >
        <div className="mb-8 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-400 text-slate-950">
            <BrainCircuit />
          </span>
          <div>
            <p className="font-semibold">GraphSphere</p>
            <p className="text-xs text-slate-400">Create your workspace</p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold">Start exploring</h1>
        <p className="mt-1 text-sm text-slate-400">
          Your account includes a developer graph profile.
        </p>

        <div className="mt-6 space-y-4">
          {[
            ["name", "Name", "text"],
            ["email", "Email", "email"],
            ["password", "Password", "password"],
            ["confirm", "Confirm password", "password"],
          ].map(([key, text, kind]) => (
            <label key={key} className="block text-sm">
              {text}
              <Input
                required
                minLength={key === "password" ? 8 : undefined}
                type={kind as string}
                value={form[key as keyof typeof form]}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    [key]: event.target.value,
                  }))
                }
                className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-white outline-none focus:border-cyan-400"
              />
            </label>
          ))}
        </div>

        <Button
          type="submit"
          disabled={busy}
          className="mt-6 h-11 w-full rounded-lg bg-cyan-400 font-medium text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
        >
          {busy ? "Creating account…" : "Create account"}
        </Button>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <Link className="text-cyan-300" href="/login">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
