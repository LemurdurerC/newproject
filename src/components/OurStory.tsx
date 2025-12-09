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
