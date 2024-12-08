import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path, { resolve } from "path";
import { v2 as cloudinary } from "cloudinary";
import { url } from "inspector";
import { rejects } from "assert";
import pool from "@/lib/db";

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: "dy2yduikz",
    api_key: "493832529377418",
    api_secret: "ijMZnjmd4Xlz3MmZQ0Ckg3BLd1w", // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl);
})();

export async function POST(request) {
  try {
    const data = await request.formData();

    // Extraer campos del formulario
    const nombres = data.get("nombres");
    const apellidos = data.get("apellidos");
    const fecha_nacimiento = data.get("fecha_nacimiento");
    const edad = data.get("edad");
    const sexo = data.get("sexo");
    const departamento = data.get("departamento");
    const municipio = data.get("municipio");
    const comunidad = data.get("comunidad");
    const direccion = data.get("direccion");
    const personas_hogar = data.get("personas_hogar");
    const telefono = data.get("telefono");
    const nivel_academico = data.get("nivel_academico");
    const tecnico = data.get("tecnico");
    const emergencia_nombres = data.get("emergencia_nombres");
    const emergencia_parentezco = data.get("emergencia_parentezco");
    const emergencia_telefono = data.get("emergencia_telefono");
    const docente = data.get("docente");
    const fecha_registro = data.get("fecha_registro");
    const image = data.get("image");

    if (!image) {
      return NextResponse.json(
        { message: "No se ha subido ninguna imagen" },
        { status: 400 }
      );
    }

    // Convertir la imagen en un buffer para subirla
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir la imagen a Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    const imageUrl = uploadResponse.secure_url;

    // Insertar datos en la base de datos
    const query = `
      INSERT INTO datosEstudiantes (
        nombres, apellidos, fecha_nacimiento, edad, sexo, departamento, municipio, comunidad, direccion,
        personas_hogar, telefono, nivel_academico, tecnico, emergencia_nombres, emergencia_parentezco,
        emergencia_telefono, docente, fecha_registro, documento
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING id
    `;

    const values = [
      nombres,
      apellidos,
      fecha_nacimiento,
      edad,
      sexo,
      departamento,
      municipio,
      comunidad,
      direccion,
      personas_hogar,
      telefono,
      nivel_academico,
      tecnico,
      emergencia_nombres,
      emergencia_parentezco,
      emergencia_telefono,
      docente,
      fecha_registro,
      imageUrl,
    ];

    const result = await pool.query(query, values);
    return NextResponse.json({
      message: "Estudiante registrado exitosamente",
      studentId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { message: "Error interno del servidor", error: error.message },
      { status: 500 }
    );
  }
}
