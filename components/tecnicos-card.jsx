import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BadgeCheck, BadgeDollarSign, Calendar, Computer, Droplets, Flower2, Notebook, PawPrint, Rabbit, Sprout, WalletMinimal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TecnicosCard = () => {
  return (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 w-80 md:w-4/5 lg:w-3/6 mx-auto shadow-xl mt-5 mb-5">
      {/* Columna de la Imagen */}
      <div className="flex justify-center">
        <Image
          src="/chavalos-inatec.jpg"
          width={200}
          height={200}
          alt="Descripción de la imagen"
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>

      {/* Columna del Acordeón */}
      <div>
        <h2 className="mt-2 text-1xl md:text-2xl font-bold">
          Preguntas que te pueden interesar
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              ¿Carreras que Ofrece el centro Técnologico de Jalapa?
            </AccordionTrigger>
            <AccordionContent>
              <h3 className="mb-2 text-blue-500">Turno Diurno</h3>
              <div className="flex mb-2">
                <Computer className="h-5 w-5 mr-2 text-gray-600" />
                <Link
                  href="https://www.tecnacional.edu.ni/centro/centro-tecnologico-jalapa/carreras/1"
                  className="hover:underline"
                >
                  Técnico General en Computación.
                </Link>
              </div>
              <div className="flex mb-2">
                <BadgeDollarSign className="h-5 w-5 mr-2 text-gray-600" />
                <Link
                  href="https://www.tecnacional.edu.ni/centro/centro-tecnologico-jalapa/carreras/17"
                  className="hover:underline"
                >
                  Técnico General en Administración.
                </Link>
              </div>
              <div className="flex mb-2">
                <WalletMinimal className="h-5 w-5 mr-2 text-gray-600" />
                <Link
                  href="https://www.tecnacional.edu.ni/centro/centro-tecnologico-jalapa/carreras/18"
                  className="hover:underline"
                >
                  Técnico General en Contabilidad.
                </Link>
              </div>
              <div className="flex mb-2">
                <PawPrint className="h-5 w-5 mr-2 text-gray-600" />
                <Link
                  href="https://www.tecnacional.edu.ni/centro/centro-tecnologico-jalapa/carreras/31"
                  className="hover:underline"
                >
                  Técnico General en Veterinaria.
                </Link>
              </div>
              <div className="flex mb-2">
                <Sprout className="h-5 w-5 mr-2 text-gray-600" />
                <Link
                  href="https://www.tecnacional.edu.ni/centro/centro-tecnologico-jalapa/carreras/30"
                  className="hover:underline"
                >
                  Técnico General en Agropecuaria.
                </Link>
              </div>

              <h3 className="mb-2 text-blue-500">Turno Sabatino</h3>
              <div className="flex mb-2">
                <Rabbit className="h-5 w-5 mr-2 text-gray-600" />
                <Link href="#" className="hover:underline">
                  Técnico General en Zootecnia.
                </Link>
              </div>
              <div className="flex mb-2">
                <Flower2 className="h-5 w-5 mr-2 text-gray-600" />
                <Link
                  href="https://www.tecnacional.edu.ni/centro/centro-tecnologico-jalapa/carreras/32"
                  className="hover:underline"
                >
                  Técnico General en Agronomia.
                </Link>
              </div>
              <div className="flex mb-2">
                <Droplets className="h-5 w-5 mr-2 text-gray-600" />
                <Link href="#" className="hover:underline">
                  Técnico General en Riego Agricola.
                </Link>
              </div>
              <div className="flex mb-2">
                <Notebook className="h-5 w-5 mr-2 text-gray-600" />
                <Link href="#" className="hover:underline">
                  Técnico Especialista en Gestión de Fincas Ganaderas.
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              ¿Cuales son los requisitos para poder estudiar una carrera
              técnica?
            </AccordionTrigger>
            <AccordionContent>
              <h3 className="mb-3 text-gray-500">
                Para poder estudiar una carrera técnica en nuestro centro
                necesitas cumplir con los siguientes requisitos básicos:
              </h3>
              <div className="flex mb-2">
                <BadgeCheck className="h-5 w-5 mr-2 text-green-400" />
                <span>Edad mínima: 14 años cumplidos.</span>
              </div>
              <div className="flex mb-2">
                <BadgeCheck className="h-5 w-5 mr-2 text-green-400" />
                <span>Noveno grado aprobado.</span>
              </div>
              <h3 className="mb-3 mt-3 text-gray-500">
                Requisitos especifico para el Técnico especialista en Gestión de
                fincas Ganaderas:
              </h3>
              <div className="flex mb-2">
                <BadgeCheck className="h-5 w-5 mr-2 text-green-400" />
                <span>Edad mínima: 16 años cumplidos.</span>
              </div>
              <div className="flex mb-2">
                <BadgeCheck className="h-5 w-5 mr-2 text-green-400" />
                <span>Bachillerato aprobado.</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              ¿Cuando es el inicio de clases?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-500">
                Nuestro calendario académico está estructurado de la siguiente
                manera:
              </p>
              <div className="block">
                <div className="flex mt-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Primer semestre: Inicia en febrero</span>
                </div>
                <div className="flex mt-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Segundo semestre: Inicia en Julio</span>
                </div>
              </div>
              <p className="text-gray-500 mt-3">
                Las fechas exactas pueden variar ligeramente cada año.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TecnicosCard;
