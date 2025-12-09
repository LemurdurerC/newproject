import React, { useState } from 'react';
import { Heart, MapPin, Camera, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import mapSvg from './map.svg';

const OurStory = () => {
  const { t } = useLanguage();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // 🔥 Modal mobile

  const countries = [
    {
      code: 'FR',
      name: 'France',
      x: 31,
      y: 72,
      image:
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      flag: '🇫🇷',
      landmark: '🗼',
      description: 'La ville lumière et ses monuments emblématiques',
    },
    {
      code: 'IE',
      name: 'Ireland',
      x: 22,
      y: 65,
      image:
        'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      flag: '🇮🇪',
      landmark: '☘️',
      description: 'Les paysages verts et la culture irlandaise',
    },
    {
      code: 'UK',
      name: 'United Kingdom',
      x: 25,
      y: 57,
      image:
        'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      flag: '🇬🇧',
      landmark: '🏰',
      description: 'Histoire, culture et charme britannique',
    },
    {
      code: 'ES',
      name: 'Spain',
      x: 25,
      y: 87,
      image: '/tt.jpg',
      flag: '🇪🇸',
      landmark: '🏛️',
      description: 'Soleil, architecture et saveurs espagnoles',
    },
    {
      code: 'DE',
      name: 'Germany',
      x: 38,
      y: 66,
      image:
        'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      flag: '🇩🇪',
      landmark: '🏰',
      description: 'Châteaux médiévaux et culture allemande',
    },
    {
      code: 'IT',
      name: 'Italy',
      x: 40,
      y: 82,
      image:
        'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      flag: '🇮🇹',
      landmark: '🍕',
      description: 'Art, histoire et gastronomie italienne',
    },
    {
      code: 'JP',
      name: 'Japan',
      x: 97,
      y: 20,
      image:
        'https://images.pexels.com/photos/2901269/pexels-photo-2901269.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      flag: '🇯🇵',
      landmark: '🗻',
      description: 'Tradition japonaise et modernité',
    },
  ];

  // 🔧 Petite fonction pour afficher la map (réutilisée dans la version desktop + modal)
  const MapBlock = () => (
    <div className="relative w-full aspect-[3/2] max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden"
      style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>

      {/* Background map */}
      <div className="absolute inset-0 origin-center scale-125 md:scale-100 transition-transform duration-500">
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${mapSvg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30"></div>
      </div>

      {/* Points */}
      {countries.map((country) => (
        <div
          key={country.code}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
          style={{ left: `${country.x}%`, top: `${country.y}%` }}
          onClick={() =>
            setHoveredCountry(hoveredCountry === country.code ? null : country.code)
          }
        >
          <div
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
              hoveredCountry === country.code
                ? 'bg-rose-500 scale-150 shadow-lg'
                : 'bg-purple-400 hover:bg-rose-400 hover:scale-125'
            }`}
          >
            <div className="absolute inset-0 rounded-full animate-ping bg-rose-400 opacity-20"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // 🔧 Bloc image / détails pays
  const CountryInfoBlock = () => (
    <div className="mt-8 bg-gradient-to-br from-purple-50 to-rose-50 rounded-2xl p-6 min-h-[300px] transition-all duration-500">
      {hoveredCountry ? (
        (() => {
          const country = countries.find((c) => c.code === hoveredCountry);
          if (!country) return null;

          return (
            <div className="flex flex-col md:flex-row gap-6 items-center animate-in fade-in">
              <div className="w-full md:w-1/2 h-64 bg-gradient-to-br from-purple-100 via-rose-100 to-orange-100 rounded-xl overflow-hidden relative shadow-lg">
                <div className="fallback-emoji absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-7xl mb-2">{country.flag}</div>
                  <div className="text-5xl">{country.landmark}</div>
                </div>
                <img
                  src={country.image}
                  alt={country.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallback = target.parentElement?.querySelector('.fallback-emoji');
                    if (fallback) {
                      (fallback as HTMLElement).style.display = 'none';
                    }
                    target.style.opacity = '1';
                  }}
                  style={{ opacity: 0, transition: 'opacity 0.5s' }}
                />
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">{country.name}</h3>
                <p className="text-lg text-gray-600 mb-4">{country.description}</p>
                <div className="flex items-center justify-center md:justify-start text-purple-500">
                  <Camera className="w-5 h-5 mr-2" />
                  <span className="text-base font-medium">Souvenir de voyage</span>
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="flex items-center justify-center h-64 text-center">
          <div>
            <MapPin className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 font-medium">
              <span className="hidden sm:inline">Survolez</span>
              <span className="sm:hidden">Touchez</span> un point sur la carte
            </p>
            <p className="text-gray-400 mt-2">Découvrez nos destinations</p>
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
          {MapBlock()}
          {CountryInfoBlock()}
        </div>

        {/* MOBILE FULLSCREEN MODAL */}
        {isExpanded && (
          <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto animate-in fade-in">
            
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-lg shadow flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Fermer
            </button>

            <div className="mt-10">
              {MapBlock()}
              {CountryInfoBlock()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurStory;
