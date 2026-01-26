import { generateDoctorReport, getDietRecommendations } from '../utils/healthLogic';
import React, { useState } from 'react';

export default function HealthWizard({ onReset }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    waist: '',
    conditions: [] // Array para guardar condiciones seleccionadas
  });

  // Manejador de cambios en inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejador para checkboxes (Condiciones)
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

  // Navegación
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // --- UI DE CADA PASO ---
  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Step 1: Your Age</h3>
            <label className="block text-xl text-gray-700 mb-4">How old are you?</label>
            <input 
              type="number" 
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-40 text-4xl p-4 border-4 border-blue-300 rounded-xl text-center focus:border-blue-600 outline-none"
              placeholder="65"
            />
          </div>
        );
      case 1:
        return (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Step 2: Weight</h3>
            <label className="block text-xl text-gray-700 mb-4">Enter your weight (kg)</label>
            <input 
              type="number" 
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-40 text-4xl p-4 border-4 border-blue-300 rounded-xl text-center focus:border-blue-600 outline-none"
              placeholder="70"
            />
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Step 3: Height</h3>
            <label className="block text-xl text-gray-700 mb-4">Enter your height (cm)</label>
            <input 
              type="number" 
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-40 text-4xl p-4 border-4 border-blue-300 rounded-xl text-center focus:border-blue-600 outline-none"
              placeholder="170"
            />
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Step 4: Waist</h3>
            <label className="block text-xl text-gray-700 mb-4">Waist circumference (cm)</label>
            <p className="text-gray-500 mb-4 text-lg">(Measure around your belly button)</p>
            <input 
              type="number" 
              name="waist"
              value={formData.waist}
              onChange={handleChange}
              className="w-40 text-4xl p-4 border-4 border-blue-300 rounded-xl text-center focus:border-blue-600 outline-none"
              placeholder="95"
            />
          </div>
        );
      case 4:
        return (
          <div className="text-center w-full max-w-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Step 5: Conditions</h3>
            <p className="text-xl text-gray-700 mb-6">Select any that apply to you:</p>
            <div className="space-y-4">
              {['Diabetes (Type 1 or 2)', 'Hypertension (High Blood Pressure)', 'High Cholesterol', 'None of the above'].map((cond) => (
                <div 
                  key={cond}
                  onClick={() => handleConditionToggle(cond)}
                  className={`p-4 border-4 rounded-xl cursor-pointer flex items-center transition-all ${
                    formData.conditions.includes(cond) 
                    ? 'border-blue-600 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center ${
                    formData.conditions.includes(cond) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
                  }`}>
                    {formData.conditions.includes(cond) && <span className="text-white font-bold">✓</span>}
                  </div>
                  <span className="text-2xl font-medium text-gray-800">{cond}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        // Ejecutamos la lógica aquí mismo
        const report = generateDoctorReport(formData);
        const dietTips = getDietRecommendations(formData.conditions);

        return (
          <div className="text-left w-full max-w-3xl animate-fade-in pb-8">
            <h3 className="text-4xl font-bold text-blue-900 mb-2 text-center">Check-up Complete</h3>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Please show this screen to your doctor.
            </p>

            {/* TARJETA 1: REPORTE MÉDICO (AZUL) */}
            <div className="bg-blue-50 p-8 rounded-3xl border-4 border-blue-200 mb-8 shadow-sm">
              <h4 className="text-3xl font-bold text-blue-900 mb-6 border-b-2 border-blue-200 pb-2 flex items-center">
                🩺 Doctor's Summary
              </h4>
              <ul className="space-y-6">
                {report.map((item, idx) => (
                  <li key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                    <strong className="block text-2xl text-gray-900 mb-2">{item.title}</strong>
                    <span className="text-xl text-gray-700 leading-relaxed">{item.content}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TARJETA 2: DIETA (VERDE) */}
            <div className="bg-green-50 p-8 rounded-3xl border-4 border-green-200 shadow-sm">
              <h4 className="text-3xl font-bold text-green-900 mb-6 border-b-2 border-green-200 pb-2 flex items-center">
                🍎 Nutrition For You
              </h4>
              <ul className="space-y-4 pl-4">
                {dietTips.map((tip, idx) => (
                  <li key={idx} className="text-2xl text-green-900 font-medium list-disc ml-4 leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* BOTÓN REINICIAR */}
            <div className="text-center mt-12">
              <button 
                onClick={onReset}
                className="text-2xl text-gray-500 font-bold underline hover:text-blue-600 p-4"
              >
                Start New Check-up
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
      {/* Progreso */}
      <div className="w-full bg-gray-200 h-4 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-500" 
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>

      {/* Contenido del Paso */}
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full min-h-[400px] flex flex-col items-center justify-center border border-gray-100">
        {renderStep()}
      </div>

      {/* Botones de Navegación */}
      <div className="flex justify-between w-full mt-8">
        <button 
          onClick={prevStep}
          disabled={step === 0 || step === 5}
          className={`text-2xl px-8 py-4 font-bold rounded-xl ${step === 0 || step === 5 ? 'opacity-0' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
        >
          ← BACK
        </button>

        {step < 5 && (
          <button 
            onClick={nextStep}
            className="text-3xl bg-blue-700 hover:bg-blue-800 text-white px-12 py-4 font-bold rounded-xl shadow-lg transform transition hover:scale-105"
          >
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}