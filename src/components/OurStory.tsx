import React, { useState } from 'react';
import { MapPin, Camera, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import mapSvg from './map.svg';

const OurStory = () => {
  const { t } = useLanguage();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const countries = [
    { code: 'FR', name: 'France', x: 31, y: 72, image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇫🇷', landmark: '🗼', description: 'La ville lumière et ses monuments emblématiques' },
    { code: 'IE', name: 'Ireland', x: 22, y: 65, image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇮🇪', landmark: '☘️', description: 'Les paysages verts et la culture irlandaise' },
    { code: 'UK', name: 'United Kingdom', x: 25, y: 57, image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇬🇧', landmark: '🏰', description: 'Histoire, culture et charme britannique' },
    { code: 'ES', name: 'Spain', x: 25, y: 87, image: '/tt.jpg', flag: '🇪🇸', landmark: '🏛️', description: 'Soleil, architecture et saveurs espagnoles' },
    { code: 'DE', name: 'Germany', x: 38, y: 66, image: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇩🇪', landmark: '🏰', description: 'Châteaux médiévaux et culture allemande' },
    { code: 'IT', name: 'Italy', x: 40, y: 82, image: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇮🇹', landmark: '🍕', description: 'Art, histoire et gastronomie italienne' },
    { code: 'JP', name: 'Japan', x: 97, y: 20, image: 'https://images.pexels.com/photos/2901269/pexels-photo-2901269.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇯🇵', landmark: '🗻', description: 'Tradition japonaise et modernité' },
  ];

  const MapBlock = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    const handleTouchStart = (e: React.TouchEvent) => {
      const touch = e.touches[0];
      setLastTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isMobile) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;
      setLastTouch({ x: touch.clientX, y: touch.clientY });
      setPosition((prev) => ({
        x: Math.min(120, Math.max(-120, prev.x + deltaX)),
        y: Math.min(120, Math.max(-120, prev.y + deltaY)),
      }));
    };

    return (
      <div
        className="relative w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden touch-pan-y"
        style={{ aspectRatio: '16/9' }}
      >
        <div
          className="absolute inset-0 transition-none"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="absolute inset-0 origin-center scale-125 md:scale-100">
            <div className="absolute inset-0 bg-no-repeat bg-center bg-contain" style={{ backgroundImage: `url(${mapSvg})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30"></div>
          </div>
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
      </div>
    );
  };

  const CountryInfoBlock = () => (
    <div className="mt-4 bg-gradient-to-br from-purple-50 to-rose-50 rounded-2xl p-4 min-h-[180px] transition-all duration-500">
      {hoveredCountry ? (() => {
        const country = countries.find((c) => c.code === hoveredCountry);
        if (!country) return null;
        return (
          <div className="flex flex-col md:flex-row gap-4 items-center animate-in fade-in">
            <div className="w-full md:w-1/3 h-32 bg-gradient-to-br from-purple-100 via-rose-100 to-orange-100 rounded-xl overflow-hidden relative shadow-lg">
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
                  const fallback = target.parentElement?.querySelector('.fallback-emoji');
                  if (fallback) (fallback as HTMLElement).style.display = 'none';
                  target.style.opacity = '1';
                }}
                style={{ opacity: 0, transition: 'opacity 0.5s' }}
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{country.name}</h3>
              <p className="text-md text-gray-600 mb-2">{country.description}</p>
              <div className="flex items-center justify-center md:justify-start text-purple-500">
                <Camera className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Souvenir de voyage</span>
              </div>
            </div>
          </div>
        );
      })() : (
        <div className="flex items-center justify-center h-32 text-center">
          <div>
            <MapPin className="w-12 h-12 text-purple-300 mx-auto mb-2" />
            <p className="text-md text-gray-500 font-medium">
              <span className="hidden sm:inline">Survolez</span>
              <span className="sm:hidden">Touchez</span> un point sur la carte
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="story" className="py-12 bg-gradient-to-br from-rose-50 via-purple-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Nos Voyages Ensemble</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="sm:hidden text-center mb-4">
          <button
            onClick={() => setIsExpanded(true)}
            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-xl shadow-md active:scale-95"
          >
            📍 Agrandir la carte
          </button>
        </div>

        <div className="hidden sm:block">
          {MapBlock()}
          {CountryInfoBlock()}
        </div>

        {isExpanded && (
          <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto animate-in fade-in">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-lg shadow flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Fermer
            </button>
            <div className="mt-4">
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
