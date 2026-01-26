// Cuestionario completo estructurado
export const questionnaire = {
  sections: [
    {
      id: 'parte1',
      title: 'PARTE 1 – Hábitos, energía y funcionamiento diario',
      description: 'Preguntas sobre su rutina diaria y estilo de vida',
      questions: [
        {
          id: 'sueno_horas',
          type: 'radio',
          category: 'Sueño',
          question: '¿Cuántas horas duerme en promedio por noche?',
          options: [
            { value: '<5', label: 'Menos de 5 horas' },
            { value: '5-6', label: '5 a 6 horas' },
            { value: '6-7', label: '6 a 7 horas' },
            { value: '7-8', label: '7 a 8 horas' },
            { value: '>8', label: 'Más de 8 horas' }
          ]
        },
        {
          id: 'sueno_calidad',
          type: 'radio',
          category: 'Sueño',
          question: 'Calidad del sueño:',
          options: [
            { value: 'muy_mala', label: 'Muy mala' },
            { value: 'mala', label: 'Mala' },
            { value: 'regular', label: 'Regular' },
            { value: 'buena', label: 'Buena' },
            { value: 'muy_buena', label: 'Muy buena' }
          ]
        },
        {
          id: 'sueno_apnea',
          type: 'radio',
          category: 'Sueño',
          question: '¿Ronca o le han dicho que deja de respirar al dormir?',
          options: [
            { value: 'no', label: 'No' },
            { value: 'a_veces', label: 'A veces' },
            { value: 'frecuentemente', label: 'Frecuentemente' },
            { value: 'no_se', label: 'No sé' }
          ]
        },
        {
          id: 'energia_despertar',
          type: 'radio',
          category: 'Energía',
          question: '¿Cómo se siente al despertar?',
          options: [
            { value: 'exhausto', label: 'Exhausto' },
            { value: 'cansado', label: 'Cansado' },
            { value: 'normal', label: 'Normal' },
            { value: 'buena_energia', label: 'Con buena energía' },
            { value: 'muy_energetico', label: 'Muy energético' }
          ]
        },
        {
          id: 'energia_dia',
          type: 'radio',
          category: 'Energía',
          question: 'Durante el día su energía es:',
          options: [
            { value: 'siempre_baja', label: 'Siempre baja' },
            { value: 'altibajos', label: 'Con altibajos marcados' },
            { value: 'aceptable', label: 'Aceptable' },
            { value: 'buena', label: 'Buena' },
            { value: 'alta_estable', label: 'Alta y estable' }
          ]
        },
        {
          id: 'actividad_fisica',
          type: 'radio',
          category: 'Actividad física',
          question: 'En una semana típica usted:',
          options: [
            { value: 'no_ejercicio', label: 'No hace ejercicio' },
            { value: 'camina_ocasional', label: 'Solo camina ocasionalmente' },
            { value: 'camina_3_4', label: 'Camina 3–4 días' },
            { value: 'ejercicio_3_4', label: 'Ejercicio estructurado 3–4 días' },
            { value: 'fuerza_cardio', label: 'Fuerza + cardio 5+ días' }
          ]
        },
        {
          id: 'actividad_escaleras',
          type: 'radio',
          category: 'Actividad física',
          question: 'Puede subir dos pisos sin detenerse:',
          options: [
            { value: 'no', label: 'No' },
            { value: 'mucha_dificultad', label: 'Con mucha dificultad' },
            { value: 'con_esfuerzo', label: 'Con esfuerzo' },
            { value: 'sin_problema', label: 'Sin problema' },
            { value: 'facilmente', label: 'Fácilmente' }
          ]
        },
        {
          id: 'alimentacion',
          type: 'radio',
          category: 'Alimentación',
          question: 'Su alimentación diaria es:',
          options: [
            { value: 'ultraprocesados', label: 'Mayormente ultraprocesados' },
            { value: 'mezcla', label: 'Mezcla casera/procesada' },
            { value: 'casera_poca_verdura', label: 'Casera, poca verdura' },
            { value: 'balanceada', label: 'Balanceada' },
            { value: 'planeada', label: 'Planeada y consciente' }
          ]
        },
        {
          id: 'refrescos',
          type: 'radio',
          category: 'Alimentación',
          question: 'Refrescos/bebidas azucaradas:',
          options: [
            { value: 'diario', label: 'Diario' },
            { value: 'varias_semana', label: 'Varias veces/semana' },
            { value: '1_2_semana', label: '1–2/semana' },
            { value: 'rara_vez', label: 'Rara vez' },
            { value: 'nunca', label: 'Nunca' }
          ]
        },
        {
          id: 'alcohol_frecuencia',
          type: 'radio',
          category: 'Alcohol',
          question: 'Frecuencia de consumo de alcohol:',
          options: [
            { value: 'nunca', label: 'Nunca' },
            { value: '1_2_mes', label: '1–2/mes' },
            { value: '1_2_semana', label: '1–2/semana' },
            { value: '3_5_semana', label: '3–5/semana' },
            { value: 'diario', label: 'Diario' }
          ]
        },
        {
          id: 'alcohol_cantidad',
          type: 'radio',
          category: 'Alcohol',
          question: 'Cantidad habitual cuando bebe:',
          options: [
            { value: '1', label: '1 copa' },
            { value: '2', label: '2 copas' },
            { value: '3_4', label: '3–4 copas' },
            { value: '5+', label: '5 o más copas' },
            { value: 'variable', label: 'Variable' }
          ]
        },
        {
          id: 'tabaco',
          type: 'radio',
          category: 'Tabaco / nicotina',
          question: 'Consumo de tabaco o nicotina:',
          options: [
            { value: 'nunca', label: 'Nunca' },
            { value: 'exfumador', label: 'Exfumador' },
            { value: 'ocasional', label: 'Fumo ocasional' },
            { value: 'diario', label: 'Fumo diario' },
            { value: 'vape', label: 'Vape / otros' }
          ]
        },
        {
          id: 'estres_nivel',
          type: 'radio',
          category: 'Estrés',
          question: 'Nivel de estrés habitual:',
          options: [
            { value: 'muy_bajo', label: 'Muy bajo' },
            { value: 'bajo', label: 'Bajo' },
            { value: 'moderado', label: 'Moderado' },
            { value: 'alto', label: 'Alto' },
            { value: 'muy_alto', label: 'Muy alto' }
          ]
        },
        {
          id: 'estres_manejo',
          type: 'radio',
          category: 'Estrés',
          question: 'Cuando está estresado tiende a:',
          options: [
            { value: 'comer', label: 'Comer' },
            { value: 'beber', label: 'Beber' },
            { value: 'aislarse', label: 'Aislarse' },
            { value: 'trabajar_mas', label: 'Trabajar más' },
            { value: 'ejercicio', label: 'Hacer ejercicio / relajarse' }
          ]
        },
        {
          id: 'caidas',
          type: 'radio',
          category: 'Función diaria',
          question: 'Caídas en el último año:',
          options: [
            { value: 'ninguna', label: 'Ninguna' },
            { value: 'una', label: 'Una' },
            { value: 'dos', label: 'Dos' },
            { value: 'varias', label: 'Varias' },
            { value: 'con_lesiones', label: 'Con lesiones' }
          ]
        },
        {
          id: 'memoria',
          type: 'radio',
          category: 'Función diaria',
          question: 'Memoria:',
          options: [
            { value: 'muy_mala', label: 'Muy mala' },
            { value: 'mala', label: 'Mala' },
            { value: 'regular', label: 'Regular' },
            { value: 'buena', label: 'Buena' },
            { value: 'muy_buena', label: 'Muy buena' }
          ]
        },
        {
          id: 'drogas_historial',
          type: 'radio',
          category: 'Drogas recreativas',
          question: '¿Ha consumido drogas recreativas alguna vez?',
          options: [
            { value: 'nunca', label: 'Nunca' },
            { value: 'juventud', label: 'Solo en juventud' },
            { value: 'ocasional', label: 'Ocasional actual' },
            { value: 'regular', label: 'Regular actual' },
            { value: 'no_responder', label: 'Prefiero no responder' }
          ]
        },
        {
          id: 'drogas_tipos',
          type: 'checkbox',
          category: 'Drogas recreativas',
          question: 'Último año (puede marcar varias):',
          options: [
            { value: 'cannabis', label: 'Cannabis' },
            { value: 'cocaina', label: 'Cocaína' },
            { value: 'estimulantes', label: 'Estimulantes' },
            { value: 'psicodelicos', label: 'Psicodélicos' },
            { value: 'ninguna', label: 'Ninguna' }
          ]
        },
        {
          id: 'drogas_motivo',
          type: 'radio',
          category: 'Drogas recreativas',
          question: 'Motivo principal:',
          options: [
            { value: 'relajacion', label: 'Relajación / sueño' },
            { value: 'social', label: 'Social' },
            { value: 'energia', label: 'Energía / enfoque' },
            { value: 'evasion', label: 'Evasión emocional' },
            { value: 'no_aplica', label: 'No aplica' }
          ]
        }
      ]
    },
    {
      id: 'parte2',
      title: 'PARTE 2 – Historia médica y riesgos',
      description: 'Información clínica y antecedentes',
      questions: [
        {
          id: 'enfermedades',
          type: 'checkbox',
          category: 'Enfermedades diagnosticadas',
          question: 'Marque las enfermedades que tenga:',
          options: [
            { value: 'hipertension', label: 'Hipertensión' },
            { value: 'diabetes', label: 'Diabetes' },
            { value: 'colesterol', label: 'Colesterol alto' },
            { value: 'cardiopatia', label: 'Cardiopatía' },
            { value: 'evc', label: 'EVC (Evento Vascular Cerebral)' },
            { value: 'cancer', label: 'Cáncer' },
            { value: 'apnea', label: 'Apnea del sueño' },
            { value: 'osteoporosis', label: 'Osteoporosis' },
            { value: 'ninguna', label: 'Ninguna' }
          ],
          hasOther: true,
          otherLabel: 'Otra (especifique):'
        },
        {
          id: 'medicamentos',
          type: 'textarea',
          category: 'Medicamentos diarios',
          question: 'Liste los medicamentos que toma diariamente:',
          placeholder: 'Ejemplo: Losartán 50mg, Metformina 850mg...'
        },
        {
          id: 'suplementos',
          type: 'radio',
          category: 'Suplementos',
          question: 'Consumo de suplementos:',
          options: [
            { value: 'ninguno', label: 'Ninguno' },
            { value: 'vitaminas_basicas', label: 'Vitaminas básicas' },
            { value: 'muchos', label: 'Muchos por iniciativa propia' },
            { value: 'medico_funcional', label: 'Indicados por médico funcional' },
            { value: 'no_se', label: 'No sé exactamente' }
          ]
        },
        {
          id: 'antecedentes_causa',
          type: 'radio',
          category: 'Antecedentes familiares',
          question: 'Principal causa de muerte en padres/hermanos:',
          options: [
            { value: 'infarto', label: 'Infarto' },
            { value: 'evc', label: 'EVC' },
            { value: 'cancer', label: 'Cáncer' },
            { value: 'diabetes', label: 'Diabetes' },
            { value: 'no_aplica', label: 'No aplica / Desconocido' }
          ],
          hasOther: true,
          otherLabel: 'Otra (especifique):'
        },
        {
          id: 'antecedentes_edad',
          type: 'number',
          category: 'Antecedentes familiares',
          question: 'Edad aproximada del familiar al fallecer:',
          placeholder: 'Ej: 65'
        }
      ]
    },
    {
      id: 'parte3',
      title: 'PARTE 3 – Zona íntima y determinante de longevidad',
      description: 'Información sensible pero crucial para su salud',
      questions: [
        {
          id: 'funcion_sexual_cambios',
          type: 'radio',
          category: 'Función sexual',
          question: 'Cambios en los últimos años:',
          options: [
            { value: 'ninguno', label: 'Ninguno' },
            { value: 'leves', label: 'Leves' },
            { value: 'moderados', label: 'Moderados' },
            { value: 'importantes', label: 'Importantes' },
            { value: 'no_responder', label: 'Prefiero no responder' }
          ]
        },
        {
          id: 'funcion_sexual_satisfaccion',
          type: 'radio',
          category: 'Función sexual',
          question: 'Satisfacción actual:',
          options: [
            { value: 'muy_baja', label: 'Muy baja' },
            { value: 'baja', label: 'Baja' },
            { value: 'regular', label: 'Regular' },
            { value: 'buena', label: 'Buena' },
            { value: 'muy_buena', label: 'Muy buena' }
          ]
        },
        {
          id: 'estado_emocional',
          type: 'checkbox',
          category: 'Estado emocional',
          question: 'En los últimos 6 meses ha sentido:',
          options: [
            { value: 'tristeza', label: 'Tristeza persistente' },
            { value: 'ansiedad', label: 'Ansiedad' },
            { value: 'irritabilidad', label: 'Irritabilidad' },
            { value: 'perdida_interes', label: 'Pérdida de interés' },
            { value: 'ninguna', label: 'Ninguna' }
          ]
        },
        {
          id: 'estado_emocional_intensidad',
          type: 'radio',
          category: 'Estado emocional',
          question: 'Intensidad de los síntomas emocionales:',
          options: [
            { value: 'no_aplica', label: 'No aplica' },
            { value: 'leve', label: 'Leve' },
            { value: 'moderada', label: 'Moderada' },
            { value: 'alta', label: 'Alta' },
            { value: 'muy_alta', label: 'Muy alta' }
          ]
        },
        {
          id: 'sustancias_regulacion',
          type: 'radio',
          category: 'Sustancias como regulación emocional',
          question: '¿Usa alcohol, fármacos o drogas para "sentirse normal"?',
          options: [
            { value: 'no', label: 'No' },
            { value: 'a_veces', label: 'A veces' },
            { value: 'frecuentemente', label: 'Frecuentemente' },
            { value: 'dependo', label: 'Dependo de ello' },
            { value: 'no_decir', label: 'Prefiero no decir' }
          ]
        },
        {
          id: 'mayor_miedo',
          type: 'radio',
          category: 'Autonomía futura',
          question: 'Su mayor miedo al envejecer es:',
          options: [
            { value: 'morir', label: 'Morir' },
            { value: 'dolor', label: 'Dolor' },
            { value: 'independencia', label: 'Perder independencia' },
            { value: 'deterioro_mental', label: 'Deterioro mental' },
            { value: 'carga', label: 'Ser carga para otros' }
          ]
        },
        {
          id: 'proposito',
          type: 'textarea',
          category: 'Propósito',
          question: '¿Para qué quiere estar sano los próximos 20 años?',
          placeholder: 'Comparta sus motivaciones, metas, o lo que más valora en su vida...'
        }
      ]
    }
  ]
};
