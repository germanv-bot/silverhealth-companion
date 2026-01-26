import { generateDoctorReport, getDietRecommendations } from '../utils/healthLogic';
import React, { useState } from 'react';

export default function HealthWizard({ onReset }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    waist: '',
    conditions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConditionToggle = (condition) => {
    setFormData(prev => {
      const exists = prev.conditions.includes(condition);
      return {
        ...prev,
        conditions: exists
          ? prev.conditions.filter(c => c !== condition)
          : [...prev.conditions, condition]
      };
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6 inline-block bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-2xl">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Paso 1: Tu Edad</h3>
            <label className="block text-lg sm:text-xl text-gray-700 mb-6 font-medium">¿Cuántos años tienes?</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:w-48 text-3xl sm:text-4xl md:text-5xl p-4 sm:p-5 md:p-6 border-4 border-blue-300 rounded-2xl text-center focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-lg bg-gradient-to-br from-white to-blue-50"
              placeholder="65"
            />
          </div>
        );
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6 inline-block bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">Paso 2: Peso</h3>
            <label className="block text-lg sm:text-xl text-gray-700 mb-6 font-medium">Ingresa tu peso (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:w-48 text-3xl sm:text-4xl md:text-5xl p-4 sm:p-5 md:p-6 border-4 border-green-300 rounded-2xl text-center focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all shadow-lg bg-gradient-to-br from-white to-green-50"
              placeholder="70"
            />
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6 inline-block bg-gradient-to-br from-purple-100 to-violet-100 p-4 rounded-2xl">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm3.293 7.707a1 1 0 011.414 0L9 12.086l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">Paso 3: Altura</h3>
            <label className="block text-lg sm:text-xl text-gray-700 mb-6 font-medium">Ingresa tu altura (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:w-48 text-3xl sm:text-4xl md:text-5xl p-4 sm:p-5 md:p-6 border-4 border-purple-300 rounded-2xl text-center focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all shadow-lg bg-gradient-to-br from-white to-purple-50"
              placeholder="170"
            />
          </div>
        );
      case 3:
        return (
          <div className="text-center animate-fade-in">
            <div className="mb-6 inline-block bg-gradient-to-br from-orange-100 to-amber-100 p-4 rounded-2xl">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">Paso 4: Cintura</h3>
            <label className="block text-lg sm:text-xl text-gray-700 mb-2 font-medium">Circunferencia de la cintura (cm)</label>
            <p className="text-gray-500 mb-6 text-lg">(Medir alrededor del ombligo)</p>
            <input
              type="number"
              name="waist"
              value={formData.waist}
              onChange={handleChange}
              className="max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:w-48 text-3xl sm:text-4xl md:text-5xl p-4 sm:p-5 md:p-6 border-4 border-orange-300 rounded-2xl text-center focus:border-orange-600 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-lg bg-gradient-to-br from-white to-orange-50"
              placeholder="95"
            />
          </div>
        );
      case 4:
        return (
          <div className="text-center w-full max-w-full sm:max-w-xl md:max-w-2xl animate-fade-in">
            <div className="mb-6 inline-block bg-gradient-to-br from-rose-100 to-pink-100 p-4 rounded-2xl">
              <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">Paso 5: Condiciones</h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 font-medium">Selecciona las que apliquen a ti:</p>
            <div className="space-y-4">
              {[
                { key: 'Diabetes (Tipo 1 o 2)', label: 'Diabetes (Tipo 1 o 2)', icon: '💉' },
                { key: 'Hipertensión (Presión Alta)', label: 'Hipertensión (Presión Alta)', icon: '❤️' },
                { key: 'Colesterol Alto', label: 'Colesterol Alto', icon: '🩸' },
                { key: 'Ninguna de las anteriores', label: 'Ninguna de las anteriores', icon: '✨' }
              ].map((cond) => (
                <div
                  key={cond.key}
                  onClick={() => handleConditionToggle(cond.key)}
                  className={`p-4 sm:p-5 border-3 rounded-2xl cursor-pointer flex items-center transition-all duration-200 transform hover:scale-102 ${
                    formData.conditions.includes(cond.key)
                    ? 'border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 shadow-lg scale-102'
                    : 'border-gray-200 hover:border-rose-300 hover:shadow-md bg-white'
                  }`}
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl mr-4 flex items-center justify-center transition-all ${
                    formData.conditions.includes(cond.key) ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-md' : 'bg-gray-100'
                  }`}>
                    {formData.conditions.includes(cond.key) ? (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <span className="text-2xl">{cond.icon}</span>
                    )}
                  </div>
                  <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">{cond.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        const report = generateDoctorReport(formData);
        const dietTips = getDietRecommendations(formData.conditions);

        return (
          <div className="text-left w-full max-w-full sm:max-w-3xl md:max-w-4xl animate-fade-in pb-8">
            <div className="text-center mb-10">
              <div className="mb-4 inline-block bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">Chequeo Completado</h3>
              <p className="text-xl text-gray-600">
                Por favor, muestra esta pantalla a tu médico
              </p>
            </div>

            {/* TARJETA 1: REPORTE MÉDICO (AZUL) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8 rounded-3xl border-2 border-blue-200 mb-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="text-3xl font-bold text-blue-900">Resumen Médico</h4>
              </div>
              <ul className="space-y-5">
                {report.map((item, idx) => (
                  <li key={idx} className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                    <strong className="block text-lg sm:text-xl md:text-2xl text-gray-900 mb-3 font-bold">{item.title}</strong>
                    <span className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">{item.content}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TARJETA 2: DIETA (VERDE) */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 md:p-8 rounded-3xl border-2 border-green-200 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 pb-4 border-b-2 border-green-200">
                <div className="bg-green-600 p-3 rounded-xl">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h4 className="text-3xl font-bold text-green-900">Nutrición Para Ti</h4>
              </div>
              <ul className="space-y-4">
                {dietTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl text-green-900 font-medium leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BOTÓN REINICIAR */}
            <div className="text-center mt-12">
              <button
                onClick={onReset}
                className="w-full sm:w-auto group text-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-600 hover:to-indigo-600 text-gray-700 hover:text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                  Iniciar Nuevo Chequeo
                </span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto p-2 sm:p-3 md:p-4">
      {/* Progreso */}
      <div className="w-full bg-gray-200 h-3 rounded-full mb-10 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-500 rounded-full shadow-md"
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      {/* Contador de pasos */}
      {step < 5 && (
        <div className="mb-6 text-center">
          <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-5 py-2 rounded-full text-lg font-bold shadow-sm">
            Paso {step + 1} de 5
          </span>
        </div>
      )}

      {/* Contenido del Paso */}
      <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl w-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] flex flex-col items-center justify-center border-2 border-gray-100">
        {renderStep()}
      </div>

      {/* Botones de Navegación */}
      <div className="flex flex-col-reverse sm:flex-row justify-between w-full mt-6 sm:mt-8 md:mt-10 gap-3 sm:gap-4">
        <button
          onClick={prevStep}
          disabled={step === 0 || step === 5}
          className={`w-full sm:w-auto group text-lg sm:text-xl md:text-2xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 font-bold rounded-xl transition-all duration-200 ${
            step === 0 || step === 5
              ? 'opacity-0 invisible'
              : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
            ATRÁS
          </span>
        </button>

        {step < 5 && (
          <button
            onClick={nextStep}
            className="w-full sm:w-auto group text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 sm:px-10 md:px-12 lg:px-14 py-3 sm:py-4 md:py-5 font-bold rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-3xl"
          >
            <span className="flex items-center justify-center gap-3">
              SIGUIENTE
              <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}