#!/usr/bin/env node

/**
 * Script para configurar la API key de OpenAI de forma segura
 * Lee de secrets/openai.key y actualiza .env
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const secretsPath = path.join(__dirname, '..', 'secrets', 'openai.key');
const envPath = path.join(__dirname, '..', '.env');

console.log('🔐 Configurando API key de OpenAI...\n');

// Verificar que existe el archivo de secretos
if (!fs.existsSync(secretsPath)) {
  console.error('❌ Error: No se encontró el archivo secrets/openai.key');
  console.log('\n📝 Por favor:');
  console.log('   1. Abre el archivo: secrets/openai.key');
  console.log('   2. Reemplaza PON_TU_API_KEY_AQUI con tu API key real');
  console.log('   3. Guarda el archivo');
  console.log('   4. Vuelve a ejecutar: npm run setup-key\n');
  process.exit(1);
}

// Leer la API key
let apiKey = fs.readFileSync(secretsPath, 'utf8').trim();

// Validar que no esté vacía o sea el placeholder
if (!apiKey || apiKey === 'PON_TU_API_KEY_AQUI') {
  console.error('❌ Error: La API key no ha sido configurada');
  console.log('\n📝 Por favor:');
  console.log('   1. Abre el archivo: secrets/openai.key');
  console.log('   2. Reemplaza PON_TU_API_KEY_AQUI con tu API key real');
  console.log('   3. Guarda el archivo');
  console.log('   4. Vuelve a ejecutar: npm run setup-key\n');
  process.exit(1);
}

// Validar formato básico de la API key
if (!apiKey.startsWith('sk-')) {
  console.error('❌ Error: La API key no parece válida (debe empezar con "sk-")');
  console.log('\n💡 Verifica que hayas copiado la key completa de OpenAI\n');
  process.exit(1);
}

// Leer el archivo .env actual o crear uno nuevo
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Actualizar o agregar la variable VITE_OPENAI_API_KEY
const keyPattern = /^VITE_OPENAI_API_KEY=.*/m;
const newLine = `VITE_OPENAI_API_KEY=${apiKey}`;

if (keyPattern.test(envContent)) {
  // Reemplazar la línea existente
  envContent = envContent.replace(keyPattern, newLine);
  console.log('✅ API key actualizada en .env');
} else {
  // Agregar la nueva línea
  if (!envContent.endsWith('\n') && envContent.length > 0) {
    envContent += '\n';
  }
  envContent += newLine + '\n';
  console.log('✅ API key agregada a .env');
}

// Guardar el archivo .env
fs.writeFileSync(envPath, envContent, 'utf8');

console.log('\n🎉 Configuración completada exitosamente!');
console.log('\n📊 Información:');
console.log(`   - API key: ${apiKey.substring(0, 20)}...${apiKey.substring(apiKey.length - 4)}`);
console.log(`   - Archivo: .env`);
console.log('\n▶️  Ahora puedes ejecutar: npm run dev\n');
