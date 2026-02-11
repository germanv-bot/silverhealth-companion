// src/utils/healthLogic.js

// Función 1: Generar el reporte para el médico
export function generateDoctorReport(data) {
  const report = [];
  const age = parseInt(data.age);
  const bmi = calculateBMI(data.weight, data.height);

  // A. Resumen Básico
  report.push({
    title: "Resumen del Paciente",
    content: `El paciente tiene ${age} años. El IMC calculado es ${bmi}.`
  });

  // B. Alertas de Riesgo (Reglas simples)
  if (data.conditions.includes('Hipertensión (Presión Alta)')) {
    report.push({
      title: "⚠️ Contexto de Hipertensión",
      content: "El paciente reporta historial de Hipertensión. Verificar dosis de medicamento según peso actual."
    });
  }

  if (data.conditions.includes('Diabetes (Tipo 1 o 2)')) {
    report.push({
      title: "⚠️ Contexto de Diabetes",
      content: "El paciente reporta Diabetes. Se recomienda revisar niveles de HbA1c."
    });
  }

  if (data.conditions.includes('Colesterol Alto')) {
    report.push({
      title: "⚠️ Contexto de Colesterol Alto",
      content: "El paciente reporta Colesterol Alto. Considerar revisar panel lipídico completo."
    });
  }

  // C. Regla de Cintura (Riesgo Metabólico)
  if (data.waist > 102 && data.conditions.length === 0) {
     report.push({
      title: "Indicador de Riesgo Metabólico",
      content: "La circunferencia de cintura (>102cm) indica riesgo metabólico potencial a pesar de no reportar condiciones."
     });
  }

  return report;
}

// Función 2: Generar recomendaciones de dieta
export function getDietRecommendations(conditions) {
  const tips = [];

  if (conditions.includes('Hipertensión (Presión Alta)')) {
    tips.push("🥗 Dieta DASH: Prioriza alimentos bajos en sodio.");
    tips.push("🥑 Rico en Potasio: Espinacas, plátanos y aguacates ayudan a regular la presión.");
  }

  if (conditions.includes('Diabetes (Tipo 1 o 2)')) {
    tips.push("🍞 Índice Glucémico Bajo: Cambia pan blanco/arroz por opciones integrales.");
    tips.push("🚫 Azúcares Ocultos: Cuidado con yogures 'bajos en grasa', a menudo añaden azúcar.");
  }

  if (conditions.includes('Colesterol Alto')) {
    tips.push("🐟 Omega-3: Pescado graso como salmón o caballa dos veces por semana.");
    tips.push("🥣 Fibra: Avena en el desayuno ayuda a limpiar las arterias.");
  }

  // Si no tiene condiciones, dar consejos generales para seniors
  if (tips.length === 0) {
    tips.push("🍎 Salud General: Prioriza proteínas para mantener masa muscular.");
    tips.push("💧 Hidratación: Bebe agua regularmente, incluso si no sientes sed.");
    tips.push("🥦 Vegetales: Incluye verduras de colores variados en cada comida.");
  }

  return tips;
}

// Función auxiliar privada (Cálculo de IMC)
function calculateBMI(weight, height) {
  if (!weight || !height) return "Desconocido";
  // Asumimos sistema métrico (kg/cm) para este MVP
  const hMeters = height / 100;
  return (weight / (hMeters * hMeters)).toFixed(1);
}