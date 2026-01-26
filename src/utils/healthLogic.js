// src/utils/healthLogic.js

// Función 1: Generar el reporte para el médico
export function generateDoctorReport(data) {
  const report = [];
  const age = parseInt(data.age);
  const bmi = calculateBMI(data.weight, data.height);
  
  // A. Resumen Básico
  report.push({
    title: "Patient Summary",
    content: `Patient is ${age} years old. Calculated BMI is ${bmi}.`
  });

  // B. Alertas de Riesgo (Reglas simples)
  if (data.conditions.includes('Hypertension (High Blood Pressure)')) {
    report.push({
      title: "⚠️ Hypertension Context",
      content: "Patient reports history of Hypertension. Verify medication dosage vs current weight."
    });
  }

  if (data.conditions.includes('Diabetes (Type 1 or 2)')) {
    report.push({
      title: "⚠️ Diabetes Context",
      content: "Patient reports Diabetes. Recommend reviewing HbA1c levels."
    });
  }

  // C. Regla de Cintura (Riesgo Metabólico)
  if (data.waist > 102 && data.conditions.length === 0) {
     report.push({
      title: "Metabolic Risk Indicator",
      content: "Waist circumference (>102cm) indicates potential metabolic risk despite no reported conditions."
     });
  }

  return report;
}

// Función 2: Generar recomendaciones de dieta
export function getDietRecommendations(conditions) {
  const tips = [];

  if (conditions.includes('Hypertension (High Blood Pressure)')) {
    tips.push("🥗 DASH Diet Focus: Prioritize low sodium foods.");
    tips.push("🥑 Potassium Rich: Spinach, bananas, and avocados help regulate pressure.");
  }

  if (conditions.includes('Diabetes (Type 1 or 2)')) {
    tips.push("🍞 Low Glycemic Index: Switch white bread/rice for whole grain options.");
    tips.push("🚫 Hidden Sugars: Watch out for 'low fat' yogurts, they often add sugar.");
  }

  if (conditions.includes('High Cholesterol')) {
    tips.push("🐟 Omega-3: Fatty fish like salmon or mackerel twice a week.");
    tips.push("🥣 Fiber: Oatmeal breakfast helps scrub arteries.");
  }

  // Si no tiene condiciones, dar consejos generales para seniors
  if (tips.length === 0) {
    tips.push("🍎 General Senior Health: Prioritize protein to maintain muscle mass.");
    tips.push("💧 Hydration: Drink water regularly, even if you don't feel thirsty.");
  }

  return tips;
}

// Función auxiliar privada (Cálculo de IMC)
function calculateBMI(weight, height) {
  if (!weight || !height) return "Unknown";
  // Asumimos sistema métrico (kg/cm) para este MVP
  const hMeters = height / 100;
  return (weight / (hMeters * hMeters)).toFixed(1);
}