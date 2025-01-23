"use client";
import { useState } from "react";
import { Maximize } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function GalleryPage() {
    const allImages = [
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/467518480_1075211694392608_2485136246054423327_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IbO2dTKoqG8Q7kNvgG68yJn&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=AHhn-UhOFxlSAu67w9NlkVF&oh=00_AYCTDYalvoOEPRLEtqouwPJ7-_meOCPTNBsYxIr_0PR7nw&oe=67978FB8',
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/467635579_1075211671059277_7711340883878844286_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_-YA-F6BhEYQ7kNvgH9SLmR&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=AWBhYnSoYGNQ4k-diCSS3ie&oh=00_AYCMHmev6L8sTpmgc0p1lEozyCbCrpb0rTXY1bOdPKOV2A&oe=679792D2',
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/466411053_1070898808157230_8280102799417496292_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6UnNOa6gbMMQ7kNvgHhfLGu&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=A_ooRdP3YzUyhOHdTZK-Z3T&oh=00_AYD7kySiPwjrd7tKd13c-i8xnxmXw7SrT8c7eKo3liGmsA&oe=67979104',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/465715132_1066725495241228_373808703028930815_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Wy60Y1fRU48Q7kNvgH-f-2I&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=A-ze5lO6-63re90usYG7Hjr&oh=00_AYAUxJJ3-e6mB9VwdQnQ1vNzuGHG5HK8Ky18df1yQ5itaA&oe=67977DBC',
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/463444220_1051507796762998_2750452381380042060_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=NVThhUdXVTwQ7kNvgEyIAfR&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=A7LJQHMA6qOPelj_GadWyHK&oh=00_AYDEo7ifWNFkSmB25OJZKML8jAPkjSIhG_FmkMNgN1SQZw&oe=67978F49',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/462211106_1042434957670282_2692284354677563694_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VI5rVndsiqwQ7kNvgEAQNLa&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AsRNRi9B1Jr0BmM9u7wH_5S&oh=00_AYDrUtDE0FOLHErKXR-nDA3GMSXSsV9QfMnkayS8-vlfVQ&oe=679792A1',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/457618879_1019879063259205_6435825452158174670_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=pcbVc0eQ8TIQ7kNvgGCVFxz&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=At0io2H-lxLGoxqdPAUY7BS&oh=00_AYBAZTS4nsWdGOEJdjj9rq57gdtI9Uk-gmVQ6PcBkGv8lQ&oe=67979314',
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/457446124_1015328840380894_7917972932748877289_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IGjYtuMDVHwQ7kNvgFU7Yrn&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=ABtiTtgp0Na0Gin38bR2QY9&oh=00_AYDrNpZb3DSXeuzm-Ms1OigwO-ukyPbF5y26qDynLIEEMQ&oe=679781FC',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/457168373_1015329020380876_232488289329202292_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=fN6uNUXQNRUQ7kNvgGXF3M4&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AsEQecV8dMc0VGwt22Y0J9Z&oh=00_AYDHfS5jSrBz9WjUK-3DlER3IkElUTkLtOphlh4WCEuXZw&oe=6797869E',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/456265947_1009782877602157_9161338289340093755_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zEoXGim9cVwQ7kNvgHHYu5Z&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=A-79vmEIA_tg7GgqwweWAkr&oh=00_AYC9mHzYWRaD_Atyy5-jy9SnIqBGORXJ6ZL-B7NtSjaWmw&oe=67977E10',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/449718573_979899253923853_4718006187882221121_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=WlBlZ8oo7PkQ7kNvgFzhcpr&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AlsvAY-ahAzeLLz80Z_Cdcu&oh=00_AYCIiuKMxuOORFzioMuO62Ruj_cUMsdcdZV89GfaYtkPIg&oe=67979099',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/449713720_979899270590518_5474337397041992579_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZxoW-hyhswQQ7kNvgH8KmQ1&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AXBrEcruk6T0qY2ijwD3W9X&oh=00_AYCm69e6JVAnoZkgONLCYFzpeMT9VoSR6YFd95LwYzP64g&oe=67976689',
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/449704301_979899413923837_1315159682671532994_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=T6Fu2Nh0LFYQ7kNvgH84VdF&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=AxiLX4LYYG6cLj0wmvzV156&oh=00_AYD3i7TBVAfLfnsTMCPtXKRu_0cLQoNq5Dz2A5kpjzRjvg&oe=67976988',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/449066491_976610827586029_4585114340470539701_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uBX8kLFHAf8Q7kNvgE3OmqQ&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AI4zD301a45Xty4-hvQQGrY&oh=00_AYALdfvI5i8QYwcIR_IdvzX4olXPMwoY3dDzgVgqDHVnIg&oe=67976812',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/427877796_946128357300943_8753425515088526433_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=43JZzHlKV6cQ7kNvgF-UrmA&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AUi8hOCC6bhdpZovZLOIp_U&oh=00_AYAe2XajStDcKqa6BA45zLIQhYg-0ugXm2GlJcDWUXCHKA&oe=679797A3',
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/426459532_946128380634274_3148836919500685012_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tFEyONPr-WEQ7kNvgH0kpvt&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=AtErWLvBDoYTYAeUYlilvwJ&oh=00_AYAPmjArAFr4myonnVYOHMuBqU2Xd5ndL53ie3BUbSHBnQ&oe=67976C23',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/434719844_924885056091940_1891237003018789257_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ktRnUcQux0gQ7kNvgGF-c68&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AAPZjfaJcHIUPwhIkkR0k73&oh=00_AYD8M9BMTP8CY7y0g0UyIFiWMBG6bKGKteZeJJ61kz0-2Q&oe=67977BD1',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/437870294_931316062115506_3858291590449891123_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=auyHhAi3piMQ7kNvgHxnKJr&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AyDomY0VAJg4t0O6byuygKG&oh=00_AYCTBo5bSoFQdiYkYfNcfJs67pj3PGKvNQyS9rPAUcLP9w&oe=67977CC0',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/437803524_931315992115513_8419240691515914648_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=mnSK2Mb-SC4Q7kNvgGkMoYP&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=Ad50vsm5z1rAVHMOg4EI1NW&oh=00_AYBgxpMN1TV3gSJX_d9V6CTjRkh2spyPozgQq4UhI89rlQ&oe=67976ECD',
        'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430139260_904118288168617_1833944898234247732_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=yj9V05_lx4UQ7kNvgFfymHe&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=AnObBhR09aQ2JlHfljeT5VM&oh=00_AYAyMRcOjNJx4W3hyFv61gN5avxJiRqG7BNIGGjZaxhHNw&oe=6797982E',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/434059878_914698660443913_379874392654340857_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cY8S5JQE0FcQ7kNvgHhmrNt&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AFPE1l92UTAQkqmbHGjtcv1&oh=00_AYDW5r-3KW1eVl3WvoUXJGFUbt5IDYpKcsgaCyMVGmfhOg&oe=67979477',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/432447478_914698950443884_3631998707211883397_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_POvGMXaT4QQ7kNvgEIe6_W&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=Al5uZaGTH8zpVucGxyzrai4&oh=00_AYDl4Yp82k258G6gJSlyVTLrB6G3btEajczZ63FLRhgMrg&oe=67977BB1',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/432447691_914698867110559_7963668398269230447_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XgStiUr3I3IQ7kNvgEQ1HZs&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AGyAYL2WJ1gNedQ1VH32DPl&oh=00_AYBwP8B4w-7H0z8_yznDHpTslBvRSctpz4V2qtQmVUSspw&oe=67976743',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/291157571_2971801006451282_6580980838190223871_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bAuTukp8lM8Q7kNvgH3sb-L&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AaXGG272TM07IwzA3Po7NzW&oh=00_AYCncsrScL7gQO2TBVCQnmgrmuE7i3MMvZKtQ-6UNmB-_g&oe=67978210',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/274937569_2884331558531561_3615932862098799291_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8NA4pxUEA7YQ7kNvgHJlKSz&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=Ayrc2QmojiUT7v9ry4fbOxL&oh=00_AYAzJ9C2NupeKN80CTuL9FrTN4Te8csWaAg1wUCkb-Nydg&oe=67977B04',
        'https://scontent.fmga3-2.fna.fbcdn.net/v/t39.30808-6/275002479_2884331581864892_656815714594778146_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=G5J3qqf5l8sQ7kNvgH69TZ7&_nc_zt=23&_nc_ht=scontent.fmga3-2.fna&_nc_gid=AMoL_2q3j48yxE_MfIvNdx7&oh=00_AYDIkc47s_Lesd_k6Rqlh227YUexUF1i33O_MIgKLTXDDg&oe=67978787',
      ];

  const [visibleImages, setVisibleImages] = useState(2); // Muestra inicialmente 3 imágenes
  const [isFullscreen, setIsFullscreen] = useState(false); // Estado para controlar la pantalla completa
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual en el carrusel

  const handleShowMore = () => {
    setVisibleImages((prev) => prev + 2);
  };

  const handleReset = () => {
    setVisibleImages(2);
  };

  // Función para activar el modo de pantalla completa con carrusel
  const handleFullscreen = (index) => {
    setCurrentImageIndex(index); // Establece la imagen actual
    setIsFullscreen(true); // Activa el modo de pantalla completa
  };

  // Función para cerrar la pantalla completa
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-lg md:text-xl text-center font-semibold text-gray-800 mb-6">ACTIVIDADES DE LOS ESTUDIANTES DEL CENTRO</h2>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 w-full lg:w-3/6 max-w-screen-xl">
        {allImages.slice(0, visibleImages).map((image, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all col-span-1 relative group">
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-center text-sm text-gray-700">Imagen {index + 1}</p>
            </div>
            <button
              onClick={() => handleFullscreen(index)}
              className="absolute top-2 right-2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {visibleImages < allImages.length && (
        <div className="mt-4">
          <button
            onClick={handleShowMore}
            className="bg-gray-900 text-white rounded p-3 hover:bg-gray-700 transition-colors"
          >
            Ver más
          </button>
        </div>
      )}

      {visibleImages > 3 && (
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white rounded p-3 hover:bg-gray-400 transition-colors"
          >
            Regresar al inicio
          </button>
        </div>
      )}

      {visibleImages >= allImages.length && (
        <div className="mt-4">
          <a
            href="https://www.facebook.com/CTJalapa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white rounded p-3 hover:bg-blue-500 transition-colors"
          >
            Sigue viendo más en nuestra página de Facebook
          </a>
        </div>
      )}

      {/* Pantalla completa con carrusel */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
          >
            ✕
          </button>

          <Carousel
            className="w-full max-w-4xl"
            opts={{
              startIndex: currentImageIndex, // Inicia en la imagen seleccionada
            }}
          >
            <CarouselContent>
              {allImages.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-[70vh] md:h-[80vh] object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors" />
            <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors" />
          </Carousel>
        </div>
      )}
    </div>
  );
}