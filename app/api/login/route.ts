import { NextResponse } from "next/server";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password }: LoginBody = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Manjkajo podatki" },
      { status: 400 }
    );
  }

  // TODO: preveri uporabnika v bazi

  return NextResponse.json({ message: "Prijava uspešna!" });
}
