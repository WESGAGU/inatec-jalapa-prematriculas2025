import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import pool from "@/lib/db";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request) {
  try {
    const { id, documento1, documento2 } = await request.json();

    // Eliminar las imágenes de Cloudinary
    if (documento1) {
      const publicId1 = documento1.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId1);
    }

    if (documento2) {
      const publicId2 = documento2.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId2);
    }

    // Eliminar el registro de la base de datos
    const query = "DELETE FROM datosEstudiantes WHERE id = $1";
    await pool.query(query, [id]);

    return NextResponse.json({ message: "Estudiante eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error);
    return NextResponse.json(
      { message: "Error interno del servidor", error: error.message },
      { status: 500 }
    );
  }
}