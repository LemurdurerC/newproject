import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.story': 'Notre Histoire',
    'nav.schedule': 'Programme',
    'nav.venue': 'Lieu & Logistique',
    'nav.rsvp': 'RSVP',
    'nav.registry': 'Liste de Mariage',
    'nav.quiz': 'Quiz',
    'nav.gallery': 'Galerie',
    
    // Hero
    'hero.title': 'Simon & Talia',
    'hero.subtitle': ' ',
    'hero.date': '11 juillet 2026',
    'hero.countdown.days': 'jours',
    'hero.countdown.hours': 'heures',
    'hero.countdown.minutes': 'minutes',
    'hero.countdown.seconds': 'secondes',
    
    // Our Story
    'story.title': ' ',
    'story.subtitle': ' ',
    'story.travels.title': 'Nos Voyages Ensemble',
    'story.travels.subtitle': 'Découvrez les pays que nous avons explorés main dans la main',
    'story.meeting.title': 'Première Rencontre',
    'story.meeting.date': 'Été 2022',
    'story.meeting.text': 'Nos regards se sont croisés lors d\'un festival de musique au coucher du soleil. Entre les notes de jazz et l\'odeur des lavandes, nous avons su que c\'était le début de quelque chose de magique. Depuis, nous n\'avons cessé d\'explorer le monde ensemble, créant des souvenirs précieux dans chaque pays visité.',
    'story.engagement.title': 'Fiançailles',
    'story.engagement.date': 'Printemps 2024',
    'story.engagement.text': 'Sous un cerisier en fleurs, Simon a demandé à Talia de l\'épouser. Avec un "oui" radieux, notre aventure vers ce jour spécial a commencé.',
    'story.wedding.title': 'Le Grand Jour',
    'story.wedding.date': '11 juillet 2026',
    'story.wedding.text': 'Nous avons hâte de célébrer notre union entourés de nos proches dans un cadre champêtre et bohème.',
    
    // Schedule
    'schedule.title': 'Le Jour J',
    'schedule.subtitle': 'Le programme',
    'schedule.opening.title': 'Ouverture des portes',
    'schedule.opening.description': 'Arrivée et accueil des invités sur les lieux avant la cérémonie laïque',
    'schedule.ceremony.title': 'Cérémonie Laïque',
    'schedule.ceremony.description': 'Echange des vœux au bord de l’Yonne',
    'schedule.cocktail.title': 'Vin d’honneur',
    'schedule.cocktail.description': 'Pièces de cocktail, animations culinaires et ludiques en extérieur',
    'schedule.dinner.title': 'Dîner & Soirée',
    'schedule.dinner.description': 'Dansons ensemble jusqu’au bout de la nuit !',
    
    // Venue
    'venue.title': 'Lieu & Logistique',
    'venue.subtitle': 'Tout ce que vous devez savoir',
    'venue.location.title': 'Lieux de Célébration',
    'venue.hotels.title': 'Hébergements Recommandés',
    'venue.transport.title': 'Comment Venir',
    'venue.parking.title': 'Stationnement',
    
    // RSVP
    'rsvp.title': 'Confirmez votre Présence',
    'rsvp.subtitle': 'Nous avons hâte de célébrer avec vous',
    'rsvp.form.name': 'Nom complet',
    'rsvp.form.email': 'Email',
    'rsvp.form.attendance': 'Présence confirmée',
    'rsvp.form.menu': 'Choix du menu',
    'rsvp.form.allergies': 'Allergies ou régimes spéciaux',
    'rsvp.form.transport': 'Besoin de transport',
    'rsvp.form.message': 'Message pour les mariés',
    'rsvp.form.submit': 'Confirmer ma Présence !',
    'rsvp.success': 'Merci pour votre confirmation !',
    
    // Registry
    'registry.title': 'Liste de Mariage',
    'registry.subtitle': 'Votre générosité nous touche profondément',
    'registry.description': 'Pour ceux qui souhaitent nous gâter, nous avons préparé une liste avec amour.',
    'registry.link': 'Voir notre Liste',
    
    // Gallery
    'gallery.title': 'Galerie Privée',
    'gallery.subtitle': 'Partagez vos souvenirs avec nous',
    'gallery.password': 'Mot de passe',
    'gallery.enter': 'Accéder',
    'gallery.upload': 'Partager une Photo',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.date': '11 juillet 2026',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.story': 'Our Story',
    'nav.schedule': 'Schedule',
    'nav.venue': 'Venue & Logistics',
    'nav.rsvp': 'RSVP',
    'nav.registry': 'Registry',
    'nav.quiz': 'Quizz',
    'nav.gallery': 'Gallery',
    
    // Hero
    'hero.title': 'Simon & Talia',
    'hero.subtitle': 'Celebrating our love',
    'hero.date': 'July 11, 2026',
    'hero.countdown.days': 'days',
    'hero.countdown.hours': 'hours',
    'hero.countdown.minutes': 'minutes',
    'hero.countdown.seconds': 'seconds',
    
    // Our Story
    'story.title': 'Our Story',
    'story.subtitle': 'How it all began',
    'story.travels.title': 'Our Travels Together',
    'story.travels.subtitle': 'Discover the countries we\'ve explored hand in hand',
    'story.meeting.title': 'First Meeting',
    'story.meeting.date': 'Summer 2022',
    'story.meeting.text': 'Our eyes met at a music festival at sunset. Between jazz notes and lavender scents, we knew it was the beginning of something magical. Since then, we haven\'t stopped exploring the world together, creating precious memories in every country visited.',
    'story.engagement.title': 'Engagement',
    'story.engagement.date': 'Spring 2024',
    'story.engagement.text': 'Under a blooming cherry tree, Simon asked Talia to marry him. With a radiant "yes", our journey to this special day began.',
    'story.wedding.title': 'The Big Day',
    'story.wedding.date': 'July 11, 2026',
    'story.wedding.text': 'We can\'t wait to celebrate our union surrounded by loved ones in a bohemian countryside setting.',
    
    // Schedule
    'schedule.title': 'Schedule',
    'schedule.subtitle': 'Your guide to this magical day',
    'schedule.opening.title': 'Opening & Welcome',
    'schedule.opening.description': 'Guest arrival, welcome drinks in the estate gardens',
    'schedule.ceremony.title': 'Civil Ceremony',
    'schedule.ceremony.description': 'Exchange of vows in a romantic setting facing the Burgundy vineyards',
    'schedule.cocktail.title': 'Cocktail & Entertainment',
    'schedule.cocktail.description': 'Cocktail reception, live music, games and entertainment in the gardens',
    'schedule.dinner.title': 'Dinner & Party',
    
    // Venue
    'venue.title': 'Venue & Logistics',
    'venue.subtitle': 'Everything you need to know',
    'venue.location.title': 'Celebration Venues',
    'venue.hotels.title': 'Recommended Hotels',
    'venue.transport.title': 'How to Get There',
    'venue.parking.title': 'Parking',
    
    // RSVP
    'rsvp.title': 'RSVP',
    'rsvp.subtitle': 'We can\'t wait to celebrate with you',
    'rsvp.form.name': 'Full Name',
    'rsvp.form.email': 'Email',
    'rsvp.form.attendance': 'Attendance confirmed',
    'rsvp.form.menu': 'Menu choice',
    'rsvp.form.allergies': 'Allergies or special diets',
    'rsvp.form.transport': 'Need transportation',
    'rsvp.form.message': 'Message for the couple',
    'rsvp.form.submit': 'Confirm Attendance',
    'rsvp.success': 'Thank you for your confirmation!',
    
    // Registry
    'registry.title': 'Wedding Registry',
    'registry.subtitle': 'Your generosity touches us deeply',
    'registry.description': 'For those who wish to spoil us, we\'ve lovingly prepared a list.',
    'registry.link': 'View our Registry',
    
    // Gallery
    'gallery.title': 'Private Gallery',
    'gallery.subtitle': 'Share your memories with us',
    'gallery.password': 'Password',
    'gallery.enter': 'Enter',
    'gallery.upload': 'Share a Photo',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.date': 'July 11, 2026',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}