// Utilidad para descargar el reporte completo

export function formatQuestionsAndAnswers(answers, questionnaire) {
  let content = '';

  questionnaire.sections.forEach((section, sectionIndex) => {
    content += `\n${'='.repeat(80)}\n`;
    content += `${section.title}\n`;
    content += `${section.description}\n`;
    content += `${'='.repeat(80)}\n\n`;

    section.questions.forEach((question, questionIndex) => {
      const answer = answers[question.id];
      const otherAnswer = answers[`${question.id}_other`];

      content += `${sectionIndex + 1}.${questionIndex + 1}. ${question.question}\n`;
      content += `Categoría: ${question.category}\n`;

      if (answer) {
        if (question.type === 'radio') {
          const selectedOption = question.options.find(opt => opt.value === answer);
          content += `Respuesta: ${selectedOption?.label || answer}\n`;
        } else if (question.type === 'checkbox') {
          const selectedLabels = answer.map(val => {
            const option = question.options.find(opt => opt.value === val);
            return option?.label || val;
          });
          content += `Respuestas: ${selectedLabels.join(', ')}\n`;
        } else {
          content += `Respuesta: ${answer}\n`;
        }
      } else {
        content += `Respuesta: No contestada\n`;
      }

      if (otherAnswer) {
        content += `Especificación adicional: ${otherAnswer}\n`;
      }

      content += `\n`;
    });
  });

  return content;
}

export function generateFullReport(answers, questionnaire, analysis) {
  const timestamp = new Date().toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let report = '';

  // Encabezado
  report += '═'.repeat(80) + '\n';
  report += '                    SILVERHEALTH - ANÁLISIS INTEGRAL DE SALUD\n';
  report += '═'.repeat(80) + '\n\n';
  report += `Fecha del análisis: ${timestamp}\n`;
  report += `\n`;
  report += `⚠️  AVISO MÉDICO IMPORTANTE:\n`;
  report += `Este documento NO constituye un diagnóstico médico.\n`;
  report += `NO sustituye una consulta presencial con profesionales de la salud.\n`;
  report += `Comparta este reporte con su médico de cabecera.\n`;
  report += `\n${'='.repeat(80)}\n\n`;

  // Preguntas y Respuestas
  report += '\n' + '█'.repeat(80) + '\n';
  report += 'SECCIÓN 1: CUESTIONARIO COMPLETADO\n';
  report += '█'.repeat(80) + '\n';
  report += formatQuestionsAndAnswers(answers, questionnaire);

  // Análisis del Panel
  report += '\n\n' + '█'.repeat(80) + '\n';
  report += 'SECCIÓN 2: ANÁLISIS DEL PANEL MÉDICO MULTIDISCIPLINARIO\n';
  report += '█'.repeat(80) + '\n\n';
  report += analysis;

  // Footer
  report += '\n\n' + '═'.repeat(80) + '\n';
  report += 'Generado por SilverHealth - Herramienta educativa para conversaciones médicas\n';
  report += 'https://silverhealth.app\n';
  report += '═'.repeat(80) + '\n';

  return report;
}

export function downloadAsTextFile(content, filename = 'SilverHealth_Reporte.txt') {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function copyToClipboard(content) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(content)
      .then(() => true)
      .catch(() => false);
  } else {
    // Fallback para navegadores antiguos
    const textArea = document.createElement('textarea');
    textArea.value = content;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(success);
    } catch (err) {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }
}

export function shareReport(content) {
  // Web Share API para móviles
  if (navigator.share) {
    return navigator.share({
      title: 'SilverHealth - Análisis de Salud',
      text: 'Mi análisis de salud personalizado de SilverHealth',
      files: [new File([content], 'SilverHealth_Reporte.txt', { type: 'text/plain' })]
    }).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}
