import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-full">
      <nav>
        <Link href="/">
          <Image 
            src="/inatec-logo.png" 
            alt="Logo" 
            width={150} 
            height={150} 
            priority
            className="mx-auto mt-2 mb-2"
          />
        </Link>
        <Link href="https://www.tecnacional.edu.ni/centro/centro-tecnologico-jalapa/"
        className='block text-center mb-3 text-xl md:text-2xl hover:text-blue-400'>
          Centro Tecnológico de Jalapa
        </Link>
      </nav>
    </div>
  );
};


export default Navbar;
