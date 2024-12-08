import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const HeaderCard = () => {
    return (  
        <div className="p-4">
        {/* Tarjeta principal */}
        <Card className="block w-80 md:w-4/5 lg:w-3/6 mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl mb-2">
              Prematrícula en Línea
            </CardTitle>
            <p className="text-left md:text-center">
              ¡Prepárate para el futuro! El 2025 te espera con nuevas
              oportunidades de crecimiento profesional. Nuestras carreras técnicas
              te brindarán las habilidades y conocimientos necesarios para
              destacar en el mercado laboral. No dejes pasar esta oportunidad de
              transformar tu vida a través de una educación técnica de calidad.
              <span className="block text-center mt-2 text-blue-500">
                ¡Tu éxito comienza aquí!
              </span>
            </p>
          </CardHeader>
        </Card>
  
        
      </div>

    );
}
 
export default HeaderCard;