import React, { useState } from 'react';
import { questionnaire } from '../data/questionnaire';
import QuestionRenderer from './QuestionRenderer';
import { analyzeWithOpenAI } from '../utils/openaiService';
import { generateFullReport, downloadAsTextFile, copyToClipboard } from '../utils/downloadReport';

export default function NewWizard({ onReset }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const currentSection = questionnaire.sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = questionnaire.sections.reduce((sum, section) => sum + section.questions.length, 0);

  // Calcular el número de pregunta actual (índice absoluto)
  const currentQuestionNumber = questionnaire.sections
    .slice(0, currentSectionIndex)
    .reduce((sum, section) => sum + section.questions.length, 0) + currentQuestionIndex + 1;

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < questionnaire.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Última pregunta - analizar
      handleFinish();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      const prevSection = questionnaire.sections[currentSectionIndex - 1];
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const handleFinish = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeWithOpenAI(answers, questionnaire);
      setAnalysis(result);
    } catch (err) {
      console.error('Error al analizar:', err);
      setError(err.message || 'Error al analizar el cuestionario');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = () => {
    const fullReport = generateFullReport(answers, questionnaire, analysis);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadAsTextFile(fullReport, `SilverHealth_Reporte_${timestamp}.txt`);
  };

  const handleCopy = async () => {
    const fullReport = generateFullReport(answers, questionnaire, analysis);
    const success = await copyToClipboard(fullReport);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const isLastQuestion = currentSectionIndex === questionnaire.sections.length - 1 &&
                        currentQuestionIndex === currentSection.questions.length - 1;

  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0;

  if (analysis) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 animate-fade-in">
        <div className="text-center mb-10">
          <div className="mb-4 inline-block bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl">
            <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            Análisis Completado
          </h2>
          <p className="text-xl text-gray-600">
            Informe personalizado generado con IA
          </p>
        </div>

        {/* Análisis de OpenAI */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border-2 border-blue-200 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-200">
            <div className="bg-blue-600 p-3 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-blue-900">Análisis Médico Personalizado</h3>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-6 rounded-2xl shadow-md whitespace-pre-wrap text-gray-800 leading-relaxed">
              {analysis}
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-amber-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <div>
              <p className="text-lg font-semibold text-amber-900 mb-1">Importante</p>
              <p className="text-base text-amber-800">
                Este análisis es informativo y ha sido generado por inteligencia artificial.
                No reemplaza la consulta médica profesional. Comparta estos resultados con su médico.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de Descarga y Compartir */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 mb-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Guarde su Análisis Completo
          </h4>
          <p className="text-gray-600 text-center mb-6">
            Descargue el cuestionario con sus respuestas y el análisis del panel médico
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              Descargar Reporte (TXT)
            </button>

            <button
              onClick={handleCopy}
              className={`group flex items-center gap-3 font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                copied
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  ¡Copiado!
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                  </svg>
                  Copiar al Portapapeles
                </>
              )}
            </button>
          </div>
        </div>

        {/* Invitación para Compartir con Otros */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-200 shadow-xl mb-8">
          <div className="text-center">
            <div className="mb-4 inline-block bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl">
              <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
            </div>

            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Ayude a sus Seres Queridos
            </h3>

            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              La prevención salva vidas. Invite a sus familiares y amigos a realizar este chequeo de salud.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <p className="text-lg text-gray-800 mb-4">
                <span className="font-bold text-purple-600">¿Sabía que...</span> detectar factores de riesgo tempranamente puede agregar años de vida saludable?
              </p>
              <p className="text-base text-gray-600">
                Compartir este cuestionario con personas que le importan es un acto de amor y cuidado.
              </p>
            </div>

            <button
              onClick={() => {
                const url = window.location.href.split('?')[0];
                copyToClipboard(url);
                alert('¡Enlace copiado! Compártelo con tus seres queridos.');
              }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:scale-105"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
              Compartir SilverHealth
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Copia el enlace y compártelo por WhatsApp, email o redes sociales
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onReset}
            className="group text-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-600 hover:to-indigo-600 text-gray-700 hover:text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              Nuevo Cuestionario
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="w-full max-w-3xl mx-auto p-8 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-2xl">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Analizando sus respuestas...</h3>
          <p className="text-xl text-gray-600">
            Generando un análisis personalizado con inteligencia artificial
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-red-50 border-2 border-red-300 p-8 rounded-2xl">
          <div className="flex items-start gap-4 mb-6">
            <svg className="w-8 h-8 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Error al Analizar</h3>
              <p className="text-lg text-red-800">{error}</p>
            </div>
          </div>
          <button
            onClick={() => setError(null)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4">
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 h-3 rounded-full mb-6 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-500 rounded-full"
          style={{ width: `${(currentQuestionNumber / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Indicador de progreso */}
      <div className="mb-6 text-center">
        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-5 py-2 rounded-full text-lg font-bold shadow-sm">
          Pregunta {currentQuestionNumber} de {totalQuestions}
        </span>
        <p className="text-gray-600 mt-2 text-lg font-medium">{currentSection.title}</p>
      </div>

      {/* Contenedor de pregunta */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full border-2 border-gray-100">
        <div className="mb-8">
          <div className="inline-block bg-gradient-to-br from-indigo-100 to-purple-100 px-4 py-2 rounded-lg mb-4">
            <span className="text-indigo-700 font-bold text-sm">{currentQuestion.category}</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {currentQuestion.question}
          </h3>
        </div>

        <div className="max-h-[500px] overflow-y-auto pr-2">
          <QuestionRenderer
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={handleAnswerChange}
          />
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between w-full mt-10 gap-4">
        <button
          onClick={goToPreviousQuestion}
          disabled={isFirstQuestion}
          className={`group text-2xl px-10 py-5 font-bold rounded-xl transition-all duration-200 ${
            isFirstQuestion
              ? 'opacity-0 invisible'
              : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
            ATRÁS
          </span>
        </button>

        <button
          onClick={goToNextQuestion}
          className="group text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-14 py-5 font-bold rounded-xl shadow-2xl transform transition-all duration-200 hover:scale-105"
        >
          <span className="flex items-center gap-3">
            {isLastQuestion ? 'ANALIZAR' : 'SIGUIENTE'}
            <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
