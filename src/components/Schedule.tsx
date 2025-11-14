import React, { useState } from 'react';
import { Clock, MapPin, Users, Music, Utensils, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Schedule = () => {
  const { t } = useLanguage();
  const [activeEvent, setActiveEvent] = useState(0);

  const events = [
    {
      title: t('schedule.opening.title'),
      time: '15h30',
      duration: '',
      description: t('schedule.opening.description'),
      icon: Users,
      color: 'green',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      title: t('schedule.ceremony.title'),
      time: '16h00',
      duration: '',
      description: t('schedule.ceremony.description'),
      icon: Heart,
      color: 'rose',
      gradient: 'from-rose-400 to-pink-500',
    },
    {
      title: t('schedule.cocktail.title'),
      time: '17h00',
      duration: '',
      description: t('schedule.cocktail.description'),
      icon: Music,
      color: 'purple',
      gradient: 'from-purple-400 to-violet-500',
    },
    {
      title: t('schedule.dinner.title'),
      time: '20h00',
      duration: '',
      description: t('schedule.dinner.description'),
      icon: Utensils,
      color: 'orange',
      gradient: 'from-orange-400 to-yellow-500',
    },
  ];

  return (
    <section id="schedule" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('schedule.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('schedule.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-purple-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Interactive Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-gray-100">
            {/* Timeline Header */}
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-purple-500" />
                <span className="text-lg font-medium text-gray-700">11 juillet 2026</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-200 via-rose-200 via-purple-200 to-orange-200 rounded-full"></div>

              {/* Events */}
              <div className="space-y-6 md:space-y-12">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'
                    }`}
                    onMouseEnter={() => setActiveEvent(index)}
                  >
                    {/* Event Card */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} mb-4 md:mb-0`}>
                      <div className={`group cursor-pointer transition-all duration-500 ${
                        activeEvent === index 
                          ? 'transform scale-105' 
                          : 'hover:transform hover:scale-102'
                      }`}>
                        <div className={`bg-gradient-to-br ${event.gradient} p-6 rounded-2xl shadow-lg text-white relative overflow-hidden`}>
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center mb-4">
                              <event.icon className="w-8 h-8 mr-3" />
                              <div>
                                <h3 className="text-lg md:text-xl font-bold">{event.title}</h3>
                                <div className="flex items-center space-x-2 text-white/90">
                                  <span className="text-base md:text-lg font-medium">{event.time}</span>
                                  <span className="text-sm">{event.duration}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm md:text-base text-white/90 leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${event.gradient} border-4 border-white shadow-lg transition-all duration-300 ${
                        activeEvent === index ? 'scale-150' : 'hover:scale-125'
                      }`}>
                        <div className="absolute inset-0 rounded-full animate-ping bg-white opacity-20"></div>
                      </div>
                    </div>

                    {/* Empty Space */}
                    <div className="hidden md:block md:w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;