import Link from "next/link";
const Footer = () => {
    return ( 
        <div className=" text-center mb-5 text-gray-500">  
        <p className="text-gray-400">Esto es un proyecto Personal, Desarrollado con el fin de brindar un proceso mas rapido de matriculas en estudiantes del centro tecnologico de Jalapa.
        <Link href="https://www.instagram.com/garciawes12/"
        target="_blank"
        className="hover:text-blue-700 block" >
        From. Wesling García.
        </Link>
         
          </p>
      </div>
     );
}
 
export default Footer;