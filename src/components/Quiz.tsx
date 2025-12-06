import React, { useState } from 'react';
import { Brain, Trophy, Heart, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Quiz = () => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    {
      question: "Quelle est la date de notre rencontre ?",
      options: ["Juillet 2014", "Juillet 2015", "Juillet 2016", "Juillet 2017"],
      correct: 0
    },
    {
      question: "Quand a-t-on emménagé ensemble ?",
      options: ["Septembre 2020", "Septembre 2021", "Juin 2022", "Juin 2023"],
      correct: 1
    },
    {
      question: "Quel est le nombre total de jeux de cartes dans la collection ?",
      options: ["101 – 150", "151 – 200", "201 – 250", "251 - 300"],
      correct: 3
    },
    {
      question: "Quel est votre jeu de société préféré ? (On sait, ça change tout le temps)",
      options: ["Splendor", "The Crew", "Unlock", "7 Wonders Duel"],
      correct: 3
    },
    {
      question: "Dans quelle ville n'a-t-on pas fait d'Escape Game parmi les villes suivantes ?",
      options: ["Lisbonne", "Prague", "Vilnius", "Zagreb"],
      correct: 1
    },
    {
      question: "A quelle altitude Talia a-t-elle dit oui ?",
      options: ["35m", "1 909m", "3 776m", "8 849m"],
      correct: 2
    },
    {
      question: "Si Simon quittait son travail, que préférerait-il ouvrir ?",
      options: ["Un escape game", "Une cave à vodka", "Un bar à jeux", "Une librairie franco-japonaise"],
      correct: 2
    },
    {
      question: "Combien de pays a-t-on visité ensemble en Europe (en comptant la France) ?",
      options: ["13 pays", "15 pays", "17 pays", "19 pays"],
      correct: 2
    }
  ];

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email) {
      setShowUserForm(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex.toString()];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach((q, index) => {
        if (parseInt(newAnswers[index]) === q.correct) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setShowResults(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const quizData = {
      name: userInfo.name,
      email: userInfo.email,
      score: score,
      total_questions: questions.length,
      answers: answers,
    };

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rsvp-mysql/quiz`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(quizData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Erreur lors de la sauvegarde:', result);
        alert('Erreur lors de la sauvegarde des résultats');
      } else {
        console.log('Quiz results saved:', result);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setShowUserForm(true);
    setUserInfo({ name: '', email: '' });
    setScore(0);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section id="quiz" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-8 animate-bounce" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Merci {userInfo.name} !
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Vos résultats ont été sauvegardés. Nous partagerons les scores avec tous les invités après le mariage !
          </p>
          <button
            onClick={resetQuiz}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 shadow-lg"
          >
            Refaire le Quiz
          </button>
        </div>
      </section>
    );
  }

  if (showUserForm) {
    return (
      <section id="quiz" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Quizz des Mariés
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quizz des mariés - à quel point nous connaissez-vous ?
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-md mx-auto">
            <div className="text-center mb-8">
              <Brain className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Avant de commencer...
              </h3>
              <p className="text-gray-600">
                Dites-nous qui vous êtes pour sauvegarder vos résultats
              </p>
            </div>
            
            <form onSubmit={handleUserInfoSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Prénom et Nom
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Email
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 rounded-xl hover:from-orange-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Commencer le Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  if (showResults) {
    return (
      <section id="quiz" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Résultats du Quiz
            </h2>
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-gray-600">
              {score >= 6 ? "Excellent ! Vous connaissez très bien Simon & Talia !" :
               score >= 4 ? "Bien joué ! Vous en savez pas mal sur nos mariés." :
               "Pas mal ! Il vous reste encore des choses à découvrir sur Simon & Talia."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Confirmez vos résultats
            </h3>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                <strong>{userInfo.name}</strong> ({userInfo.email})
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isLoading ? 'Sauvegarde en cours...' : 'Sauvegarder mes Résultats'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Quizz des Mariés
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quizz des mariés - à quel point nous connaissez-vous ?
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Question {currentQuestion + 1} sur {questions.length}</span>
              <span className="text-sm text-gray-500">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-12">
            <Brain className="w-12 h-12 text-orange-500 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
              {questions[currentQuestion].question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="group p-6 text-left border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg text-gray-700 group-hover:text-gray-900 font-medium">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;