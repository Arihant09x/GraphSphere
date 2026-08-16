"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);

    try {
      await login({ email, password });
      router.replace("/explorer");
    } catch {
      toast.error("Unable to sign in. Check your credentials.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#07111f] p-5 text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl md:grid-cols-[1.1fr_.9fr]">
        <section className="hidden min-h-[560px] bg-[radial-gradient(circle_at_20%_20%,#06b6d455,transparent_35%),radial-gradient(circle_at_80%_80%,#6366f155,transparent_40%)] p-10 md:block">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-cyan-400 text-slate-950">
              <BrainCircuit />
            </span>
            <span className="font-semibold">GraphSphere</span>
          </div>
          <div className="mt-32">
            <p className="text-cyan-300">GRAPH INTELLIGENCE</p>
            <h1 className="mt-3 max-w-sm text-4xl font-semibold tracking-tight">
              Turn relationships for into a map for better decisions.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
              Explore developers, technology, and project connections in one
              calm workspace.
            </p>
          </div>
        </section>

        <section className="p-7 sm:p-10">
          <div className="mb-10 md:hidden">
            <BrainCircuit className="text-cyan-300" />
            <p className="mt-2 font-semibold">GraphSphere</p>
          </div>
          <p className="text-sm font-medium text-cyan-300">WELCOME BACK</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Sign in to your workspace
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Use your GraphSphere account to continue.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm">
              Email
              <Input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-white outline-none focus:border-cyan-400"
                placeholder="you@company.com"
              />
            </label>

            <label className="block text-sm">
              Password
              <Input
                required
                minLength={8}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-white outline-none focus:border-cyan-400"
                placeholder="••••••••"
              />
            </label>

            <Button
              type="submit"
              disabled={busy}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 font-medium text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
            >
              {busy ? (
                "Signing in…"
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight size={17} />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            New to GraphSphere?{" "}
            <Link
              className="font-medium text-cyan-300 hover:text-cyan-200"
              href="/register"
            >
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
