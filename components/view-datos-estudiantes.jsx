"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import EstudiantePDF from '@/components/estudiante-pdf';
import { Analytics } from "@vercel/analytics/react";

const ViewDatosEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [filters, setFilters] = useState({
    fechaRegistro: '',
    docente: '',
    tecnico: ''
  });
  const [showAllColumns, setShowAllColumns] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchEstudiantes = async () => {
      try {
        const response = await fetch('/api/datosEstudiantes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener los datos de estudiantes');
        }
        const data = await response.json();
        setEstudiantes(data);
        setFilteredEstudiantes(data); // Inicialmente, mostrar todos los estudiantes
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstudiantes();
  }, [router]);

  useEffect(() => {
    // Función para aplicar los filtros
    const applyFilters = () => {
      let filtered = estudiantes;

      if (filters.fechaRegistro) {
        filtered = filtered.filter(estudiante =>
          estudiante.fecha_registro.includes(filters.fechaRegistro)
        );
      }

      if (filters.docente) {
        filtered = filtered.filter(estudiante =>
          estudiante.docente.toLowerCase().includes(filters.docente.toLowerCase())
        );
      }

      if (filters.tecnico) {
        filtered = filtered.filter(estudiante =>
          estudiante.tecnico.toLowerCase().includes(filters.tecnico.toLowerCase())
        );
      }

      setFilteredEstudiantes(filtered);
    };

    applyFilters(); // Aplicar los filtros cada vez que cambien
  }, [filters, estudiantes]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleViewPDF = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setShowPDF(true);
  };

  const handleEdit = (id) => {
    router.push(`/editar-estudiante/${id}`);
  };

  const handleDelete = async (id, documento1, documento2) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/deleteEstudiante", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, documento1, documento2 }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el estudiante");
      }

      setEstudiantes((prev) => prev.filter((estudiante) => estudiante.id !== id));
      setFilteredEstudiantes((prev) => prev.filter((estudiante) => estudiante.id !== id));
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
      alert("Error al eliminar el estudiante");
    }
  };

  return (
    <div>
      <Analytics />
      <h1 className="text-2xl font-bold mb-4 ml-4">Datos de Estudiantes</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          name="fechaRegistro"
          value={filters.fechaRegistro}
          onChange={handleFilterChange}
          placeholder="Filtrar por fecha de registro"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="docente"
          value={filters.docente}
          onChange={handleFilterChange}
          placeholder="Filtrar por docente"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="tecnico"
          value={filters.tecnico}
          onChange={handleFilterChange}
          placeholder="Filtrar por técnico"
          className="border p-2 rounded"
        />
        <button
          onClick={() => setShowAllColumns(!showAllColumns)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showAllColumns ? "Ocultar columnas" : "Mostrar todas las columnas"}
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-blue-300">
        <thead className="bg-gray-50 border border-blue-300">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Nombres
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Apellidos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Edad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Sexo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Municipio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Teléfono
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Técnico
            </th>
            {showAllColumns && (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Fecha de Nacimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Estado Civil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Cedula
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Municipio de Nacimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Departamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Personas en el Hogar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Nivel Academico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Nombres de Emergencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Parentesco de Emergencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Teléfono de Emergencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Docente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
                  Fecha de Registro
                </th>
              </>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Cedula o partida de nacimiento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Diploma o notas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Imprimir
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Editar Registro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-blue-300">
              Eliminar Registro
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEstudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                {estudiante.nombres}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                {estudiante.apellidos}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                {estudiante.edad}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                {estudiante.sexo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                {estudiante.municipio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                {estudiante.telefono}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                {estudiante.tecnico}
              </td>
              {showAllColumns && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.fecha_nacimiento}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.estadocivil}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.cedula}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.municipionacimiento}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.departamento}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.direccion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.personas_hogar}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.nivel_academico}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.emergencia_nombres}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.emergencia_parentezco}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.emergencia_telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.docente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                    {estudiante.fecha_registro}
                  </td>
                </>
              )}
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                <Image
                  src={estudiante.documento}
                  alt="Documento"
                  width={150}
                  height={50}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                <Image
                  src={estudiante.documento2}
                  alt="Documento"
                  width={150}
                  height={80}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                <button
                  onClick={() => handleViewPDF(estudiante)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Ver Documento
                </button>
                <PDFDownloadLink
                  document={<EstudiantePDF estudiante={estudiante} />}
                  fileName={`${estudiante.nombres}_${estudiante.apellidos}.pdf`}
                  className="bg-green-700 p-2 rounded ml-2"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Cargando documento..." : "Descargar PDF"
                  }
                </PDFDownloadLink>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                <button
                  onClick={() => handleEdit(estudiante.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Editar
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-blue-300">
                <button
                  onClick={() =>
                    handleDelete(
                      estudiante.id,
                      estudiante.documento,
                      estudiante.documento2
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPDF && selectedEstudiante && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <PDFViewer style={{ width: "100%", height: "80vh" }}>
              <EstudiantePDF estudiante={selectedEstudiante} />
            </PDFViewer>
            <button
              onClick={() => setShowPDF(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDatosEstudiantes;