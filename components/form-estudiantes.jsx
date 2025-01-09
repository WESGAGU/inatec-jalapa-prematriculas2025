import { useState } from 'react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FormEstudiantes = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    edad: 14,
    sexo: '',
    estadocivil: '',
    cedula: '',
    municipionacimiento: '',
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

  const [file1, setFile1] = useState(null); // Estado para la primera imagen
  const [preview1, setPreview1] = useState(null); // Vista previa de la primera imagen
  const [file2, setFile2] = useState(null); // Estado para la segunda imagen
  const [preview2, setPreview2] = useState(null); // Vista previa de la segunda imagen
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el indicador de carga

  // Opciones dinámicas para el estado civil
  const opcionesEstadoCivil = {
    Masculino: ['Soltero', 'Casado', 'Viudo'],
    Femenino: ['Soltera', 'Casada', 'Viuda'],
  };

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si cambia el campo "sexo", reiniciar el campo "estadocivil"
    if (name === 'sexo') {
      setFormData({
        ...formData,
        [name]: value,
        estadocivil: '', // Reiniciar el estado civil al cambiar el sexo
      });
    } else {
      // Capitalización de nombres y apellidos
      if (name === 'nombres' || name === 'apellidos' || name === 'emergencia_nombres' || name === 'direccion' || name === 'emergencia_parentezco' || name === 'comunidad') {
        const words = value.split(' ');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        const capitalizedValue = capitalizedWords.join(' ');
        setFormData({ ...formData, [name]: capitalizedValue });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }

    // Validación para "TE en Gestión de Fincas Ganaderas"
    if (name === 'tecnico' && value === 'TE en Gestión de Fincas Ganaderas') {
      if (formData.edad < 16 || formData.nivel_academico !== 'Undecimo') {
        Swal.fire({
          icon: 'info',
          title: 'Información',
          text: 'No cumples con los requisitos para optar al TE en Gestión de Fincas Ganaderas. Debes tener al menos 16 años y estar en Undecimo grado.',
        });
        setFormData({ ...formData, tecnico: '' }); // Deshabilitar la opción
      }
    }
  };

  // Manejar la selección de la primera imagen
  const handleFileChange1 = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile1(uploadedFile);
      setPreview1(URL.createObjectURL(uploadedFile)); // Generar URL de previsualización
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, sube un archivo de imagen válido (jpg, png, etc.).',
      });
    }
  };

  // Manejar la selección de la segunda imagen
  const handleFileChange2 = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile2(uploadedFile);
      setPreview2(URL.createObjectURL(uploadedFile)); // Generar URL de previsualización
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, sube un archivo de imagen válido (jpg, png, etc.).',
      });
    }
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Activar el indicador de carga

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
        setIsSubmitting(false); // Desactivar el indicador de carga
        return; // No enviar el formulario si excede el límite
      }
      if (value.length < 8 && value.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El número de teléfono debe tener al menos 8 dígitos.',
        });
        setIsSubmitting(false); // Desactivar el indicador de carga
        return; // No enviar el formulario si no cumple el mínimo
      }
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file1) {
      data.append('image1', file1); // Agregar la primera imagen
    }
    if (file2) {
      data.append('image2', file2); // Agregar la segunda imagen
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
          text: 'Matricula registrada exitosamente, se le contactará a inicios de Febrero, Las clases inician el 3 de Febrero.',
        });
        // Limpiar el formulario después de enviar los datos
        setFormData({
          nombres: '',
          apellidos: '',
          fecha_nacimiento: '',
          edad: 14,
          sexo: '',
          estadocivil: '',
          cedula: '',
          municipionacimiento: '',
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
        setFile1(null);
        setFile2(null);
        setPreview1(null);
        setPreview2(null);
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
    } finally {
      setIsSubmitting(false); // Desactivar el indicador de carga
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-96 md:w-4/5 lg:w-3/6 mx-auto p-4 border rounded shadow-xl mb-5"
    >
      <h2 className="block text-center font-bold mb-5">DATOS PERSONALES</h2>
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

      {/* Campo de estado civil */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">ESTADO CIVIL:</label>
        <select
          name="estadocivil"
          value={formData.estadocivil}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
          disabled={!formData.sexo} // Deshabilitar si no se ha seleccionado un sexo
        >
          <option value="">Seleccione...</option>
          {formData.sexo &&
            opcionesEstadoCivil[formData.sexo].map((opcion, index) => (
              <option key={index} value={opcion}>
                {opcion}
              </option>
            ))}
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
          <option value="">Seleccione...</option>
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
        <label className="block text-gray-700 mb-2">DEPARTAMENTO DOMICILIAR:</label>
        <select
          name="departamento"
          value={formData.departamento}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="">Seleccione departamento donde vive...</option>
          <option value="Nueva Segovia">Nueva Segovia</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* Campo de municipio */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">MUNICIPIO DOMICILIAR:</label>
        <select
          name="municipio"
          value={formData.municipio}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="">Seleccione municipio donde vive..</option>
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
        <label className="block text-gray-700 mb-2">COMUNIDAD DOMICILIAR:</label>
        <input
          type="text"
          name="comunidad"
          placeholder="Ex: sector, barrio"
          value={formData.comunidad}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de dirección */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">DIRECCIÓN DOMICILIAR:</label>
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
        <label className="block text-gray-700 mb-2">
          PERSONAS EN EL HOGAR:
        </label>
        <input
          type="number"
          min="1"
          name="personas_hogar"
          value={formData.personas_hogar}
          onChange={handleChange}
          placeholder="Número de personas que viven en su hogar"
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

      {/* Campo de Nivel Académico */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">NIVEL ACADÉMICO:</label>
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
      <h2 className="block text-center font-bold mb-5">
        CARRERA TÉCNICA QUE DESEA ESTUDIAR
      </h2>
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
          <optgroup label="Turno Diurno">
            <option value="TG en Computación">TG en Computación</option>
            <option value="TG en Contabilidad">TG en Contabilidad</option>
            <option value="TG en Administración">TG en Administración</option>
            <option value="TG en Veterinaria">TG en Veterinaria</option>
            <option value="TG en Agropecuaria">TG en Agropecuaria</option>
          </optgroup>
          <optgroup label="Turno Sabatino">
            <option value="TG en Zootecnia">TG en Zootecnia</option>
            <option value="TG en Agronomía">TG en Agronomía</option>
            <option value="TG en Riego Agrícola">TG en Riego Agrícola</option>
            <option value="TE en Gestión de Fincas Ganaderas">
              TE en Gestión de Fincas Ganaderas
            </option>
          </optgroup>
        </select>
      </div>

      {/* Campo de emergencia nombre */}
      <h2 className="block text-center font-bold mb-5 mt-5">
        EN CASO DE EMERGENCIA LLAMAR A
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          NOMBRES Y APELLIDOS DE EMERGENCIA:
        </label>
        <input
          type="text"
          name="emergencia_nombres"
          placeholder="Nombre de su familiar."
          value={formData.emergencia_nombres}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de emergencia parentesco */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          PARENTESCO DE EMERGENCIA:
        </label>
        <input
          type="text"
          name="emergencia_parentezco"
          placeholder="Ex: Madre, Padre, Abuela, etc.."
          value={formData.emergencia_parentezco}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de emergencia teléfono */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          TELÉFONO DE EMERGENCIA:
        </label>
        <input
          type="text"
          name="emergencia_telefono"
          placeholder="telf. de su familiar."
          value={formData.emergencia_telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        />
      </div>

      {/* Campo de docente */}
      <h2 className="block text-center font-bold mb-5 mt-5">OTROS DATOS</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">DOCENTE:</label>
        <span className="block text-gray-500 mb-3 text-md md:text-lg">
          En caso de que algún Docente le recomendó la prematrícula en línea
          selecciónelo, si no omita.
        </span>
        <select
          name="docente"
          value={formData.docente}
          onChange={handleChange}
          className="w-full p-2 border rounded border-blue-300"
          required
        >
          <option value="">Seleccione...</option>
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

      {/* Campo de imagen del documento 1 */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          DOCUMENTO 1 IMAGEN DE CÉDULA DE IDENTIDAD O PARTIDA DE NACIMIENTO:
        </label>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md hover:text-blue-400">Leer importante...</AccordionTrigger>
            <AccordionContent>
              <span className="block text-blue-700 mb-3 text-md md:text-lg">
                Aquí deberá subir una imagen de su Cédula de identidad, en caso de ser menor de edad o por algún motivo no tiene cédula actualmente, tendra que subir una imagen de su partida de nacimiento que verifique la escritura de sus Nombres y Apellios.
              </span>

              <Image
                src="partidaCedula.webp"
                width={200}
                height={100}
                alt="indicativo"
                className="w-full"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="relative border border-blue-300 rounded p-2 mt-2">
          <input
            type="file"
            onChange={handleFileChange1}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            required
          />
          <div className="text-center p-2 bg-blue-100 text-blue-700 rounded">
            {file1 ? file1.name : "Seleccionar archivo"}
          </div>
        </div>
        {preview1 && (
          <img
            src={preview1}
            alt="Vista previa 1"
            className="mt-2 w-40 lg:w-60 h-auto rounded"
          />
        )}
      </div>

      {/* Campo de imagen del documento 2 */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
        DOCUMENTO 2 IMAGEN DEL DIPLOMA DE BACHILLER O NOTAS DE SECUNDARIA:
        </label>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-md hover:text-blue-400">Leer importante...</AccordionTrigger>
            <AccordionContent>
            <span className="block text-blue-700 mb-3 text-md md:text-lg">
                Aquí deberá subir una imagen de su Diploma de bachiller, en caso
                de estar en secundaria tendra que subir una imagen de sus notas del año que esta cursando actualmente,  &quot;tambien puede tomarle fotos a su boletin de notas&quot;.
              </span>
              

              <Image
                src="/diplomaNotas.webp"
                width={200}
                height={100}
                alt="indicativo"
                className="w-full"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="relative border border-blue-300 rounded p-2 mt-2">
          <input
            type="file"
            onChange={handleFileChange2}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            required
          />
          <div className="text-center p-2 bg-blue-100 text-blue-700 rounded">
            {file2 ? file2.name : "Seleccionar archivo"}
          </div>
        </div>
        {preview2 && (
          <img
            src={preview2}
            alt="Vista previa 2"
            className="mt-2 w-40 lg:w-60 h-auto rounded"
          />
        )}
      </div>

      {/* Botón de enviar con indicador de carga */}
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded w-full flex justify-center items-center"
        disabled={isSubmitting} // Deshabilitar el botón mientras se envía
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Enviando...
          </div>
        ) : (
          "Enviar"
        )}
      </button>
      <span className="block mt-5 text-gray-500 text-center">
        ¡Al presionar el botón Enviar, espere a que se muestre la alerta de
        envío!
      </span>
    </form>
  );
};

export default FormEstudiantes;