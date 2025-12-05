import React, { useState } from 'react';
import { Send, CheckCircle, User, Mail, MessageSquare, Car, Utensils, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const RSVP = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    menu: 'classique',
    allergies: '',
    carpooling: 'no',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebug = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setDebugInfo([]);
    addDebug('Démarrage de la soumission...');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uurydcoxbcewzafbojru.supabase.co';
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1cnlkY294YmNld3phZmJvanJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5Mzk4MTgsImV4cCI6MjA3NTUxNTgxOH0.H_x2kJ9tBSfzO4sBbW-T9Pufil1Ew0hh3R64_ElTou8';

      addDebug('Envoi vers MySQL via Supabase Edge Function...');

      const apiUrl = `${supabaseUrl}/functions/v1/rsvp-mysql`;
      addDebug(`URL: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          attendance: formData.attendance,
          menu: formData.menu,
          allergies: formData.allergies,
          carpooling: formData.carpooling,
          message: formData.message,
        }),
      });

      addDebug(`Réponse: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        addDebug(`Erreur serveur: ${errorText}`);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      addDebug(`Succès! ID: ${result.id}`)

      // Generate WhatsApp link if carpooling is requested
      if (formData.carpooling === 'yes') {
        setWhatsappLink('https://chat.whatsapp.com/L6kszCLU8MR9amANYZYAGW');
      }

      addDebug('Soumission terminée avec succès!');
      setIsSubmitted(true);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur inconnue';
      addDebug(`ERREUR: ${errorMsg}`);
      alert(`Erreur: ${errorMsg}\n\nVérifiez les logs ci-dessous.`);
      saveToLocalStorage();
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocalStorage = () => {
    const rsvpData = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      attendance: formData.attendance,
      menu: formData.menu,
      allergies: formData.allergies,
      carpooling: formData.carpooling,
      message: formData.message,
      submitted_at: new Date().toISOString(),
      submitted_date: new Date().toLocaleDateString('fr-FR'),
      submitted_time: new Date().toLocaleTimeString('fr-FR'),
    };
    
    // Save to localStorage as backup
    const existingRSVPs = JSON.parse(localStorage.getItem('rsvpResponses') || '[]');
    existingRSVPs.push(rsvpData);
    localStorage.setItem('rsvpResponses', JSON.stringify(existingRSVPs));
    console.log('RSVP saved to localStorage:', rsvpData);
  };


  // Remove the old localStorage-based functions
  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: formData.name,
      email: formData.email,
      attendance: formData.attendance,
      menu: formData.menu,
      allergies: formData.allergies,
      carpooling: formData.carpooling,
      message: formData.message,
    });
    setWhatsappLink('https://chat.whatsapp.com/L6kszCLU8MR9amANYZYAGW');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  if (isSubmitted) {
    const isAttending = formData.attendance === 'yes';
    return (
      <section id="rsvp" className="py-20 bg-gradient-to-br from-purple-50 via-rose-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className={`w-20 h-20 mx-auto mb-8 animate-bounce ${isAttending ? 'text-green-500' : 'text-gray-400'}`} />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('rsvp.success')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {isAttending
              ? 'Nous avons reçu votre confirmation et nous réjouissons de célébrer avec vous !'
              : 'Nous sommes navré de votre absence'
            }
          </p>

         

          {whatsappLink && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 mb-2">
                Groupe Covoiturage
              </h3>
              <p className="text-green-700 mb-4 text-sm">
                Rejoignez notre groupe WhatsApp pour organiser le covoiturage
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Rejoindre le groupe
              </a>
            </div>
          )}

          <button
            onClick={resetForm}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-rose-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-rose-600 transition-all duration-300 shadow-lg"
          >
            Nouvelle réponse
          </button>

          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-purple-400 mx-auto mt-8 rounded-full"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-br from-purple-50 via-rose-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('rsvp.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('rsvp.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-rose-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-3">
                  <User className="w-5 h-5 mr-2 text-purple-500" />
                  {t('rsvp.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 font-medium mb-3">
                  <Mail className="w-5 h-5 mr-2 text-rose-500" />
                  {t('rsvp.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3">
                {t('rsvp.form.attendance')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-green-50 transition-colors duration-200">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                    formData.attendance === 'yes' 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.attendance === 'yes' && (
                      <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-700">Oui, je serai présent.e</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-red-50 transition-colors duration-200">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                    formData.attendance === 'no' 
                      ? 'border-red-500 bg-red-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.attendance === 'no' && (
                      <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                    )}
                  </div>
                  <span className="text-gray-700">Désolé.e, je ne peux pas venir</span>
                </label>
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <>
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-3">
                    <Utensils className="w-5 h-5 mr-2 text-orange-500" />
                    {t('rsvp.form.menu')}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors duration-200">
                      <input
                        type="radio"
                        name="menu"
                        value="classique"
                        checked={formData.menu === 'classique'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        formData.menu === 'classique' 
                          ? 'border-orange-500 bg-orange-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.menu === 'classique' && (
                          <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                        )}
                      </div>
                      <div className="min-w-0">
                      <div>
                        <span className="text-gray-700 font-medium block">Menu Classique</span>
                        <p className="text-sm text-gray-500 leading-tight">Viande, poisson, accompagnements traditionnels</p>
                      </div>
                        </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-green-50 transition-colors duration-200">
                      <input
                        type="radio"
                        name="menu"
                        value="jardin"
                        checked={formData.menu === 'jardin'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        formData.menu === 'jardin' 
                          ? 'border-green-500 bg-green-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.menu === 'jardin' && (
                          <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium block">Menu Jardin</span>
                        <p className="text-sm text-gray-500 leading-tight">Végétarien, légumes de saison, créatif</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    {t('rsvp.form.allergies')}
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Indiquez vos allergies, intolérances ou régimes spéciaux..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    <Car className="w-5 h-5 inline mr-2 text-blue-500" />
                    Covoiturage
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                      <input
                        type="radio"
                        name="carpooling"
                        value="yes"
                        checked={formData.carpooling === 'yes'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        formData.carpooling === 'yes' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.carpooling === 'yes' && (
                          <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                        )}
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Oui, je souhaite covoiturer</span>
                        <p className="text-sm text-gray-500">Accès au groupe WhatsApp</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <input
                        type="radio"
                        name="carpooling"
                        value="no"
                        checked={formData.carpooling === 'no'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        formData.carpooling === 'no' 
                          ? 'border-gray-500 bg-gray-500' 
                          : 'border-gray-300'
                      }`}>
                        {formData.carpooling === 'no' && (
                          <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                        )}
                      </div>
                      <span className="text-gray-700">Non, j'ai mon transport</span>
                    </label>
                  </div>
                </div>

      
              </>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-rose-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5 mr-2" />
                {isLoading ? 'Envoi en cours...' : t('rsvp.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVP;