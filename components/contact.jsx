import ContactAcordion from "@/components/contact-acordion";

const Contact = () =>{
    return (
      <div className="w-96 md:w-4/5 lg:w-3/6 mx-auto p-6 border border-gray-200 rounded-lg shadow-lg mt-3 mb-5 sm:px-5">
        <h2 className="text-center text-2xl font-bold mb-8">Contáctenos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
                <span className="block text-sm md:text-md">
                Cual quier consulta puedes contactarnos a nuestras redes
                sociales y números de telefono.

                </span>
            </div>

            <div className="flex items-center gap-3">
              <ContactAcordion />
            </div>
          </div>

          <div className="w-full h-64 md:h-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18960.403784357386!2d-86.1333157953148!3d13.931067731790462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f6ddccf90000001%3A0x655a089a46b62488!2sCentro%20Tecnol%C3%B3gico%20de%20Jalapa%2C%20Nueva%20Segovia.!5e0!3m2!1ses-419!2sni!4v1731964231535!5m2!1ses-419!2sni"
              className="w-full  h-full absolute inset-0 rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    );

    
}
export default Contact;


