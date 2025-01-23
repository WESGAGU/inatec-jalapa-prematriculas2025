import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import pool from "@/lib/db";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(request) {
  try {
    const data = await request.formData();

    // Extraer campos del formulario
    const id = data.get("id");
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
    const image1 = data.get("image1"); // Nueva imagen 1
    const image2 = data.get("image2"); // Nueva imagen 2
    const estadocivil = data.get("estadocivil");
    const cedula = data.get("cedula");
    const municipionacimiento = data.get("municipionacimiento");

    // Validar campos obligatorios
    if (
      !id ||
      !nombres ||
      !apellidos ||
      !fecha_nacimiento ||
      !edad ||
      !sexo ||
      !departamento ||
      !municipio ||
      !comunidad ||
      !direccion ||
      !personas_hogar ||
      !telefono ||
      !nivel_academico ||
      !tecnico ||
      !emergencia_nombres ||
      !emergencia_parentezco ||
      !emergencia_telefono ||
      !docente ||
      !fecha_registro ||
      !estadocivil ||
      !municipionacimiento
    ) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Obtener las URLs actuales de las imágenes
    const { rows } = await pool.query(
      "SELECT documento, documento2 FROM datosEstudiantes WHERE id = $1",
      [id]
    );
    const { documento: currentDocumento1, documento2: currentDocumento2 } =
      rows[0];

    let imageUrl1 = currentDocumento1; // Mantener la URL actual si no se sube una nueva imagen
    let imageUrl2 = currentDocumento2; // Mantener la URL actual si no se sube una nueva imagen

    // Subir nueva imagen 1 a Cloudinary si se proporciona
    if (image1 && image1 instanceof File) {
      const bytes1 = await image1.arrayBuffer();
      const buffer1 = Buffer.from(bytes1);

      const uploadResponse1 = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer1);
      });

      imageUrl1 = uploadResponse1.secure_url;

      // Eliminar la imagen anterior de Cloudinary (si existe)
      if (currentDocumento1) {
        try {
          const publicId1 = currentDocumento1.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId1);
        } catch (error) {
          console.error("Error al eliminar la imagen anterior de Cloudinary:", error);
        }
      }
    }

    // Subir nueva imagen 2 a Cloudinary si se proporciona
    if (image2 && image2 instanceof File) {
      const bytes2 = await image2.arrayBuffer();
      const buffer2 = Buffer.from(bytes2);

      const uploadResponse2 = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer2);
      });

      imageUrl2 = uploadResponse2.secure_url;

      // Eliminar la imagen anterior de Cloudinary (si existe)
      if (currentDocumento2) {
        try {
          const publicId2 = currentDocumento2.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId2);
        } catch (error) {
          console.error("Error al eliminar la imagen anterior de Cloudinary:", error);
        }
      }
    }

    // Actualizar el registro en la base de datos
    const query = `
      UPDATE datosEstudiantes SET
        nombres = $1,
        apellidos = $2,
        fecha_nacimiento = $3,
        edad = $4,
        sexo = $5,
        departamento = $6,
        municipio = $7,
        comunidad = $8,
        direccion = $9,
        personas_hogar = $10,
        telefono = $11,
        nivel_academico = $12,
        tecnico = $13,
        emergencia_nombres = $14,
        emergencia_parentezco = $15,
        emergencia_telefono = $16,
        docente = $17,
        fecha_registro = $18,
        documento = $19,
        documento2 = $20,
        estadocivil = $21,
        cedula = $22,
        municipionacimiento = $23
      WHERE id = $24
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
      municipionacimiento,
      id,
    ];

    await pool.query(query, values);

    return NextResponse.json({ message: "Estudiante actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el estudiante:", error);
    return NextResponse.json(
      { message: "Error interno del servidor", error: error.message },
      { status: 500 }
    );
  }
}