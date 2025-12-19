import React from 'react';
import { Heart, Mail, Phone, Instagram, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-purple-800 to-rose-800 text-white py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-400/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-10 w-20 h-20 bg-yellow-400/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-rose-300 to-purple-300 bg-clip-text text-transparent">
              
              {t('footer.contact')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start group">
                <Mail className="w-5 h-5 mr-3 text-purple-300 group-hover:text-purple-200 transition-colors duration-200" />
                <span className="group-hover:text-purple-200 transition-colors duration-200">mariage.simon.et.talia@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start group">
                <Phone className="w-5 h-5 mr-3 text-green-300 group-hover:text-green-200 transition-colors duration-200" />
                <span className="group-hover:text-green-200 transition-colors duration-200"> +33 6 11 43 83 42 Talia
                                        </span>

              </div>
              <div className="flex items-center justify-center md:justify-start group">
                <Phone className="w-5 h-5 mr-3 text-green-300 group-hover:text-green-200 transition-colors duration-200" />
                <span className="group-hover:text-green-200 transition-colors duration-200">
                                          +33 7 82 22 83 47 Simon</span>
              </div>
            
            </div>
          </div>

          {/* Wedding Date */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-rose-300 to-purple-300 bg-clip-text text-transparent">
              Simon & Talia
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-300" />
                <p className="text-xl font-medium text-purple-200">
                  {t('footer.date')}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-5 h-5 mr-2 text-green-300" />
                <p className="text-purple-200">
                 Domaine de Saint-Marc, Merry-sur-Yonne
                </p>
              </div>
              <div className="inline-flex items-center space-x-4 text-purple-300 mt-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-300"></div>
                <Heart className="w-4 h-4 text-rose-300 animate-pulse" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-300"></div>
              </div>
            </div>
          </div>

          {/* Wedding Quote */}
          <div className="text-center md:text-right">
            <div className="space-y-4">
              <p className="text-purple-100 italic leading-relaxed">
                "Amour n’est qu’un mot, jusqu’à ce que quelqu’un vienne lui donner un sens – Coelho"
              </p>
              <p className="text-sm text-purple-300">
                - Coelho
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-600/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-purple-200 text-sm">
                © 2025 Simon & Talia. Créé avec 💝 pour notre jour spécial.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="text-purple-300 hover:text-white transition-colors duration-200 text-sm">
                Politique de Confidentialité
              </button>
              <button className="text-purple-300 hover:text-white transition-colors duration-200 text-sm">
                Mentions Légales
              </button>
            </div>
          </div>
        </div>

        {/* Final decorative element */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
            <Heart className="w-6 h-6 text-rose-300 animate-pulse" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent via-rose-300 to-transparent"></div>
          </div>
          <p className="text-purple-200 text-sm mt-4 italic">
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;