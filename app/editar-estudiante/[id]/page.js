"use client"; // Marca este archivo como un Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Usa next/navigation en lugar de next/router
import Swal from "sweetalert2";



const EditarEstudiante = ({ params }) => {
  const router = useRouter();
  const paramsData = React.use(params); // Desenvuelve params usando React.use()
  const { id } = paramsData; // Obtén el ID del estudiante desde los parámetros de la URL

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    edad: 14,
    sexo: "",
    estadoCivil: "",
    cedula: "",
    municipionacimiento: "",
    departamento: "",
    municipio: "",
    comunidad: "",
    direccion: "",
    personas_hogar: "",
    telefono: "",
    nivel_academico: "",
    tecnico: "",
    emergencia_nombres: "",
    emergencia_parentezco: "",
    emergencia_telefono: "",
    docente: "",
    fecha_registro: "",
  });
  const [file1, setFile1] = useState(null); // Estado para la nueva imagen 1
  const [file2, setFile2] = useState(null); // Estado para la nueva imagen 2
  const [preview1, setPreview1] = useState(""); // Vista previa de la imagen 1
  const [preview2, setPreview2] = useState(""); // Vista previa de la imagen 2
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Obtener los datos del estudiante al cargar el componente
  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        const response = await fetch(`/api/datosEstudiantes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();


        setFormData(data); // Llenar el formulario con los datos del estudiante
        setPreview1(data.documento); // Mostrar la imagen 1 actual
        setPreview2(data.documento2); // Mostrar la imagen 2 actual
      } catch (error) {
        console.error("Error al obtener los datos del estudiante:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los datos del estudiante. Por favor, inténtalo de nuevo.",
        });
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchEstudiante();
  }, [id]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar la selección de la nueva imagen 1
  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile1(file);
      setPreview1(URL.createObjectURL(file)); // Generar URL de previsualización
    }
  };

  // Manejar la selección de la nueva imagen 2
  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile2(file);
      setPreview2(URL.createObjectURL(file)); // Generar URL de previsualización
    }
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (file1) formDataToSend.append("image1", file1); // Agregar la nueva imagen 1
    if (file2) formDataToSend.append("image2", file2); // Agregar la nueva imagen 2

    try {
      const response = await fetch("/api/updateEstudiante", {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: result.message,
      });
      router.push("/pages/verPrematriculas"); 
    } catch (error) {
      console.error("Error al actualizar el estudiante:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar el estudiante. Por favor, inténtalo de nuevo.",
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <form onSubmit={handleSubmit} className="w-96 lg:w-3/6 mx-auto p-4 border rounded shadow-xl mb-5">
      <h2 className="text-center font-bold mb-5">EDITAR DATOS DEL ESTUDIANTE</h2>

      {/* Campos del formulario */}
      <div className="mb-4">

        {/* Nombres */}
        <label className="block text-gray-700 mb-2">NOMBRES:</label>
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Apellidos */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">APELLIDOS:</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de fecha de nacimiento */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">FECHA DE NACIMIENTO:</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

       {/* Campo de edad */}
       <div className="mb-4">
        <label className="block text-gray-700 mb-2">EDAD:</label>
        <input
          type="number"
          name="edad"
          min="14"
          value={formData.edad}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

       {/* Campo de sexo */}
       <div className="mb-4">
        <label className="block text-gray-700 mb-2">SEXO:</label>
        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="">Seleccione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

       {/* Campo de estado civil*/}
       <div className="mb-4">
        <label className="block text-gray-700 mb-2">ESTADO CIVIL:</label>
        <select
          name="estadocivil"
          value={formData.estadocivil}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="">Seleccione...</option>
          <option value="Masculino">Soltero/a</option>
          <option value="Femenino">Casado/a</option>
          <option value="Femenino">Viudo/a</option>
        </select>
      </div>

      {/* Campo de cedula */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">CÉDULA:</label>
        <input
          type="text"
          name="cedula"
          placeholder="Ex:489-xxxxx-xxxx, si no tiene omitir"
          value={formData.cedula}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
        />
      </div>

      {/* Campo de municipio de nacimiento */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">MUNICIPIO DONDE NACIO:</label>
        <select
          name="municipionacimiento"
          value={formData.municipionacimiento}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="null">Seleccione...</option>
          <option value="Jalapa">Jalapa</option>
          <option value="Murra">Murra</option>
          <option value="El Jicaro">El Jicaro</option>
          <option value="Ocotal">Ocotal</option>
          <option value="Quilalí">Quilalí</option>
          <option value="Dipilto">Dipilto</option>
          <option value="Ciudad Antigua">Ciudad Antigua</option>
          <option value="Macuelizo">Macuelizo</option>
          <option value="Mozonte">Mozonte</option>
          <option value="San Fernando">San Fernando</option>
          <option value="Wiwilí NS">Wiwilí NS</option>
          <option value="Santa María">Santa María</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

       {/* Campo de departamento */}
       <div className="mb-4">
        <label className="block text-gray-700 mb-2">DEPARTAMENTO:</label>
        <select
          name="departamento"
          value={formData.departamento}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="null">Seleccione...</option>
          <option value="Nueva Segovia">Nueva Segovia</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* Campo de municipio */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">MUNICIPIO:</label>
        <select
          name="municipio"
          value={formData.municipio}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="null">Seleccione...</option>
          <option value="Jalapa">Jalapa</option>
          <option value="Murra">Murra</option>
          <option value="El Jicaro">El Jicaro</option>
          <option value="Ocotal">Ocotal</option>
          <option value="Quilalí">Quilalí</option>
          <option value="Dipilto">Dipilto</option>
          <option value="Ciudad Antigua">Ciudad Antigua</option>
          <option value="Macuelizo">Macuelizo</option>
          <option value="Mozonte">Mozonte</option>
          <option value="San Fernando">San Fernando</option>
          <option value="Wiwilí NS">Wiwilí NS</option>
          <option value="Santa María">Santa María</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* Campo de comunidad */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">COMUNIDAD:</label>
        <input
          type="text"
          name="comunidad"
          value={formData.comunidad}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de dirección */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">DIRECCIÓN:</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de personas en el hogar */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">PERSONAS EN EL HOGAR:</label>
        <input
          type="number"
          min="1"
          name="personas_hogar"
          value={formData.personas_hogar}
          onChange={handleChange}
          placeholder='Numero de personas que viven en su hogar'
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de teléfono */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">TELÉFONO:</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de Nivel Academico */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">NIVEL ACADEMICO:</label>
        <select
          name="nivel_academico"
          value={formData.nivel_academico}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="">Seleccione...</option>
          <option value="Noveno">Noveno</option>
          <option value="Décimo">Décimo</option>
          <option value="Undecimo">Undecimo</option>
        </select>
      </div>

      {/* Campo de técnico */}
      <h2 className='block text-center font-bold mb-5'>CARRERA TÉCNICA QUE DESEA ESTUDIAR</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">TÉCNICO:</label>
        <select
          name="tecnico"
          value={formData.tecnico}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="">Seleccione...</option>
          <optgroup label='Turno Diurno'>
            <option value="TG en Computación ">TG en Computación</option>
            <option value="TG en Contabilidad">TG en Contabilidad</option>
            <option value="TG en Administracón">TG en Administracón</option>
            <option value="TG en Veterinaria">TG en Veterinaria</option>
            <option value="TG en Agropecuaria">TG en Agropecuaria</option>
          </optgroup>
          <optgroup label='Turno Sabatino'>
            <option value="TG en Zootecnia">TG en Zootecnia</option>
            <option value="TG en Agronomia">TG en Agronomia</option>
            <option value="TG en Riego Agricola">TG en Riego Agricola</option>
            <option value="TE en Gestión de Fincas Ganaderas">TE en Gestión de Fincas Ganaderas</option>
          </optgroup>
        </select>
      </div>

       {/* Campo de emergencia nombre */}
       <h2 className='block text-center font-bold mb-5 mt-5'>EN CASO DE EMERGENCIA LLAMAR A</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">NOMBRES Y APELLIDOS DE EMERGENCIA:</label>
        <input
          type="text"
          name="emergencia_nombres"
          value={formData.emergencia_nombres}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

       {/* Campo de emergencia parentesco */}
       <div className="mb-4">
        <label className="block text-gray-700 mb-2">PARENTESCO DE EMERGENCIA:</label>
        <input
          type="text"
          name="emergencia_parentezco"
          value={formData.emergencia_parentezco}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de emergencia teléfono */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">TELÉFONO DE EMERGENCIA:</label>
        <input
          type="text"
          name="emergencia_telefono"
          value={formData.emergencia_telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

       {/* Campo de docente */}
       <h2 className='block text-center font-bold mb-5 mt-5'>OTROS DATOS</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">DOCENTE:</label>
        <span className='block text-gray-500 mb-3 text-md md:text-lg'>En caso de que algun Docente le recomendo la prematricula en linea seleccionarlo
          si no omitir
        </span>
        <select
          name="docente"
          value={formData.docente}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="null">Seleccione...</option>
          <option value="Omitir">--Omitir--</option>
          <option value="Anielka Margaret">Anielka Margaret</option>
          <option value="Maria José">Maria José</option>
          <option value="Soharleth Salgado">Soharleth Salgado</option>
          <option value="Clementina">Clementina</option>
          <option value="Ramón Rodriguez">Ramón Rodriguez</option>
          <option value="Ramón Matute">Ramón Matute</option>
          <option value="Wesling García">Wesling García</option>
          <option value="Boanerge Saenz">Boanerge Saenz</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* Campo de fecha de registro */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">FECHA DE REGISTRO:</label>
        <input
          type="date"
          name="fecha_registro"
          value={formData.fecha_registro}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>


      {/* Campo para la nueva imagen 1 */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">DOCUEMENTO CEDULA O PARTIDA DE NACIMIENTO:</label>
        <input
          type="file"
          onChange={handleFileChange1}
          className="w-full p-2 border rounded border-blue-300"
        />
        {preview1 && (
          <img src={preview1} alt="Vista previa 1" className="mt-2 w-48 h-auto rounded" />
        )}
      </div>

      {/* Campo para la nueva imagen 2 */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">DOCUMENTO DIPLOMA BACHILLERATO O NOTAS DE AÑO SECUNDARIA:</label>
        <input
          type="file"
          onChange={handleFileChange2}
          className="w-full p-2 border rounded border-blue-300"
        />
        {preview2 && (
          <img src={preview2} alt="Vista previa 2" className="mt-2 w-48 h-auto rounded" />
        )}
      </div>

      {/* Botón de enviar */}
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded w-full"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditarEstudiante;