import React, { useState, useEffect } from 'react';
import { Heart, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-07-11T14:30:00');

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed md:bg-fixed bg-no-repeat"
        style={{
          backgroundImage: 'url(https://mariage-simon-talia.bolt.host/6.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-900/20"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-rose-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-400/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-16 w-18 h-18 bg-green-400/20 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <Heart className="w-16 h-16 mx-auto mb-6 text-rose-300 animate-pulse" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wide">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-rose-100 font-light tracking-wider">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="mb-12 animate-slide-up">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 mr-2 text-rose-300" />
            <span className="text-lg md:text-xl text-white font-medium">
              {t('hero.date')}
            </span>
          </div>
          
          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
            {[
              { label: t('hero.countdown.days'), value: timeLeft.days },
              { label: t('hero.countdown.hours'), value: timeLeft.hours },
              { label: t('hero.countdown.minutes'), value: timeLeft.minutes },
              { label: t('hero.countdown.seconds'), value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-2 border border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-sm text-rose-100 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-delayed">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6"></div>
          <p className="text-rose-100 italic text-lg">
            "Le bonheur n’est réel que lors qu’il est partagé" - Into the wild"
          </p>
        </div>
      </div>

      {/* Scroll indicator */}

    </section>
  );
};

export default Hero;