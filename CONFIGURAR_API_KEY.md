# 🔐 Guía Rápida: Configurar API Key de OpenAI

## ✅ Sistema de Seguridad Implementado

Tu API key estará protegida con:
- ✅ Carpeta `secrets/` en `.gitignore`
- ✅ Archivo `.env` en `.gitignore`
- ✅ Scripts automatizados para configuración segura

## 📝 Pasos para Configurar

### Paso 1: Editar el archivo de secretos

Abre el archivo: **`secrets/openai.key`**

Verás esto:
```
PON_TU_API_KEY_AQUI
```

Reemplázalo con tu API key de OpenAI (sin comillas, sin espacios):
```
sk-proj-tu_api_key_completa_aqui
```

**Guarda el archivo** (Ctrl+S o Cmd+S)

### Paso 2: Ejecutar el script de configuración

Abre la terminal y ejecuta:

```bash
npm run setup-key
```

Este comando:
- ✅ Lee tu API key desde `secrets/openai.key`
- ✅ Valida que sea correcta
- ✅ La copia automáticamente a `.env`
- ✅ Te muestra confirmación

### Paso 3: Verificar configuración (opcional)

Para verificar que todo está correcto:

```bash
npm run check-key
```

### Paso 4: ¡Listo para usar!

Ahora puedes ejecutar la aplicación:

```bash
npm run dev
```

---

## 🔒 Seguridad

### ¿Qué archivos están protegidos?

Tu `.gitignore` ya está configurado para **nunca** subir:
- ✅ `secrets/` - Carpeta completa
- ✅ `.env` - Variables de entorno
- ✅ `*.key` - Archivos de llaves
- ✅ `*.secret` - Archivos secretos

### ¿Dónde está mi API key?

1. **`secrets/openai.key`** - Tu copia maestra (editable por ti)
2. **`.env`** - Usada por la aplicación (auto-generada)

Ambos archivos están protegidos y NO se subirán a Git.

---

## ❓ Preguntas Frecuentes

### ¿Cómo obtengo una API key de OpenAI?

1. Ve a: https://platform.openai.com/api-keys
2. Crea una cuenta o inicia sesión
3. Haz clic en "Create new secret key"
4. Copia la key completa (empieza con `sk-proj-` o `sk-`)
5. Pégala en `secrets/openai.key`

### ¿Cuánto cuesta usar OpenAI?

- **Por análisis**: $0.03 - $0.05 USD
- **Modelo usado**: GPT-4-turbo-preview
- Monitorea tu uso: https://platform.openai.com/usage

### ¿Qué pasa si no tengo API key?

La aplicación funcionará en "modo básico" con análisis local sin IA.

### ¿Mi API key está segura?

Sí, siempre que:
- ✅ No compartas tu carpeta `secrets/`
- ✅ No subas `.env` a repositorios públicos
- ✅ No pegues tu API key en chats públicos

El sistema ya está configurado para proteger estos archivos automáticamente.

---

## 🆘 Solución de Problemas

### Error: "API key no configurada"

1. Verifica que editaste `secrets/openai.key`
2. Asegúrate de que la key empiece con `sk-`
3. Ejecuta: `npm run check-key`

### Error: "Variable no encontrada en .env"

Ejecuta de nuevo:
```bash
npm run setup-key
```

### La aplicación no reconoce mi API key

1. Detén el servidor (Ctrl+C)
2. Ejecuta: `npm run setup-key`
3. Inicia de nuevo: `npm run dev`

---

## 📞 Necesitas Ayuda?

- Lee: `secrets/README.md`
- Verifica: `npm run check-key`
- Revisa: Los logs de la consola del navegador (F12)
