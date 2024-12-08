import pool from '@/lib/db';  

export async function GET(request) {
  try {
    // Intenta realizar una consulta simple para verificar la conexión
    const { rows } = await pool.query('SELECT NOW()');  // Esto obtiene la hora actual de la base de datos

    // Si la consulta es exitosa, devuelve la respuesta con los resultados
    return new Response(JSON.stringify({ message: 'Conexión exitosa', time: rows[0].now }), {
      status: 200,
    });
  } catch (error) {
    // Si hay un error, devuelve el error
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Error en la conexión a la base de datos', error: error.message }),
      { status: 500 }
    );
  }
}
