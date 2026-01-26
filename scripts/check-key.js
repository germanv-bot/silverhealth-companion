#!/usr/bin/env node

/**
 * Script para verificar la configuración de la API key
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');
const secretsPath = path.join(__dirname, '..', 'secrets', 'openai.key');

console.log('🔍 Verificando configuración de API key...\n');

let hasErrors = false;

// Verificar archivo secrets/openai.key
console.log('1. Verificando secrets/openai.key...');
if (!fs.existsSync(secretsPath)) {
  console.log('   ❌ No existe');
  hasErrors = true;
} else {
  const key = fs.readFileSync(secretsPath, 'utf8').trim();
  if (!key || key === 'PON_TU_API_KEY_AQUI') {
    console.log('   ⚠️  Existe pero no está configurada');
    hasErrors = true;
  } else if (!key.startsWith('sk-')) {
    console.log('   ⚠️  Formato inválido (debe empezar con "sk-")');
    hasErrors = true;
  } else {
    console.log(`   ✅ Configurada: ${key.substring(0, 20)}...${key.substring(key.length - 4)}`);
  }
}

// Verificar archivo .env
console.log('\n2. Verificando archivo .env...');
if (!fs.existsSync(envPath)) {
  console.log('   ❌ No existe');
  hasErrors = true;
} else {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^VITE_OPENAI_API_KEY=(.*)$/m);

  if (!match) {
    console.log('   ❌ Variable VITE_OPENAI_API_KEY no encontrada');
    hasErrors = true;
  } else {
    const key = match[1].trim();
    if (!key || key === 'sk-your-api-key-here') {
      console.log('   ⚠️  Existe pero no está configurada');
      hasErrors = true;
    } else if (!key.startsWith('sk-')) {
      console.log('   ⚠️  Formato inválido');
      hasErrors = true;
    } else {
      console.log(`   ✅ Configurada: ${key.substring(0, 20)}...${key.substring(key.length - 4)}`);
    }
  }
}

// Verificar .gitignore
console.log('\n3. Verificando .gitignore...');
const gitignorePath = path.join(__dirname, '..', '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  const hasEnv = gitignoreContent.includes('.env');
  const hasSecrets = gitignoreContent.includes('secrets/');

  if (hasEnv && hasSecrets) {
    console.log('   ✅ Configurado correctamente');
  } else {
    console.log('   ⚠️  Falta protección completa');
    if (!hasEnv) console.log('      - Falta: .env');
    if (!hasSecrets) console.log('      - Falta: secrets/');
  }
}

// Resultado final
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Configuración incompleta\n');
  console.log('Para configurar tu API key:');
  console.log('  1. Edita: secrets/openai.key');
  console.log('  2. Ejecuta: npm run setup-key\n');
  process.exit(1);
} else {
  console.log('✅ Todo configurado correctamente!\n');
  console.log('Puedes ejecutar: npm run dev\n');
  process.exit(0);
}
