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
  { code: 'FR', name: 'France', x: 60.4, y: 141.4, image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇫🇷', landmark: '🗼', description: 'La ville lumière et ses monuments emblématiques' },
  { code: 'IE', name: 'Irlande', x: 38.5, y: 121.6, image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇮🇪', landmark: '☘️', description: 'Les paysages verts et la culture irlandaise' },
  { code: 'UK', name: 'Angleterre', x: 52.8, y: 121.6, image: '/angleterre.jpg', flag: '🇬🇧', landmark: '🏰', description: 'Histoire, culture et charme britannique' },
  { code: 'ES', name: 'Espagne', x: 43.8, y: 168.6, image: '/tt.jpg', flag: '🇪🇸', landmark: '🏛️', description: 'Soleil, architecture et saveurs espagnoles' },
  { code: 'DE', name: 'Allemagne', x: 85.9, y: 126.1, image: '/allemagne.jpg', flag: '🇩🇪', landmark: '🏰', description: 'Châteaux médiévaux et culture allemande' },
  { code: 'IT', name: 'Italie', x: 85.4, y: 161.6, image: '/italie.jpg', flag: '🇮🇹', landmark: '🍕', description: 'Art, histoire et gastronomie italienne' },
  { code: 'JP', name: 'Japon', x: 165, y: 75, image: '/japon.jpg', flag: '🇯🇵', landmark: '🗻', description: 'Tradition japonaise et modernité' },
  { code: 'HG', name: 'Hongrie', x: 95, y: 142, image: '/hongrie.jpg', flag: '🇭🇺', landmark: '🏰', description: 'Culture et patrimoine hongrois' },
  { code: 'RT', name: 'Tchéquie', x: 88, y: 136, image: '/tchequie.jpg', flag: '🇨🇿', landmark: '🏰', description: 'Histoire et culture tchèque' },
  { code: 'BE', name: 'Belgique', x: 63, y: 126, image: '/belgique.jpg', flag: '🇧🇪', landmark: '🧇', description: 'Charme belge et architecture' },
  { code: 'GR', name: 'Grèce', x: 108, y: 170, image: '/grece.jpg', flag: '🇬🇷', landmark: '🏛️', description: 'Culture grecque et Méditerranée' },
  { code: 'MN', name: 'Monténégro', x: 104, y: 159, image: '/montenegro.jpg', flag: '🇲🇪', landmark: '🏰', description: 'Paysages montagneux et patrimoine historique' },
  { code: 'MCN', name: 'Macédoine du Nord', x: 110, y: 160, image: '/macedoine_du_nord.jpg', flag: '🇲🇰', landmark: '🏰', description: 'Culture et histoire balkanique' },
  { code: 'CR', name: 'Croatie', x: 96, y: 147, image: '/croatie.jpg', flag: '🇭🇷', landmark: '🏰', description: 'Mer Adriatique et villes historiques' },
  { code: 'PT', name: 'Portugal', x: 32, y: 165, image: '/portugal.jpg', flag: '🇵🇹', landmark: '🏖️', description: 'Soleil et culture portugaise' },
  { code: 'LT', name: 'Lettonie', x: 110, y: 102, image: '/lettonie.jpg', flag: '🇱🇻', landmark: '🏞️', description: 'Paysages verts et côtes de la mer Baltique' },
  { code: 'LTN', name: 'Lituanie', x: 106, y: 106, image: '/lituanie.jpg', flag: '🇱🇹', landmark: '🏞️', description: 'Forêts et patrimoine historique' },
  { code: 'SV', name: 'Slovénie', x: 94, y: 144, image: '/slovenie.jpg', flag: '🇸🇮', landmark: '🏔️', description: 'Montagnes, lacs et culture slovène' },
  { code: 'SB', name: 'Serbie', x: 105, y: 146, image: '/serbie.jpg', flag: '🇷🇸', landmark: '🏰', description: 'Histoire et culture serbe' },

  // Japon - îles principales
  { code: 'HK', name: 'Hokkaido', x: 173, y: 35, image: '/hokkaido.jpg', flag: '🇯🇵', landmark: '🏔️', description: 'Île nord du Japon' },
  { code: 'HN', name: 'Honshu', x: 167, y: 70, image: '/honshu.jpg', flag: '🇯🇵', landmark: '🏯', description: 'Île principale du Japon' },
  { code: 'SK', name: 'Shikoku', x: 171, y: 85, image: '/shikoku.jpg', flag: '🇯🇵', landmark: '🌉', description: 'Petite île au sud de Honshu' },
  { code: 'KY', name: 'Kyushu', x: 162, y: 88, image: '/kyushu.jpg', flag: '🇯🇵', landmark: '🌋', description: 'Île au sud-ouest du Japon' },
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
