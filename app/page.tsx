"use client";

import { useRef, useState, type FormEvent } from "react";

export default function Home() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    submitting.current = true;
    setStatus("pending");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
        signal: AbortSignal.timeout(15000),
      });

      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        const body = await response.json().catch(() => null);
        setError(body?.error || "We couldn’t complete your signup. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("We couldn’t connect. Please try again.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  const message = status === "success" ? "You’re on the list. Thanks for signing up."
    : status === "error" ? error : "";

  return (
    <main>
      <section className="panel" aria-labelledby="page-title">
        <div className="intro">
          <div className="mark" aria-hidden="true"><span /><span /><span /></div>
          <h1 id="page-title">Construction Rework prevention AI</h1>
          <p>Sign up to hear when early access opens.</p>
        </div>
        <form onSubmit={submit} aria-label="Early access signup">
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" autoComplete="name" placeholder="Jordan Lee" required maxLength={120} pattern=".*\S.*" />
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="jordan@example.com" required maxLength={254} />
          </div>
          <button type="submit" disabled={status === "pending"}>
            {status === "pending" ? "Signing up…" : "Join the waitlist"}<span aria-hidden="true">↗</span>
          </button>
          <p className="status" role="status" data-state={status}>{message}</p>
        </form>
      </section>
    </main>
  );
}
