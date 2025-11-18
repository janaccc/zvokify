import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

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

  // preveri če obstaja
  const existing = await prisma.user.findUnique({
    where: { email }
  });

  if (existing) {
    return NextResponse.json(
      { message: "Uporabnik s tem emailom že obstaja!" },
      { status: 400 }
    );
  }

  // hash geslo
  const hashed = await bcrypt.hash(password, 10);

  // INSERT INTO User …
  await prisma.user.create({
    data: {
      email,
      password: hashed
    },
  });

  return NextResponse.json({ message: "Uporabnik uspešno registriran!" });
}
