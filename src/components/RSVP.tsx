import React, { useState } from 'react';
import { Send, CheckCircle, User, Mail, MessageSquare, Car, Utensils, Users, Download, Eye } from 'lucide-react';
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
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [rsvpData, setRsvpData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
    menuClassique: 0,
    menuJardin: 0,
    carpooling: 0,
  });
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
        setWhatsappLink('https://chat.whatsapp.com/invite/covoiturage-simon-talia-2026');
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

  const loadRSVPData = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uurydcoxbcewzafbojru.supabase.co';

      // Try to load from server
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/rsvp-mysql`, {
          method: 'GET',
          headers: {
            'X-Admin-Password': 'AdminSimonTalia2026',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setRsvpData(data.rsvps);
        setStats(data.stats);
        return;
      } catch (serverError) {
        console.warn('Server load failed, falling back to localStorage:', serverError);
      }
      
      // Fallback to localStorage
      const localData = JSON.parse(localStorage.getItem('rsvpResponses') || '[]');
      setRsvpData(localData);
      
      // Calculate stats from local data
      const localStats = {
        total: localData.length,
        attending: localData.filter((r: any) => r.attendance === 'yes').length,
        notAttending: localData.filter((r: any) => r.attendance === 'no').length,
        menuClassique: localData.filter((r: any) => r.menu === 'classique' && r.attendance === 'yes').length,
        menuJardin: localData.filter((r: any) => r.menu === 'jardin' && r.attendance === 'yes').length,
        carpooling: localData.filter((r: any) => r.carpooling === 'yes').length,
      };
      setStats(localStats);
      
    } catch (error) {
      console.error('Error loading RSVP data:', error);
      alert('Erreur lors du chargement des données');
    }
  };

  const handleAdminAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (adminPassword === 'AdminSimonTalia2026') {
      setIsLoading(true);
      await loadRSVPData();
      setShowAdmin(true);
      setAdminPassword(''); // Clear password for security
      setIsLoading(false);
    } else {
      alert('Mot de passe incorrect');
      setAdminPassword('');
    }
  };

  const exportToExcel = async () => {
    try {
      // Dynamic import of XLSX
      const XLSX = await import('xlsx');
      
      if (rsvpData.length === 0) {
        alert('Aucune réponse RSVP à exporter');
        return;
      }

      // Prepare data for Excel
      const excelData = rsvpData.map((rsvp: any) => ({
        'Nom': rsvp.name,
        'Email': rsvp.email,
        'Présence': rsvp.attendance === 'yes' ? 'Oui' : 'Non',
        'Menu': rsvp.attendance === 'yes' ? (rsvp.menu === 'classique' ? 'Menu Classique' : 'Menu Jardin') : '-',
        'Allergies/Régimes': rsvp.allergies || 'Aucune',
        'Covoiturage': rsvp.carpooling === 'yes' ? 'Oui' : 'Non',
        'Message': rsvp.message || '',
        'Date de soumission': rsvp.submitted_date,
        'Heure de soumission': rsvp.submitted_time,
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);
      
      // Auto-size columns
      const colWidths = [
        { wch: 25 }, // Nom
        { wch: 30 }, // Email
        { wch: 10 }, // Présence
        { wch: 15 }, // Menu
        { wch: 30 }, // Allergies
        { wch: 12 }, // Covoiturage
        { wch: 40 }, // Message
        { wch: 15 }, // Date
        { wch: 15 }, // Heure
      ];
      ws['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(wb, ws, 'Réponses RSVP');
      
      // Generate filename with current date
      const filename = `RSVP_Simon_Talia_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Save file
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Erreur lors de l\'export Excel');
    }
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
    setWhatsappLink('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Admin panel
  if (showAdmin) {
    return (
      <section id="rsvp" className="py-20 bg-gradient-to-br from-purple-50 via-rose-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Administration RSVP
            </h2>
            <p className="text-xl text-gray-600">
              Gestion des réponses de présence
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-rose-400 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
              <div className="text-sm text-gray-500">Présents</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-red-600">{stats.notAttending}</div>
              <div className="text-sm text-gray-500">Absents</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.menuClassique}</div>
              <div className="text-sm text-gray-500">Menu Classique</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.menuJardin}</div>
              <div className="text-sm text-gray-500">Menu Jardin</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.carpooling}</div>
              <div className="text-sm text-gray-500">Covoiturage</div>
            </div>
          </div>

          {/* Export Button */}
          <div className="text-center mb-8">
            <button
              onClick={exportToExcel}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg mr-4"
            >
              <Download className="w-5 h-5 mr-2" />
              Exporter en Excel
            </button>
            <button
              onClick={() => setShowAdmin(false)}
              className="inline-flex items-center px-6 py-3 bg-gray-500 text-white font-medium rounded-xl hover:bg-gray-600 transition-all duration-300"
            >
              Retour au formulaire
            </button>
            <button
              onClick={loadRSVPData}
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-xl hover:bg-blue-600 transition-all duration-300 ml-4"
            >
              Actualiser les données
            </button>
          </div>

          {/* RSVP List */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Liste des réponses ({rsvpData.length})
            </h3>
            
            {rsvpData.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucune réponse pour le moment</p>
                <p className="text-gray-400 text-sm mt-2">
                  Les réponses apparaîtront ici une fois que les invités auront rempli le formulaire
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Nom</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Présence</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Menu</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Allergies</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Covoiturage</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Message</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvpData.map((rsvp: any) => (
                      <tr key={rsvp.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium">{rsvp.name}</td>
                        <td className="py-3 px-2 text-gray-600">{rsvp.email}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rsvp.attendance === 'yes' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {rsvp.attendance === 'yes' ? 'Oui' : 'Non'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-600">
                          {rsvp.attendance === 'yes' ? (rsvp.menu === 'classique' ? 'Classique' : 'Jardin') : '-'}
                        </td>
                        <td className="py-3 px-2 text-gray-600 max-w-xs truncate">
                          {rsvp.allergies || '-'}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rsvp.carpooling === 'yes' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {rsvp.carpooling === 'yes' ? 'Oui' : 'Non'}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-gray-600 max-w-xs truncate">
                          {rsvp.message || '-'}
                        </td>
                        <td className="py-3 px-2 text-gray-500 text-xs">
                          {rsvp.submitted_date}<br />
                          <span className="text-gray-400">{rsvp.submitted_time}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 bg-gradient-to-br from-purple-50 via-rose-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-8 animate-bounce" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('rsvp.success')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Nous avons reçu votre confirmation et nous réjouissons de célébrer avec vous !
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
                  <span className="text-gray-700">Oui, je serai présent(e)</span>
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
                  <span className="text-gray-700">Désolé(e), je ne peux pas venir</span>
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
                      <div>
                        <span className="text-gray-700 font-medium block">Menu Classique</span>
                        <p className="text-sm text-gray-500 leading-tight">Viande, poisson, accompagnements traditionnels</p>
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

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-3">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-500" />
                    Message pour les mariés (optionnel)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Un petit mot pour Simon & Talia..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                  />
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

        {/* Admin Access */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Accès Administrateur</h3>
            <form onSubmit={handleAdminAccess} className="space-y-4">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Mot de passe admin"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg"
                disabled={isLoading}
              >
                <Eye className="w-5 h-5 mr-2" />
                {isLoading ? 'Chargement...' : 'Accéder aux réponses'}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              Mot de passe : AdminSimonTalia2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;