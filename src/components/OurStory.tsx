import React, { useState } from 'react';
import { Heart, MapPin, Camera, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import mapSvg from './map.svg';

const OurStory = () => {
  const { t } = useLanguage();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // 🔥 Modal mobile

 const countries = [
  { code: 'FR', name: 'France', xDesktop: 33, yDesktop: 75, xMobile: 38, yMobile: 70, image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇫🇷', landmark: '🗼', description: 'La ville lumière et ses monuments emblématiques' },
  { code: 'IE', name: 'Irlande', xDesktop: 24, yDesktop: 66, xMobile: 28, yMobile: 62, image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇮🇪', landmark: '☘️', description: 'Les paysages verts et la culture irlandaise' },
  { code: 'UK', name: 'Angleterre', xDesktop: 30, yDesktop: 68, xMobile: 34, yMobile: 64, image: '/angleterre.jpg', flag: '🇬🇧', landmark: '🏰', description: 'Histoire, culture et charme britannique' },
  { code: 'ES', name: 'Espagne', xDesktop: 28, yDesktop: 89, xMobile: 12, yMobile: 45, image: '/tt.jpg', flag: '🇪🇸', landmark: '🏛️', description: 'Soleil, architecture et saveurs espagnoles' },
  { code: 'DE', name: 'Allemagne', xDesktop: 42, yDesktop: 67, xMobile: 46, yMobile: 63, image: '/allemagne.jpg', flag: '🇩🇪', landmark: '🏰', description: 'Châteaux médiévaux et culture allemande' },
  { code: 'IT', name: 'Italie', xDesktop: 41, yDesktop: 84, xMobile: 45, yMobile: 80, image: '/italie.jpg', flag: '🇮🇹', landmark: '🍕', description: 'Art, histoire et gastronomie italienne' },
  { code: 'JP', name: 'Japon', xDesktop: 77, yDesktop: 40, xMobile: 78, yMobile: 42, image: '/japon.jpg', flag: '🇯🇵', landmark: '🗻', description: 'Tradition japonaise et modernité' },
  { code: 'HG', name: 'Hongrie', xDesktop: 44, yDesktop: 79, xMobile: 48, yMobile: 75, image: '/hongrie.jpg', flag: '🇭🇺', landmark: '🏰', description: 'Culture et patrimoine hongrois' },
  { code: 'RT', name: 'Tchéquie', xDesktop: 44, yDesktop: 72, xMobile: 48, yMobile: 68, image: '/tchequie.jpg', flag: '🇨🇿', landmark: '🏰', description: 'Culture et patrimoine tchèque' },
  { code: 'BE', name: 'Belgique', xDesktop: 35, yDesktop: 71, xMobile: 39, yMobile: 67, image: '/belgique.jpg', flag: '🇧🇪', landmark: '🗼', description: 'Charme belge et architecture' },
  { code: 'GR', name: 'Grece', xDesktop: 52, yDesktop: 94, xMobile: 56, yMobile: 90, image: '/grece.jpg', flag: '🇬🇷', landmark: '🏛️', description: 'Culture grecque et soleil méditerranéen' },
  { code: 'MN', name: 'Monténégro', xDesktop: 44, yDesktop: 81, xMobile: 48, yMobile: 77, image: '/montenegro.jpg', flag: '🇲🇪', landmark: '🏰', description: 'Montagnes et mer Adriatique' },
  { code: 'MCN', name: 'Macédoine du Nord', xDesktop: 55, yDesktop: 81, xMobile: 58, yMobile: 77, image: '/macedoine_du_nord.jpg', flag: '🇲🇰', landmark: '🏰', description: 'Paysages et patrimoine nord-macédonien' },
  { code: 'CR', name: 'Croatie', xDesktop: 66, yDesktop: 81, xMobile: 70, yMobile: 77, image: '/croatie.jpg', flag: '🇭🇷', landmark: '🏰', description: 'Rivière et mer Adriatique' },
  { code: 'PT', name: 'Portugal', xDesktop: 22, yDesktop: 66, xMobile: 26, yMobile: 62, image: '/portugal.jpg', flag: '🇵🇹', landmark: '🏰', description: 'Soleil et culture portugaise' },
  { code: 'LT', name: 'Lettonie', xDesktop: 52, yDesktop: 56, xMobile: 56, yMobile: 52, image: '/lettonie.jpg', flag: '🇱🇻', landmark: '🏰', description: 'Nature et culture lettone' },
  { code: 'LTN', name: 'Lituanie', xDesktop: 50, yDesktop: 60, xMobile: 54, yMobile: 56, image: '/lituanie.jpg', flag: '🇱🇹', landmark: '🏰', description: 'Tradition et patrimoine lituanien' },
  { code: 'SV', name: 'Slovénie', xDesktop: 44, yDesktop: 83, xMobile: 48, yMobile: 79, image: '/slovenie.jpg', flag: '🇸🇮', landmark: '🏰', description: 'Montagnes et lacs slovènes' },
  { code: 'SB', name: 'Serbie', xDesktop: 50, yDesktop: 83, xMobile: 54, yMobile: 79, image: '/serbie.jpg', flag: '🇷🇸', landmark: '🏰', description: 'Histoire et nature serbe' },
];


  // 🔧 Petite fonction pour afficher la map
  const MapBlock = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div
      className={`relative w-full rounded-2xl overflow-hidden ${
        isMobile ? 'h-[60vh]' : 'aspect-[3/2] max-w-5xl mx-auto'
      } bg-gradient-to-br from-blue-50 to-green-50`}
      style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}
    >
      {/* Background map */}
      <div className="absolute inset-0 origin-center scale-125 md:scale-100 transition-transform duration-500">
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${mapSvg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30"></div>
      </div>

      {/* Points */}
      {countries.map((country) => {
        const left = isMobile ? country.xMobile : country.xDesktop;
        const top = isMobile ? country.yMobile : country.yDesktop;

        return (
          <div
            key={country.code}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            style={{ left: `${left}%`, top: `${top}%` }}
            onClick={() =>
              setHoveredCountry(hoveredCountry === country.code ? null : country.code)
            }
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                hoveredCountry === country.code
                  ? `bg-rose-500 shadow-lg ${
                      isMobile ? 'w-4 h-4 scale-150' : 'w-5 h-5 scale-150'
                    }`
                  : `bg-purple-400 hover:bg-rose-400 ${
                      isMobile ? 'w-2 h-2 hover:scale-125' : 'w-3 h-3 hover:scale-125'
                    }`
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full animate-ping bg-rose-400 opacity-20 ${
                  isMobile ? 'w-4 h-4' : 'w-5 h-5'
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // 🔧 Bloc image / détails pays
  const CountryInfoBlock = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div
      className={`mt-4 bg-gradient-to-br from-purple-50 to-rose-50 rounded-2xl p-4 transition-all duration-500 ${
        isMobile ? 'min-h-[150px]' : 'min-h-[300px]'
      }`}
    >
      {hoveredCountry ? (
        (() => {
          const country = countries.find((c) => c.code === hoveredCountry);
          if (!country) return null;

          return (
            <div className={`flex flex-col md:flex-row gap-4 items-center animate-in fade-in`}>
              <div
                className={`w-full md:w-1/2 ${
                  isMobile ? 'h-32' : 'h-64'
                } bg-gradient-to-br from-purple-100 via-rose-100 to-orange-100 rounded-xl overflow-hidden relative shadow-lg`}
              >
                <div className="fallback-emoji absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-5xl mb-1">{country.flag}</div>
                  <div className="text-3xl">{country.landmark}</div>
                </div>
                <img
                  src={country.image}
                  alt={country.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallback =
                      target.parentElement?.querySelector('.fallback-emoji');
                    if (fallback) {
                      (fallback as HTMLElement).style.display = 'none';
                    }
                    target.style.opacity = '1';
                  }}
                  style={{ opacity: 0, transition: 'opacity 0.5s' }}
                />
              </div>

              <div className={`w-full md:w-1/2 text-center md:text-left`}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {country.name}
                </h3>
                <p className="text-sm md:text-lg text-gray-600 mb-2">
                  {country.description}
                </p>
                <div className="flex items-center justify-center md:justify-start text-purple-500 text-sm md:text-base">
                  <Camera className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <span className="font-medium">Souvenir de voyage</span>
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="flex items-center justify-center h-full text-center">
          <div>
            <MapPin
              className={`${
                isMobile ? 'w-12 h-12' : 'w-16 h-16'
              } text-purple-300 mx-auto mb-2`}
            />
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-gray-500 font-medium`}>
              <span className="hidden sm:inline">Survolez</span>
              <span className="sm:hidden">Touchez</span> un point sur la carte
            </p>
            <p className="text-gray-400 mt-1 text-sm">Découvrez nos destinations</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="story" className="py-20 bg-gradient-to-br from-rose-50 via-purple-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nos Voyages Ensemble
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Bouton mobile */}
        <div className="sm:hidden text-center mb-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-xl shadow-md active:scale-95"
          >
            📍 Agrandir la carte
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden sm:block">
          <MapBlock isMobile={false} />
          <CountryInfoBlock isMobile={false} />
        </div>

        {/* MOBILE FULLSCREEN MODAL */}
        {isExpanded && (
          <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto animate-in fade-in">
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-lg shadow flex items-center gap-1 z-50"
            >
              <X className="w-4 h-4" /> Fermer
            </button>

            <div className="mt-10 pt-4">
              <MapBlock isMobile={true} />
              <CountryInfoBlock isMobile={true} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurStory;
