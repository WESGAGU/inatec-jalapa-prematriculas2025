import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import pool from "@/lib/db";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    const image1 = data.get("image1"); // Primera imagen
    const image2 = data.get("image2"); // Segunda imagen
    const estadocivil = data.get("estadocivil");
    const cedula = data.get("cedula");
    const municipionacimiento = data.get("municipionacimiento");

    // Validar que se hayan subido ambas imágenes
    if (!image1 || !image2) {
      return NextResponse.json(
        { message: "No se han subido ambas imágenes" },
        { status: 400 }
      );
    }

    // Convertir las imágenes en buffers para subirlas
    const bytes1 = await image1.arrayBuffer();
    const buffer1 = Buffer.from(bytes1);

    const bytes2 = await image2.arrayBuffer();
    const buffer2 = Buffer.from(bytes2);

    // Subir las imágenes a Cloudinary
    const uploadResponse1 = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer1);
    });

    const uploadResponse2 = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer2);
    });

    const imageUrl1 = uploadResponse1.secure_url; // URL de la primera imagen
    const imageUrl2 = uploadResponse2.secure_url; // URL de la segunda imagen

    // Insertar datos en la base de datos
    const query = `
      INSERT INTO datosEstudiantes (
        nombres, apellidos, fecha_nacimiento, edad, sexo, departamento, municipio, comunidad, direccion,
        personas_hogar, telefono, nivel_academico, tecnico, emergencia_nombres, emergencia_parentezco,
        emergencia_telefono, docente, fecha_registro, documento, documento2, estadocivil, cedula, municipionacimiento
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
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
      imageUrl1,
      imageUrl2,
      estadocivil,
      cedula,
      municipionacimiento
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