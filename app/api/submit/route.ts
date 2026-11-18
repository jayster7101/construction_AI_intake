import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const endpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xaeoovko";
  if (!/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint)) {
    return NextResponse.json({ error: "Signup is currently unavailable." }, { status: 503 });
  }

  const payload: unknown = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object" || !("name" in payload) || !("email" in payload)
      || typeof payload.name !== "string" || typeof payload.email !== "string") {
    return NextResponse.json({ error: "Enter your name and email address." }, { status: 400 });
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter your name and a valid email address." }, { status: 400 });
  }

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });

    if (result.ok) return NextResponse.json({ ok: true });
    if (result.status === 429) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }
  } catch {
    // Send a generic error so provider details stay on the server.
  }
  return NextResponse.json({ error: "We couldn’t complete your signup. Please try again." }, { status: 502 });
}
