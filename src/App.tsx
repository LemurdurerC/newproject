import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Schedule from './components/Schedule';
import Venue from './components/Venue';
import RSVP from './components/RSVP';
import Registry from './components/Registry';
import Quiz from './components/Quiz';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  // Add error boundary
  try {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50">
        <Header />
        <main>
          <Hero />
          <OurStory />
          <Schedule />
          <Venue />
          <RSVP />
          <Registry />
          <Quiz />
          <Gallery />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
  } catch (error) {
    console.error('App error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Erreur de chargement</h1>
          <p className="text-gray-600">Une erreur s'est produite lors du chargement du site.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }
}

export default App;