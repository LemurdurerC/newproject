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
  { code: 'FR', name: 'France', x: 60.4, y: 141.4, image: 'https://i.imgur.com/NdBtDWD.jpeg' },
  { code: 'IE', name: 'Irlande', x: 38.5, y: 121.6, image: 'https://i.imgur.com/Su3UuU0.jpeg' },
  { code: 'UK', name: 'Angleterre', x: 52.8, y: 121.6, image: 'https://i.imgur.com/sl4g1yj.jpeg' },
  { code: 'ES', name: 'Espagne', x: 43.8, y: 168.6, image: 'https://i.imgur.com/oaQ5VwX.jpeg' },
  { code: 'DE', name: 'Allemagne', x: 85.9, y: 126.1, image: 'https://i.imgur.com/NQMoF5o.jpeg' },
  { code: 'IT', name: 'Italie', x: 85.4, y: 161.6, image: 'https://i.imgur.com/sBH1bsa.jpeg' },
  { code: 'JP', name: 'Japon', x: 178.6, y: 80, image: 'https://i.imgur.com/1EH37IZ.jpeg' },

  { code: 'HG', name: 'Hongrie', x: 102.4, y: 143.8, image: 'https://i.imgur.com/y15Fcjp.jpeg' },
  { code: 'RT', name: 'Tchéquie', x: 91, y: 133.7, image: 'https://i.imgur.com/VGr0c1b.jpeg' },
  { code: 'BE', name: 'Belgique', x: 66.7, y: 132.1, image: 'https://i.imgur.com/oCVy5Nz.jpeg' },
  { code: 'GR', name: 'Grèce', x: 115.9, y: 175.1, image: 'https://i.imgur.com/xyKCYdu.jpeg' },
  { code: 'MN', name: 'Monténégro', x: 103.6, y: 158.9, image: 'https://i.imgur.com/trVZW9m.jpeg' },
  { code: 'MCN', name: 'Macédoine du Nord', x: 110.1, y: 162.8, image: 'https://i.imgur.com/UUgCfQq.jpeg' },
  { code: 'CR', name: 'Croatie', x: 96.5, y: 157.4, image: 'https://i.imgur.com/TJAD374.jpeg' },
  { code: 'PT', name: 'Portugal', x: 30.6, y: 174, image: 'https://i.imgur.com/HoB4bGl.jpeg' },
  { code: 'LT', name: 'Lettonie', x: 116.2, y: 105.7, image: 'https://i.imgur.com/mjqhXDn.jpeg' },
  { code: 'LTN', name: 'Lituanie', x: 113.6, y: 115.2, image: 'https://i.imgur.com/6XpSOJT.jpeg' },
  { code: 'SV', name: 'Slovénie', x: 91.1, y: 147.3, image: 'https://i.imgur.com/sDL2rC9.jpeg' },
  { code: 'SB', name: 'Serbie', x: 107.3, y: 153.5, image: 'https://i.imgur.com/Ep6ohEH.jpeg' },
  { code: 'NL', name: 'Pays-Bas', x: 68, y: 124.2, image: 'https://i.imgur.com/t6llkQ2.jpeg' }
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
                  from="1"
                  to="3"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* point */}
              <circle
                cx={country.x}
                cy={country.y}
                r="1"
                fill="#a855f7"
              />
            </g>
          ))}
        </svg>

        {/* INFOS */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto">
          {selectedCountry ? (
            <div className="flex flex-col md:flex-row gap-6 items-center">
<img src={selectedCountry.image} alt={selectedCountry.name} className="w-full md:w-1/2 h-48 object-cover rounded-xl" />


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
