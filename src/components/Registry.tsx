import React from 'react';
import { Gift, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Registry = () => {
  const { t } = useLanguage();

  return (
    <section id="registry" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('registry.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-rose-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-200 overflow-hidden">
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900">
                Liste de Mariage
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Cadeaux choisis avec amour
              </p>

              <a href="https://www.exemple-liste-mariage.com/simon-talia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 text-green-600 hover:bg-green-50 border border-green-200 rounded-xl font-medium transition-all duration-300 group-hover:scale-105">
                Voir notre Liste
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-bl from-green-400 to-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registry;