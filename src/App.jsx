import React, { useState } from 'react';
import './App.css';
import NewWizard from './components/NewWizard';

function App() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4 md:p-5 lg:p-6 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">SilverHealth</h1>
        </div>
        {showWizard && (
          <button
            onClick={() => setShowWizard(false)}
            className="w-full sm:w-auto text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 font-medium"
          >
            Salir del Chequeo
          </button>
        )}
      </header>

      {/* MEDICAL DISCLAIMER BANNER */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-3 sm:p-4 md:p-5 shadow-sm" role="alert">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-base sm:text-lg text-amber-900 font-bold mb-1">
              ADVERTENCIA:
            </p>
            <p className="text-sm sm:text-base text-amber-800">
              Esta herramienta proporciona información general únicamente, no consejos médicos. Siempre consulte con su médico.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SWAP */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">

        {showWizard ? (
          <NewWizard onReset={() => setShowWizard(false)} />
        ) : (
          <div className="text-center max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-0 animate-slide-up">
            <div className="mb-8 inline-block">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 sm:p-5 md:p-6 rounded-3xl shadow-lg">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-blue-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Bienvenido a tu Chequeo Fácil
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
              Cuestionario de salud y longevidad para generar un análisis personalizado con IA (32 preguntas). No se requieren datos personales.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-lg text-gray-600 mb-12">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Texto grande
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Fácil de usar
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Privado
              </span>
            </div>

            {/* HUGE START BUTTON */}
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-5 sm:py-7 md:py-8 lg:py-10 px-8 sm:px-12 md:px-16 lg:px-20 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-blue-300 group"
              onClick={() => setShowWizard(true)}
            >
              <span className="flex items-center justify-center gap-4">
                INICIAR CUESTIONARIO
                <svg className="w-10 h-10 group-hover:translate-x-2 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </span>
            </button>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-5 md:p-6 text-center border-t border-gray-200">
        <p className="text-sm sm:text-base text-gray-600">
          <span className="font-semibold text-gray-800">SilverHealth</span> © 2026 · Tu privacidad es nuestra prioridad
        </p>
      </footer>
    </div>
  );
}

export default App;
 