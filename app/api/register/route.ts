import { NextResponse } from "next/server";

interface RegisterBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password }: RegisterBody = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Manjkajo podatki" },
      { status: 400 }
    );
  }

  // TODO: shrani uporabnika v bazo + bcrypt hash

  return NextResponse.json({ message: "Uporabnik registriran!" });
}
