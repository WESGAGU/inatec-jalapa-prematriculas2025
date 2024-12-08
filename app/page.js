"use client"
import { useState } from "react";
import FormEstudinates from "@/components/form-estudiantes";
import HeaderCard from "@/components/header-card";
import Contact from "@/components/contact";
import TecnicosCard from "@/components/tecnicos-card";

export default function Home() {
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario

  const toggleForm = () => {
    setShowForm(!showForm); // Cambia el estado entre verdadero y falso
  };

  return (
    <div>
      <HeaderCard />
      <div className="flex justify-center mt-5">
        <button
          onClick={toggleForm}
          className="bg-gray-900 rounded p-3 text-gray-50 mb-5"
        >
          {showForm ? "Ocultar Formulario" : "Mostrar Formulario de prematricula"}
        </button>
      </div>
      {/* Condición para mostrar el formulario */}
      {showForm && <FormEstudinates />}

      <div>
        <TecnicosCard />
      </div>

      <div>
        <Contact />
      </div>
    </div>
  );
}