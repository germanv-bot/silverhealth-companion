# SilverHealth - Análisis Integral de Salud y Longevidad

Una aplicación web de evaluación de salud completa con análisis personalizado mediante IA, diseñada para usuarios de todas las edades con énfasis en accesibilidad.

![SilverHealth](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)

## 🎯 Características Principales

### Cuestionario Integral
**18 preguntas estructuradas en 3 partes:**

1. **Parte 1 - Hábitos y Funcionamiento Diario**
   - Sexo biológico
   - Sueño (horas, calidad, apnea)
   - Energía y vitalidad
   - Actividad física y capacidad funcional
   - Alimentación y hidratación
   - Consumo de alcohol y tabaco
   - Manejo del estrés
   - Función cognitiva (memoria, caídas)
   - Uso de sustancias recreativas

2. **Parte 2 - Historia Médica y Riesgos**
   - Enfermedades diagnosticadas
   - Medicamentos actuales
   - Suplementos
   - Antecedentes familiares (enfermedades hereditarias)

3. **Parte 3 - Factores de Longevidad**
   - Función sexual
   - Estado emocional (depresión, ansiedad)
   - Uso de sustancias como regulación
   - Miedos sobre el envejecimiento
   - Propósito de vida

### Análisis con IA Avanzada - Panel Médico Multidisciplinario

Integración con **OpenAI GPT-4** que simula un panel de 11 especialistas médicos:

**Especialistas del Panel:**
- Cardiólogo clínico y preventivo
- Endocrinólogo-metabolista
- Neurólogo especializado en envejecimiento cognitivo
- Geriatra enfocado en alta funcionalidad
- Neumólogo especialista en trastornos del sueño
- Nefrólogo preventivo
- Oncólogo de detección temprana
- Psiquiatra/psicólogo clínico
- Especialista en medicina del deporte y fuerza
- Urólogo-andrólogo / ginecólogo (según sexo)
- Médico integrador de longevidad (moderador)

**El análisis incluye:**
- ✅ **Evaluaciones especializadas** desde cada disciplina médica
- ✅ **Identificación de riesgos** y banderas rojas/amarillas
- ✅ **Síntesis integradora** de trayectorias de riesgo
- ✅ **Priorización** de focos críticos a 5, 10 y 20 años
- ✅ **Lista de temas** para discutir con su médico
- ✅ **Preguntas concretas** para llevar a consulta
- ✅ **Estudios sugeridos** a considerar
- ✅ **Recomendaciones** basadas en evidencia científica
- ✅ **Palabras de aliento** y motivación personalizada
- ✅ **Advertencias claras** de que NO es diagnóstico médico

### Interfaz Profesional

- 🎨 Diseño moderno con gradientes y animaciones suaves
- 🇪🇸 100% en español
- 📊 Barra de progreso visual
- 🔄 Navegación intuitiva adelante/atrás
- ♿ Accesible: texto grande, alto contraste, touch-friendly
- 📱 Responsive: funciona en móviles, tablets y desktop
- 💾 **Descarga del reporte completo** en formato TXT
- 📋 **Copia al portapapeles** del análisis completo
- 🔗 **Invitación para compartir** con familiares y amigos

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar API Key de OpenAI

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

Editar `.env` y agregar su API key:
```env
VITE_OPENAI_API_KEY=sk-proj-tu-api-key-aqui
```

**Obtener API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)

### 3. Ejecutar la Aplicación

```bash
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en su navegador.

### 💡 Modo de Desarrollo (Sin API Key)

Si no configura una API key, la aplicación usará automáticamente un análisis básico local sin IA.

## 📋 Tipos de Preguntas Soportados

El cuestionario maneja múltiples tipos de inputs:

- **Radio buttons**: Selección única entre opciones
- **Checkboxes**: Selección múltiple
- **Textarea**: Respuestas de texto libre extensas
- **Number**: Campos numéricos
- **Campos "Otro"**: Opción para especificar respuestas personalizadas

## 💰 Costos de OpenAI

El análisis utiliza GPT-4-turbo-preview:
- **Costo por análisis**: $0.03 - $0.05 USD
- **Tokens utilizados**: ~3000-4000 por análisis
- **Modelo**: `gpt-4-turbo-preview`

Monitoree su uso en: [OpenAI Usage](https://platform.openai.com/usage)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── NewWizard.jsx          # Cuestionario principal con navegación
│   └── QuestionRenderer.jsx   # Renderiza diferentes tipos de preguntas
├── data/
│   └── questionnaire.js       # Estructura completa del cuestionario
├── utils/
│   └── openaiService.js       # Integración con OpenAI + análisis local
├── App.jsx                     # Componente raíz de la aplicación
└── main.jsx                    # Punto de entrada
```

## 💾 Funcionalidades de Descarga y Compartir

### Descarga del Reporte Completo

Después de completar el análisis, el usuario puede:

1. **Descargar como archivo TXT**
   - Incluye el cuestionario completo con todas las respuestas
   - Incluye el análisis detallado del panel médico
   - Formato limpio y legible para compartir con médicos
   - Nombre del archivo: `SilverHealth_Reporte_YYYY-MM-DD.txt`

2. **Copiar al portapapeles**
   - Copia el reporte completo para pegarlo en email, WhatsApp, etc.
   - Confirmación visual cuando se copia exitosamente
   - Compatible con todos los navegadores modernos

3. **Compartir la aplicación**
   - Sección dedicada para invitar a familiares y amigos
   - Botón para copiar el enlace de la aplicación
   - Mensaje motivador sobre la importancia de la prevención

### Estructura del Reporte Descargable

El archivo descargado contiene:

```
═══════════════════════════════════════════════════
    SILVERHEALTH - ANÁLISIS INTEGRAL DE SALUD
═══════════════════════════════════════════════════

Fecha del análisis: [timestamp]

⚠️ AVISO MÉDICO IMPORTANTE:
Este documento NO constituye un diagnóstico médico...

═══════════════════════════════════════════════════

SECCIÓN 1: CUESTIONARIO COMPLETADO
[Todas las preguntas con sus respuestas...]

SECCIÓN 2: ANÁLISIS DEL PANEL MÉDICO
[Análisis completo generado por IA...]

═══════════════════════════════════════════════════
Generado por SilverHealth
═══════════════════════════════════════════════════
```

## 🔧 Personalización

### Modificar Preguntas

Editar `src/data/questionnaire.js`:

```javascript
{
  id: 'mi_pregunta',
  type: 'radio', // o 'checkbox', 'textarea', 'number'
  category: 'Categoría',
  question: '¿Tu pregunta aquí?',
  options: [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' }
  ]
}
```

### Ajustar Análisis de IA

Editar el prompt en `src/utils/openaiService.js` función `analyzeWithOpenAI()` para:
- Cambiar el enfoque médico
- Ajustar el tono
- Modificar la estructura del reporte
- Agregar secciones específicas

## 🔒 Seguridad

- ✅ `.env` está en `.gitignore`
- ✅ API keys nunca expuestas en código cliente
- ⚠️ Las llamadas a OpenAI se hacen desde el cliente
- 🔐 Para producción, considere implementar un backend proxy

## 📚 Documentación

- **[SETUP.md](./SETUP.md)**: Guía completa de configuración
- **[CONFIGURAR_API_KEY.md](./CONFIGURAR_API_KEY.md)**: Guía paso a paso para configurar OpenAI
- **[docs/PANEL_MEDICO.md](./docs/PANEL_MEDICO.md)**: Explicación detallada del panel médico multidisciplinario
- **[docs/DESCARGAR_Y_COMPARTIR.md](./docs/DESCARGAR_Y_COMPARTIR.md)**: Guía completa de funcionalidades de descarga y compartir
- **[.env.example](./.env.example)**: Plantilla de variables de entorno

## ⚕️ Aviso Legal

Esta aplicación proporciona información general sobre salud con fines educativos. **NO reemplaza la consulta médica profesional**. Siempre consulte con un médico calificado para decisiones de salud.

## 🛠️ Tecnologías Utilizadas

- **React 18**: Biblioteca de UI
- **Vite 5**: Build tool y dev server
- **Tailwind CSS 3**: Framework de CSS utility-first
- **OpenAI GPT-4**: Motor de análisis con IA
- **PostCSS**: Procesamiento de CSS

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Cree una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit sus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abra un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 📧 Soporte

Para problemas o preguntas:
- Revise [SETUP.md](./SETUP.md)
- Consulte los logs del navegador (F12 > Console)
- Verifique la [documentación de OpenAI](https://platform.openai.com/docs)

---

**SilverHealth** © 2026 - Tu privacidad es nuestra prioridad
