# Configuración de SilverHealth

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de OpenAI con API key

## Instalación

1. **Clonar o descargar el repositorio**

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar API Key de OpenAI**

   a. Obtenga su API key:
   - Visite https://platform.openai.com/api-keys
   - Cree una cuenta o inicie sesión
   - Genere una nueva API key

   b. Configure el archivo de entorno:
   ```bash
   cp .env.example .env
   ```

   c. Edite el archivo `.env` y agregue su API key:
   ```
   VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxx
   ```

4. **Ejecutar la aplicación**
```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

## Características

### Cuestionario Integral de Salud

El cuestionario está dividido en 3 partes:

1. **Parte 1 - Hábitos y funcionamiento diario**
   - Sexo biológico
   - Sueño (horas, calidad, apnea)
   - Energía
   - Actividad física
   - Alimentación
   - Alcohol y tabaco
   - Estrés
   - Función cognitiva
   - Uso de sustancias

2. **Parte 2 - Historia médica**
   - Enfermedades diagnosticadas
   - Medicamentos actuales
   - Suplementos
   - Antecedentes familiares (enfermedades hereditarias)

3. **Parte 3 - Factores de longevidad**
   - Función sexual
   - Estado emocional
   - Uso de sustancias como regulación
   - Autonomía futura
   - Propósito de vida

### Análisis con IA - Panel Médico Multidisciplinario

El sistema envía las respuestas del cuestionario a OpenAI GPT-4 que simula un panel de 11 especialistas médicos evaluando de forma integral al paciente:

**Panel de Especialistas:**
- Cardiólogo, Endocrinólogo, Neurólogo, Geriatra
- Neumólogo del sueño, Nefrólogo, Oncólogo
- Psiquiatra/Psicólogo, Medicina del deporte
- Urólogo/Ginecólogo, Médico integrador (moderador)

**El análisis genera:**
- Evaluaciones especializadas desde cada disciplina
- Identificación de riesgos y banderas de alerta
- Síntesis transversal de trayectorias de riesgo
- Priorización de focos críticos (5, 10, 20 años)
- Lista de temas para discutir con su médico
- Preguntas concretas para llevar a consulta
- Estudios clínicos sugeridos
- Recomendaciones de estilo de vida basadas en evidencia
- Palabras de aliento y motivación personalizada
- Advertencias claras: NO es diagnóstico médico

## Costos de OpenAI

El análisis utiliza el modelo GPT-4-turbo-preview:
- Costo aproximado: $0.03 - $0.05 por análisis
- Tokens utilizados: ~3000-4000 por análisis

Se recomienda monitorear el uso en: https://platform.openai.com/usage

## Modo de Desarrollo (Sin API Key)

Si no tiene una API key configurada, la aplicación proporcionará un análisis básico local sin usar IA. Para habilitar esto, el sistema detectará automáticamente la ausencia de la API key y usará la función `analyzeLocally()`.

## Seguridad

- ✅ El archivo `.env` está en `.gitignore`
- ✅ Las API keys nunca se exponen en el código cliente
- ✅ Las llamadas a OpenAI se hacen desde el cliente (considere backend para producción)

## Estructura del Proyecto

```
src/
├── components/
│   ├── NewWizard.jsx          # Componente principal del cuestionario
│   ├── QuestionRenderer.jsx   # Renderizador de diferentes tipos de preguntas
│   └── Wizard.jsx             # (Legacy) Cuestionario anterior
├── data/
│   └── questionnaire.js       # Estructura completa del cuestionario
├── utils/
│   ├── openaiService.js       # Integración con OpenAI
│   └── healthLogic.js         # (Legacy) Lógica del cuestionario anterior
├── App.jsx                     # Componente principal
└── main.jsx                    # Punto de entrada
```

## Funcionalidades Adicionales

### Descarga y Compartir

Después de completar el análisis, los usuarios pueden:

**Descargar Reporte (TXT)**
- Descarga un archivo de texto con el cuestionario completo, respuestas y análisis
- Formato limpio y profesional para compartir con médicos
- Incluye timestamp y advertencias médicas

**Copiar al Portapapeles**
- Copia el reporte completo para pegarlo donde sea necesario
- Útil para enviar por email, WhatsApp, o guardar en notas
- Confirmación visual cuando se copia exitosamente

**Invitación para Compartir**
- Sección dedicada que invita a compartir la herramienta con familiares
- Botón para copiar el enlace de la aplicación
- Mensaje sobre la importancia de la prevención

## Personalización

### Modificar Preguntas

Edite `src/data/questionnaire.js` para:
- Agregar nuevas preguntas
- Modificar opciones
- Cambiar el orden de las secciones

### Ajustar el Prompt de IA

Edite `src/utils/openaiService.js` función `analyzeWithOpenAI()` para:
- Cambiar el enfoque del análisis
- Ajustar el tono de las recomendaciones
- Modificar la estructura del reporte

## Soporte

Para problemas o preguntas:
- Revise la documentación de OpenAI: https://platform.openai.com/docs
- Consulte los logs del navegador (F12 > Console)
- Verifique que su API key sea válida

## Aviso Legal

Esta aplicación proporciona información general sobre salud con fines educativos. No reemplaza la consulta médica profesional. Siempre consulte con un médico calificado para decisiones de salud.
