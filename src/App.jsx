import React, { useState } from 'react';
import HealthWizard from './components/HealthWizard';

function App() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="bg-blue-900 text-white p-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">SilverHealth</h1>
        {showWizard && (
          <button 
            onClick={() => setShowWizard(false)}
            className="text-sm bg-blue-800 px-3 py-1 rounded hover:bg-blue-700"
          >
            Exit Check-up
          </button>
        )}
      </header>

      {/* MEDICAL DISCLAIMER BANNER */}
      <div className="bg-yellow-100 border-l-8 border-yellow-500 p-4" role="alert">
        <div className="flex">
          <div className="ml-3">
            <p className="text-xl text-yellow-800 font-bold">
              ⚠️ Not a Doctor / No soy Doctor
            </p>
            <p className="text-lg text-yellow-800 mt-1">
              This tool provides general information only. Always consult your physician.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SWAP */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        
        {/* CONDICIÓN: Si showWizard es true, mostramos el componente. Si no, la Landing Page */}
        {showWizard ? (
          <HealthWizard onReset={() => setShowWizard(false)} />
        ) : (
          <div className="text-center max-w-4xl">
            <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Welcome to your Daily Check-up
            </h2>
            
            <p className="text-2xl text-gray-700 mb-12">
              We will ask you 5 simple questions to prepare a report for your doctor.
              <br/>
              <span className="text-xl text-gray-500 mt-4 block">Large text • Easy to use • Private</span>
            </p>

            {/* HUGE START BUTTON */}
            <button 
              className="bg-blue-700 hover:bg-blue-800 text-white text-4xl font-bold py-10 px-20 rounded-3xl shadow-2xl transform transition hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={() => setShowWizard(true)}
            >
              START CHECK-UP ➤
            </button>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-gray-200 p-6 text-center text-lg text-gray-600">
        SilverHealth Companion © 2026 - Privacy First
      </footer>
    </div>
  );
}

export default App;