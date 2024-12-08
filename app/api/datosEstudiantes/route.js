// app/api/datosEstudiantes/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  try {
    const query = `
      SELECT * FROM datosEstudiantes
    `;

    const result = await pool.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al obtener los datos de estudiantes:", error);
    return NextResponse.json(
      { message: "Error interno del servidor", error: error.message },
      { status: 500 }
    );
  }
}