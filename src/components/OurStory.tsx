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

const countries = [
  { code: 'FR', name: 'France', x: 66, y: 130, image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇫🇷', landmark: '🗼', description: 'Paris, capitale française' },
  { code: 'IE', name: 'Irlande', x: 40, y: 115, image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇮🇪', landmark: '☘️', description: 'Dublin, capitale irlandaise' },
  { code: 'UK', name: 'Angleterre', x: 44, y: 108, image: '/angleterre.jpg', flag: '🇬🇧', landmark: '🏰', description: 'Londres, capitale anglaise' },
  { code: 'ES', name: 'Espagne', x: 51, y: 155, image: '/tt.jpg', flag: '🇪🇸', landmark: '🏛️', description: 'Madrid, capitale espagnole' },
  { code: 'DE', name: 'Allemagne', x: 73, y: 117, image: '/allemagne.jpg', flag: '🇩🇪', landmark: '🏰', description: 'Berlin, capitale allemande' },
  { code: 'IT', name: 'Italie', x: 74, y: 147, image: '/italie.jpg', flag: '🇮🇹', landmark: '🍕', description: 'Rome, capitale italienne' },
  { code: 'JP', name: 'Japon', x: 168, y: 77, image: '/japon.jpg', flag: '🇯🇵', landmark: '🗻', description: 'Tokyo, capitale japonaise' },
  { code: 'HG', name: 'Hongrie', x: 95, y: 140, image: '/hongrie.jpg', flag: '🇭🇺', landmark: '🏰', description: 'Budapest, capitale hongroise' },
  { code: 'RT', name: 'Tchéquie', x: 88, y: 134, image: '/tchequie.jpg', flag: '🇨🇿', landmark: '🏰', description: 'Prague, capitale tchèque' },
  { code: 'BE', name: 'Belgique', x: 63, y: 124, image: '/belgique.jpg', flag: '🇧🇪', landmark: '🧇', description: 'Bruxelles, capitale belge' },
  { code: 'GR', name: 'Grèce', x: 107, y: 167, image: '/grece.jpg', flag: '🇬🇷', landmark: '🏛️', description: 'Athènes, capitale grecque' },
  { code: 'MN', name: 'Monténégro', x: 104, y: 157, image: '/montenegro.jpg', flag: '🇲🇪', landmark: '🏰', description: 'Podgorica, capitale monténégrine' },
  { code: 'MCN', name: 'Macédoine du Nord', x: 110, y: 158, image: '/macedoine_du_nord.jpg', flag: '🇲🇰', landmark: '🏰', description: 'Skopje, capitale macédonienne' },
  { code: 'CR', name: 'Croatie', x: 96, y: 145, image: '/croatie.jpg', flag: '🇭🇷', landmark: '🏰', description: 'Zagreb, capitale croate' },
  { code: 'PT', name: 'Portugal', x: 33, y: 160, image: '/portugal.jpg', flag: '🇵🇹', landmark: '🏖️', description: 'Lisbonne, capitale portugaise' },
  { code: 'LT', name: 'Lettonie', x: 110, y: 100, image: '/lettonie.jpg', flag: '🇱🇻', landmark: '🏞️', description: 'Riga, capitale lettone' },
  { code: 'LTN', name: 'Lituanie', x: 106, y: 104, image: '/lituanie.jpg', flag: '🇱🇹', landmark: '🏞️', description: 'Vilnius, capitale lituanienne' },
  { code: 'SV', name: 'Slovénie', x: 94, y: 142, image: '/slovenie.jpg', flag: '🇸🇮', landmark: '🏔️', description: 'Ljubljana, capitale slovène' },
  { code: 'SB', name: 'Serbie', x: 105, y: 144, image: '/serbie.jpg', flag: '🇷🇸', landmark: '🏰', description: 'Belgrade, capitale serbe' },

  // Japon - capitales des îles (Tokyo pour Honshu, approximations pour les autres)
  { code: 'HK', name: 'Hokkaido', x: 173, y: 35, image: '/hokkaido.jpg', flag: '🇯🇵', landmark: '🏔️', description: 'Sapporo, capitale d’Hokkaido' },
  { code: 'HN', name: 'Honshu', x: 168, y: 74, image: '/honshu.jpg', flag: '🇯🇵', landmark: '🏯', description: 'Tokyo, capitale du Japon' },
  { code: 'SK', name: 'Shikoku', x: 171, y: 85, image: '/shikoku.jpg', flag: '🇯🇵', landmark: '🌉', description: 'Matsuyama, capitale régionale' },
  { code: 'KY', name: 'Kyushu', x: 162, y: 88, image: '/kyushu.jpg', flag: '🇯🇵', landmark: '🌋', description: 'Fukuoka, capitale régionale' },
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
          className="w-full max-w-5xl mx-auto h-auto rounded-2xl shadow-lg bg-white bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden"
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
