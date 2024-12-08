// app/api/login/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    const query = `
      SELECT * FROM usuarios WHERE username = $1
    `;
    const values = [username];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    return NextResponse.json(
      { message: "Error interno del servidor", error: error.message },
      { status: 500 }
    );
  }
}