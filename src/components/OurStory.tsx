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
  { code: 'FR', name: 'France', x: 62, y: 136, image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇫🇷', landmark: '🗼', description: 'La ville lumière et ses monuments emblématiques' },
  { code: 'IE', name: 'Irlande', x: 40, y: 119, image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', flag: '🇮🇪', landmark: '☘️', description: 'Les paysages verts et la culture irlandaise' },
  { code: 'UK', name: 'Angleterre', x: 46, y: 102, image: '/angleterre.jpg', flag: '🇬🇧', landmark: '🏰', description: 'Histoire, culture et charme britannique' },
  { code: 'ES', name: 'Espagne', x: 49, y: 157, image: '/tt.jpg', flag: '🇪🇸', landmark: '🏛️', description: 'Soleil, architecture et saveurs espagnoles' },
  { code: 'DE', name: 'Allemagne', x: 72, y: 121, image: '/allemagne.jpg', flag: '🇩🇪', landmark: '🏰', description: 'Châteaux médiévaux et culture allemande' },
  { code: 'IT', name: 'Italie', x: 73, y: 150, image: '/italie.jpg', flag: '🇮🇹', landmark: '🍕', description: 'Art, histoire et gastronomie italienne' },
  { code: 'JP', name: 'Japon', x: 167, y: 75, image: '/japon.jpg', flag: '🇯🇵', landmark: '🗻', description: 'Tradition japonaise et modernité' },
  { code: 'HG', name: 'Hongrie', x: 97, y: 143, image: '/hongrie.jpg', flag: '🇭🇺', landmark: '🏰', description: 'Culture et patrimoine hongrois' },
  { code: 'RT', name: 'Tchéquie', x: 88, y: 137, image: '/tchequie.jpg', flag: '🇨🇿', landmark: '🏰', description: 'Histoire et culture tchèque' },
  { code: 'BE', name: 'Belgique', x: 63, y: 129, image: '/belgique.jpg', flag: '🇧🇪', landmark: '🧇', description: 'Charme belge et architecture' },
  { code: 'GR', name: 'Grèce', x: 107, y: 170, image: '/grece.jpg', flag: '🇬🇷', landmark: '🏛️', description: 'Culture grecque et Méditerranée' },
  { code: 'MN', name: 'Monténégro', x: 105, y: 160, image: '/montenegro.jpg', flag: '🇲🇪', landmark: '🏰', description: 'Paysages montagneux et patrimoine historique' },
  { code: 'MCN', name: 'Macédoine du Nord', x: 111, y: 160, image: '/macedoine_du_nord.jpg', flag: '🇲🇰', landmark: '🏰', description: 'Culture et histoire balkanique' },
  { code: 'CR', name: 'Croatie', x: 96, y: 148, image: '/croatie.jpg', flag: '🇭🇷', landmark: '🏰', description: 'Mer Adriatique et villes historiques' },
  { code: 'PT', name: 'Portugal', x: 31, y: 164, image: '/portugal.jpg', flag: '🇵🇹', landmark: '🏖️', description: 'Soleil et culture portugaise' },
  { code: 'LT', name: 'Lettonie', x: 111, y: 103, image: '/lettonie.jpg', flag: '🇱🇻', landmark: '🏞️', description: 'Paysages verts et côtes de la mer Baltique' },
  { code: 'LTN', name: 'Lituanie', x: 107, y: 107, image: '/lituanie.jpg', flag: '🇱🇹', landmark: '🏞️', description: 'Forêts et patrimoine historique' },
  { code: 'SV', name: 'Slovénie', x: 95, y: 145, image: '/slovenie.jpg', flag: '🇸🇮', landmark: '🏔️', description: 'Montagnes, lacs et culture slovène' },
  { code: 'SB', name: 'Serbie', x: 106, y: 147, image: '/serbie.jpg', flag: '🇷🇸', landmark: '🏰', description: 'Histoire et culture serbe' },
];

const OurStory = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

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
      {countries.map((country) => (
        <div
          key={country.code}
          className="absolute cursor-pointer"
          style={{
            left: `${country.x}px`,
            top: `${country.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => setSelectedCountry(country)}
        >
          {/* Halo */}
          <div className="w-6 h-6 bg-pink-500 opacity-25 rounded-full animate-pulse absolute -top-1.5 -left-1.5"></div>
          {/* Point */}
          <div className="w-2.5 h-2.5 bg-purple-500 rounded-full relative z-10"></div>
        </div>
      ))}
    </div>
  );

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

        {/* MAP BLOCK */}
        <MapBlock />

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
