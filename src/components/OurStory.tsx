import React, { useState } from 'react';
import { MapPin, Camera } from 'lucide-react';
import mapSvg from './map.svg';

type Country = {
  code: string;
  name: string;
  x: number;
  y: number;
  image: string;
  flag: string;
  landmark: string;
  description: string;
};

const countries: Country[] = [
  {
    code: 'FR',
    name: 'France',
    x: 64.0,
    y: 145.0,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
    flag: '🇫🇷',
    landmark: '🗼',
    description: 'La ville lumière et ses monuments emblématiques',
  },
  {
    code: 'IE',
    name: 'Irlande',
    x: 36.0,
    y: 121.0,
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg',
    flag: '🇮🇪',
    landmark: '☘️',
    description: 'Les paysages verts et la culture irlandaise',
  },
  {
    code: 'UK',
    name: 'Angleterre',
    x: 45.0,
    y: 107.0,
    image: '/angleterre.jpg',
    flag: '🇬🇧',
    landmark: '🏰',
    description: 'Histoire, culture et charme britannique',
  },
  {
    code: 'ES',
    name: 'Espagne',
    x: 46.0,
    y: 163.0,
    image: '/tt.jpg',
    flag: '🇪🇸',
    landmark: '🏛️',
    description: 'Soleil, architecture et saveurs espagnoles',
  },
  {
    code: 'DE',
    name: 'Allemagne',
    x: 71.0,
    y: 124.0,
    image: '/allemagne.jpg',
    flag: '🇩🇪',
    landmark: '🏰',
    description: 'Châteaux médiévaux et culture allemande',
  },
  {
    code: 'IT',
    name: 'Italie',
    x: 75.0,
    y: 153.0,
    image: '/italie.jpg',
    flag: '🇮🇹',
    landmark: '🍕',
    description: 'Art, histoire et gastronomie italienne',
  },
  {
    code: 'JP',
    name: 'Japon',
    x: 168.0,
    y: 72.0,
    image: '/japon.jpg',
    flag: '🇯🇵',
    landmark: '🗻',
    description: 'Tradition japonaise et modernité',
  },
  {
    code: 'BE',
    name: 'Belgique',
    x: 63.0,
    y: 125.0,
    image: '/belgique.jpg',
    flag: '🇧🇪',
    landmark: '🧇',
    description: 'Charme belge et architecture',
  },
  {
    code: 'PT',
    name: 'Portugal',
    x: 33.0,
    y: 165.0,
    image: '/portugal.jpg',
    flag: '🇵🇹',
    landmark: '🏖️',
    description: 'Soleil et culture portugaise',
  },
  {
    code: 'GR',
    name: 'Grèce',
    x: 109.0,
    y: 172.0,
    image: '/grece.jpg',
    flag: '🇬🇷',
    landmark: '🏛️',
    description: 'Culture grecque et Méditerranée',
  },
  {
    code: 'CR',
    name: 'Croatie',
    x: 96.5,
    y: 148.0,
    image: '/croatie.jpg',
    flag: '🇭🇷',
    landmark: '🏰',
    description: 'Mer Adriatique et villes historiques',
  },
  {
    code: 'HG',
    name: 'Hongrie',
    x: 97.5,
    y: 143.0,
    image: '/hongrie.jpg',
    flag: '🇭🇺',
    landmark: '🏰',
    description: 'Culture et patrimoine hongrois',
  },
];



const OurStory = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <section
      id="story"
      className="py-20 bg-gradient-to-br from-rose-50 via-purple-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Nos Voyages Ensemble
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-purple-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* MAP SVG */}
        <svg
          viewBox="0 0 215.86 186.82"
          className="w-full max-w-5xl mx-auto h-auto rounded-2xl shadow-lg bg-white"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Carte */}
          <image
            href={mapSvg}
            x="0"
            y="0"
            width="215.86"
            height="186.82"
          />

          {/* Points */}
          {countries.map((country) => (
            <g
              key={country.code}
              className="cursor-pointer"
              onClick={() => setSelectedCountry(country)}
            >
              {/* halo */}
              <circle
                cx={country.x}
                cy={country.y}
                r="6"
                fill="#f43f5e"
                opacity="0.25"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="8"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* point */}
              <circle
                cx={country.x}
                cy={country.y}
                r="2.5"
                fill="#a855f7"
              />
            </g>
          ))}
        </svg>

        {/* INFOS */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto">
          {selectedCountry ? (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img
                src={selectedCountry.image}
                alt={selectedCountry.name}
                className="w-full md:w-1/2 h-48 object-cover rounded-xl"
              />

              <div>
                <h3 className="text-3xl font-bold mb-2">
                  {selectedCountry.name} {selectedCountry.flag}
                </h3>
                <p className="text-gray-600 mb-3">
                  {selectedCountry.description}
                </p>
                <div className="flex items-center text-purple-500">
                  <Camera className="w-5 h-5 mr-2" />
                  Souvenir de voyage
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <MapPin className="w-10 h-10 mx-auto mb-2" />
              Cliquez sur un point pour découvrir un voyage
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default OurStory;
