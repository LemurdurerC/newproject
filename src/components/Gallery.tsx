import React, { useState } from 'react';
import { Camera, Lock, Upload, Eye, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, this would be handled securely)
    if (password === 'SimonTalia2026') {
      setIsUnlocked(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const galleryImages = [
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/1024984/pexels-photo-1024984.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  ];

  if (!isUnlocked) {
    return (
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-xl text-center max-w-md mx-auto">
            <Lock className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('gallery.password')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-rose-500 text-white font-bold py-3 rounded-xl hover:from-purple-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {t('gallery.enter')}
              </button>
            </form>
            
            <p className="text-sm text-gray-400 mt-4">
              Mot de passe de test : SimonTalia2026
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-rose-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t('gallery.upload')}
            </h3>
            <p className="text-gray-600 mb-6">
              Partagez vos plus beaux moments avec nous
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-rose-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-rose-600 transition-all duration-300 shadow-lg">
              <Camera className="w-5 h-5 mr-2" />
              Choisir des Photos
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full-size image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Gallery"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{galleryImages.length}</div>
              <div className="text-sm text-gray-500">Photos</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">∞</div>
              <div className="text-sm text-gray-500">Souvenirs</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto" />
              <div className="text-sm text-gray-500">Amour</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;