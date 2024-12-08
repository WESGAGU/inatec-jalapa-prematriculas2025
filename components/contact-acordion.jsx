import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Card, CardContent } from "@/components/ui/card"
  import { Facebook, Instagram, Phone } from 'lucide-react'
  import Link from 'next/link'
  
 const ContactAcordion = () =>  {
    return (
      <Accordion type="single" collapsible className="w-full max-w-md mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>Redes Sociales</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <Facebook className="h-8 w-8 text-blue-600" />
                  <Link href="https://www.facebook.com/CTJalapa" className="flex items-center">
                    <span className="ml-2">Facebook</span>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <Instagram className="h-8 w-8 text-pink-600" />
                  <Link href="https://www.instagram.com/centrotecjalapa/" className="flex items-center">
                    <span className="ml-2">Instagram</span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>LLamar a los Números de Teléfono</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <Phone className="h-8 w-8 text-gray-600" />
                  <Link href="tel:82389200" className="flex items-center">
                    <span className="ml-2">82389200</span>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <Phone className="h-8 w-8 text-gray-600" />
                  <Link href="tel:86153807" className="flex items-center">
                    <span className="ml-2">86153807</span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Chat por WhatsApp</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <Link href="https://wa.me/50587043761" target="_blank" rel="noopener noreferrer">
                    <span className="ml-2">87043761</span>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  <Link href="https://wa.me/50584433992" target="_blank" rel="noopener noreferrer">
                    <span className="ml-2">84433992</span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  export default ContactAcordion;