import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // افترض الـ backend endpoint: `${API}auth/forgot-password`
    const res = await fetch(`${process.env.API}auth/forgotPasswords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Forgot API error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
