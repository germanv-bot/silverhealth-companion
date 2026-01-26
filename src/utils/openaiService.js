// Servicio para analizar respuestas con OpenAI

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function analyzeWithOpenAI(answers, questionnaire) {
  // Si no hay API key, usar análisis local
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'undefined' || OPENAI_API_KEY === 'sk-your-api-key-here') {
    console.warn('API Key de OpenAI no configurada. Usando análisis local básico.');
    return analyzeLocally(answers, questionnaire);
  }

  // Formatear las respuestas de manera legible
  const formattedAnswers = formatAnswersForAI(answers, questionnaire);

  const prompt = `Eres un médico especialista en medicina preventiva y longevidad. Has recibido las siguientes respuestas de un cuestionario de salud integral.

Tu tarea es proporcionar un análisis médico completo, personalizado y empático que incluya:

1. **RESUMEN EJECUTIVO**: Una visión general del estado de salud del paciente en 2-3 párrafos.

2. **FACTORES DE RIESGO IDENTIFICADOS**: Lista los principales riesgos para la salud y longevidad, priorizados por importancia.

3. **FORTALEZAS Y ASPECTOS POSITIVOS**: Reconoce los buenos hábitos y factores protectores.

4. **RECOMENDACIONES PRIORITARIAS**:
   - Cambios inmediatos (próximas 2 semanas)
   - Objetivos a corto plazo (3 meses)
   - Objetivos a largo plazo (1 año)

5. **PLAN DE ACCIÓN ESPECÍFICO**: Recomendaciones concretas y accionables en:
   - Nutrición
   - Ejercicio
   - Sueño
   - Manejo del estrés
   - Seguimiento médico

6. **ALERTAS MÉDICAS**: Cualquier síntoma o patrón que requiera atención médica inmediata.

7. **MOTIVACIÓN PERSONALIZADA**: Conecta las recomendaciones con el propósito de vida expresado por el paciente.

IMPORTANTE:
- Sé empático pero directo sobre los riesgos
- Usa lenguaje claro, evita jerga excesiva
- Prioriza las intervenciones por impacto en longevidad
- Reconoce los aspectos emocionales y psicológicos
- Si hay señales de depresión, ansiedad o abuso de sustancias, enfatiza la importancia de ayuda profesional

RESPUESTAS DEL CUESTIONARIO:

${formattedAnswers}

Proporciona tu análisis en español, con formato claro y estructura bien organizada:`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Eres un médico especialista en medicina preventiva y longevidad, experto en análisis de factores de riesgo y optimización de salud. Eres empático, directo y basas tus recomendaciones en evidencia científica.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error al comunicarse con OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error en analyzeWithOpenAI:', error);
    throw error;
  }
}

function formatAnswersForAI(answers, questionnaire) {
  let formatted = '';

  questionnaire.sections.forEach(section => {
    formatted += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    formatted += `${section.title}\n`;
    formatted += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    section.questions.forEach(question => {
      const answer = answers[question.id];
      const otherAnswer = answers[`${question.id}_other`];

      formatted += `📌 ${question.question}\n`;
      formatted += `Categoría: ${question.category}\n`;

      if (answer) {
        if (question.type === 'radio') {
          const selectedOption = question.options.find(opt => opt.value === answer);
          formatted += `Respuesta: ${selectedOption?.label || answer}\n`;
        } else if (question.type === 'checkbox') {
          const selectedLabels = answer.map(val => {
            const option = question.options.find(opt => opt.value === val);
            return option?.label || val;
          });
          formatted += `Respuestas: ${selectedLabels.join(', ')}\n`;
        } else {
          formatted += `Respuesta: ${answer}\n`;
        }
      } else {
        formatted += `Respuesta: No contestada\n`;
      }

      if (otherAnswer) {
        formatted += `Especificación adicional: ${otherAnswer}\n`;
      }

      formatted += `\n`;
    });
  });

  return formatted;
}

// Función alternativa usando análisis local (sin API)
export function analyzeLocally(answers, questionnaire) {
  // Esta función proporciona un análisis básico sin usar OpenAI
  // Útil para desarrollo o cuando no se tiene API key

  let analysis = '# ANÁLISIS DE SALUD PRELIMINAR\n\n';
  analysis += '⚠️ Este es un análisis preliminar básico. Para un análisis completo, configure su API Key de OpenAI.\n\n';

  // Analizar sueño
  const sleepHours = answers.sueno_horas;
  const sleepQuality = answers.sueno_calidad;

  analysis += '## 1. ANÁLISIS DE SUEÑO\n';
  if (sleepHours === '<5' || sleepQuality === 'muy_mala' || sleepQuality === 'mala') {
    analysis += '🔴 ALERTA: Calidad de sueño deficiente detectada. El sueño inadecuado está asociado con:\n';
    analysis += '- Mayor riesgo cardiovascular\n';
    analysis += '- Deterioro cognitivo acelerado\n';
    analysis += '- Sistema inmune comprometido\n';
    analysis += '- Mayor riesgo de diabetes tipo 2\n\n';
    analysis += '**Recomendación prioritaria**: Consulte con un especialista en medicina del sueño.\n\n';
  } else if (sleepHours === '7-8' && (sleepQuality === 'buena' || sleepQuality === 'muy_buena')) {
    analysis += '✅ Excelente: Mantiene hábitos de sueño saludables.\n\n';
  }

  // Analizar actividad física
  const activity = answers.actividad_fisica;
  analysis += '## 2. ACTIVIDAD FÍSICA\n';
  if (activity === 'no_ejercicio' || activity === 'camina_ocasional') {
    analysis += '🔴 PRIORIDAD ALTA: Sedentarismo detectado.\n';
    analysis += 'El ejercicio regular es el factor más importante para la longevidad.\n';
    analysis += '**Acción inmediata**: Comenzar con 10 minutos de caminata diaria.\n\n';
  } else if (activity === 'fuerza_cardio') {
    analysis += '✅ Excelente: Régimen de ejercicio óptimo para longevidad.\n\n';
  }

  // Analizar salud mental
  const emotionalState = answers.estado_emocional || [];
  analysis += '## 3. SALUD MENTAL\n';
  if (emotionalState.includes('tristeza') || emotionalState.includes('ansiedad')) {
    analysis += '🔴 IMPORTANTE: Síntomas emocionales detectados.\n';
    analysis += 'La salud mental es fundamental para la longevidad y calidad de vida.\n';
    analysis += '**Recomendación**: Considere consulta con profesional de salud mental.\n\n';
  }

  // Propósito
  const purpose = answers.proposito;
  if (purpose) {
    analysis += '## 4. PROPÓSITO Y MOTIVACIÓN\n';
    analysis += `Su motivación: "${purpose}"\n\n`;
    analysis += 'Tener un propósito claro está asociado con:\n';
    analysis += '- Hasta 7 años más de esperanza de vida\n';
    analysis += '- Mejor adherencia a tratamientos\n';
    analysis += '- Mayor resiliencia ante adversidades\n\n';
  }

  analysis += '## SIGUIENTES PASOS\n';
  analysis += '1. Configure su API Key de OpenAI para análisis completo\n';
  analysis += '2. Comparta estos resultados con su médico\n';
  analysis += '3. Establezca un plan de acción basado en las prioridades identificadas\n';

  return analysis;
}
