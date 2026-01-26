// Servicio para analizar respuestas con OpenAI

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function analyzeWithOpenAI(answers, questionnaire) {
  // Debug: verificar que la API key se esté cargando
  console.log('🔑 Verificando API Key...');
  console.log('API Key presente:', OPENAI_API_KEY ? `Sí (${OPENAI_API_KEY.substring(0, 20)}...)` : 'No');

  // Si no hay API key, usar análisis local
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'undefined' || OPENAI_API_KEY === 'sk-your-api-key-here') {
    console.warn('⚠️ API Key de OpenAI no configurada. Usando análisis local básico.');
    return analyzeLocally(answers, questionnaire);
  }

  console.log('✅ API Key válida detectada. Consultando OpenAI...');

  // Formatear las respuestas de manera legible
  const formattedAnswers = formatAnswersForAI(answers, questionnaire);

  const prompt = `Actúa como un Panel Médico Multidisciplinario de Alta Especialidad enfocado en evaluación de riesgos y longevidad funcional a 20 años.

El panel está compuesto por los siguientes especialistas:

• Cardiólogo clínico y preventivo
• Endocrinólogo-metabolista
• Neurólogo especializado en envejecimiento cognitivo
• Geriatra enfocado en alta funcionalidad
• Neumólogo especialista en trastornos del sueño
• Nefrólogo preventivo
• Oncólogo de detección temprana
• Psiquiatra/psicólogo clínico de adultos mayores
• Especialista en medicina del deporte y fuerza
• Urólogo-andrólogo (o ginecólogo según sexo biológico)
• Médico integrador de longevidad (moderador del panel)

DINÁMICA DEL PANEL:

1. Cada especialista revisará las respuestas desde la perspectiva de su disciplina.

2. Solo intervendrán aquellos especialistas que detecten hallazgos relevantes, riesgos, banderas amarillas o rojas.

3. Cada intervención debe incluir:
   - Qué respuestas le llaman la atención
   - Qué riesgos potenciales sugieren (no diagnósticos)
   - Qué preguntas adicionales haría en consulta
   - Qué estudios o evaluaciones clínicas sugeriría discutir con el médico tratante

4. El médico integrador:
   - Hará una síntesis transversal de los riesgos más importantes
   - Identificará trayectorias de riesgo (cardiovascular, metabólica, cognitiva, fragilidad, emocional)
   - Priorizará los 5 focos de atención más críticos a 5, 10 y 20 años

DOCUMENTO FINAL PARA EL PACIENTE:

Después de las intervenciones del panel, emite un documento dirigido al paciente que incluya:

1. **Resumen claro** de los principales riesgos detectados
2. **Lista de temas** que debe conversar con su médico de cabecera
3. **Preguntas concretas** que puede llevar a su consulta
4. **Estudios** que debería preguntar si son pertinentes en su caso
5. **Recomendaciones generales** de estilo de vida basadas en evidencia
6. **Palabras de aliento y motivación**:
   - Reconoce las fortalezas y aspectos positivos del paciente
   - Si el paciente expresó un propósito de vida, reconócelo y vincúlalo con la importancia de cuidar su salud
   - Recuerda que la investigación científica muestra que tener un propósito de vida claro está asociado con hasta 7 años adicionales de esperanza de vida
   - Anima al paciente a tomar acción y buscar a su médico
   - Mensaje positivo sobre el poder de la prevención y el autocuidado

ADVERTENCIAS OBLIGATORIAS (incluir en múltiples puntos del documento):

⚠️ Esta evaluación NO constituye un diagnóstico médico.
⚠️ NO sustituye una consulta presencial con profesionales de la salud.
⚠️ NO indica tratamientos específicos.
⚠️ Su único propósito es servir como guía estructurada para una conversación profunda, informada y completa con su médico de cabecera y especialistas reales.

TONO DEL PANEL:

- Clínico, claro, respetuoso
- Sin alarmismo
- Sin falsas certezas
- Enfocado en prevención, toma de decisiones informadas y autonomía del paciente
- Empático con los aspectos emocionales y psicológicos
- Considera diferencias específicas por sexo biológico en todos los análisis

RESPUESTAS DEL CUESTIONARIO INTEGRAL DE LONGEVIDAD FUNCIONAL:

${formattedAnswers}

Comienza la simulación del panel médico ahora, proporcionando el análisis completo en español con formato claro y bien estructurado:`;

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
            content: 'Eres un panel médico multidisciplinario de alta especialidad. Tu rol es simular la dinámica de un grupo de especialistas médicos evaluando de forma integral a un paciente con enfoque en prevención y longevidad funcional. Cada especialista del panel debe aportar desde su perspectiva clínica, identificando riesgos, sugiriendo estudios pertinentes y formulando preguntas clave. El análisis debe ser clínico, basado en evidencia, sin alarmismo, enfocado en prevención y autonomía del paciente. Siempre incluye advertencias de que esto NO es un diagnóstico y NO sustituye consulta médica real. Al final, proporciona palabras de aliento y motivación al paciente.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4096
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

  // Información básica
  const sexo = answers.sexo;
  if (sexo) {
    analysis += `## INFORMACIÓN BÁSICA\n`;
    analysis += `Sexo biológico: ${sexo === 'masculino' ? 'Masculino' : 'Femenino'}\n\n`;
    analysis += 'ℹ️ El análisis completo con IA considerará factores de riesgo específicos según su sexo biológico.\n\n';
  }

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

  // Analizar antecedentes familiares
  const antecedentes = answers.antecedentes_familiares || [];
  if (antecedentes.length > 0 && !antecedentes.includes('ninguna')) {
    analysis += '## 4. RIESGO GENÉTICO\n';
    analysis += '⚠️ Antecedentes familiares detectados:\n';
    antecedentes.forEach(ant => {
      if (ant !== 'ninguna') {
        analysis += `- ${ant}\n`;
      }
    });
    analysis += '\n**Importante**: Los antecedentes familiares aumentan su riesgo. ';
    analysis += 'Discuta con su médico sobre screening preventivo apropiado.\n\n';
  }

  // Propósito
  const purpose = answers.proposito;
  if (purpose) {
    analysis += '## 5. PROPÓSITO Y MOTIVACIÓN\n';
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
