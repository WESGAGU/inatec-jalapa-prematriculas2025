import { useState } from 'react';
import Swal from 'sweetalert2';

const FormEstudiantes = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    edad: 14,
    sexo: '',
    departamento: '',
    municipio: '',
    comunidad: '',
    direccion: '',
    personas_hogar: '',
    telefono: '',
    nivel_academico: '',
    tecnico: '',
    emergencia_nombres: '',
    emergencia_parentezco: '',
    emergencia_telefono: '',
    docente: '',
    fecha_registro: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Capitalización de nombres y apellidos
    if (name === 'nombres' || name === 'apellidos' || name === 'emergencia_nombres' || name === 'direccion' || name === 'emergencia_parentezco' || name === 'comunidad') {
      const words = value.split(' ');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      const capitalizedValue = capitalizedWords.join(' ');
      setFormData({ ...formData, [name]: capitalizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Validación para "TE en Gestión de Fincas Ganaderas"
    if (name === 'tecnico' && value === 'TE en Gestión de Fincas Ganaderas') {
      if (formData.edad < 16 || formData.nivel_academico !== 'Undecimo') {
        Swal.fire({
          icon: 'info',
          title: 'Información',
          text: 'No cumples con los requisitos para optar al TE en Gestón de fincas Ganadera. Debes tener al menos 16 años y estar en Undecimo grado.',
        });
        setFormData({ ...formData, tecnico: '' }); // Deshabilitar la opción
      }
    }
  };

  // Manejar la selección de la imagen
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile)); // Generar URL de previsualización
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de longitud para los campos de teléfono
    const phoneFields = ['telefono', 'emergencia_telefono'];
    for (const field of phoneFields) {
      const value = formData[field];
      if (value.length > 12) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El número de teléfono no puede tener más de 12 dígitos.',
        });
        return; // No enviar el formulario si excede el límite
      }
      if (value.length < 8 && value.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El número de teléfono debe tener al menos 8 dígitos.',
        });
        return; // No enviar el formulario si no cumple el mínimo
      }
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) {
      data.append('image', file);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Prematricula registrada exitosamente',
        });
        // Limpiar el formulario después de enviar los datos
        setFormData({
          nombres: '',
          apellidos: '',
          fecha_nacimiento: '',
          edad: 14,
          sexo: '',
          departamento: '',
          municipio: '',
          comunidad: '',
          direccion: '',
          personas_hogar: '',
          telefono: '',
          nivel_academico: '',
          tecnico: '',
          emergencia_nombres: '',
          emergencia_parentezco: '',
          emergencia_telefono: '',
          docente: '',
          fecha_registro: '',
        });
        setFile(null);
        setPreview(null);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al enviar los datos',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 md:w-4/5 lg:w-3/6 mx-auto p-4 border rounded shadow-xl mb-5">
      <h2 className='block text-center font-bold mb-5'>DATOS PERSONALES</h2>
      {/* Campo de nombres */}
      <div className="mb-4">
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

      {/* Campo de apellidos */}
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
          {/* Agregar más departamentos según sea necesario */}
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
      <h2 className='block text-center font-bold mb-5'>CARRERA TÉCNICA QUE DESEA ESTUDIAR</h2>

      {/* Campo de técnico */}
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
      <h2 className='block text-center font-bold mb-5 mt-5'>EN CASO DE EMERGENCIA LLAMAR A</h2>

      {/* Campo de emergencia nombre */}
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

      <h2 className='block text-center font-bold mb-5 mt-5'>OTROS DATOS</h2>

      {/* Campo de docente */}
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
          {/* Agregar más docentes según sea necesario */}
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

      {/* Campo de imagen del documento */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">IMAGEN DEL DOCUMENTO:</label>
        <span className='block text-gray-500 mb-3 text-md md:text-lg'>Aqui debera subir una imagen de su cedula, en caso de no tener diploma de bachicherato o primaria que verifique sus Nombres y Apellidos</span>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
        {preview && (
          <img src={preview} alt="Vista previa" className="mt-2 w-96 h-auto rounded" />
        )}
      </div>

      {/* Botón de enviar */}
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded w-full"
      >
        Enviar
      </button>
      <span className='block mt-5 text-gray-500 text-center'>¡Al precionar el boton Enviar, esperar a que se muestre la alerta de envio!</span>
    </form>
  );
};

export default FormEstudiantes;