const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')

console.log('Starting build process...')

// Переходим в корневую директорию проекта (на уровень выше scripts)
const rootDir = path.join(__dirname, '..')
const clientDir = path.join(rootDir, 'client')
const distDir = path.join(rootDir, 'dist')

console.log('Root directory:', rootDir)
console.log('Client directory:', clientDir)
console.log('Dist directory:', distDir)

// Создаем директории если они не существуют
if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir, { recursive: true })
  console.log('Created client directory')
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
  console.log('Created dist directory')
}

// Проверяем что исходный файл существует
const clientFile = path.join(clientDir, 'common-client-plugin.js')
if (!fs.existsSync(clientFile)) {
  console.error('Error: client/common-client-plugin.js not found!')
  console.log('Please create this file first.')
  console.log('Expected location:', clientFile)
  process.exit(1)
}

// Собираем проект с правильными настройками для PeerTube
esbuild.build({
  entryPoints: [clientFile],
  bundle: true,
  outfile: path.join(distDir, 'common-client-plugin.js'),
  format: 'cjs', // CommonJS формат для PeerTube
  platform: 'browser',
  target: ['es2017'],
  minify: false, // Оставляем без минификации для отладки
  sourcemap: false,
  // Важно: убираем globalName, так как PeerTube работает с CommonJS модулями
  banner: {
    js: '// PeerTube Cookie Consent Plugin - Client Script'
  }
}).then(() => {
  console.log('✅ Build completed successfully!')
  
  // Проверяем содержимое созданного файла
  const outputFile = path.join(distDir, 'common-client-plugin.js')
  const content = fs.readFileSync(outputFile, 'utf8')
  
  // Проверяем, что файл содержит правильный экспорт
  if (content.includes('module.exports') && content.includes('register')) {
    console.log('✅ Export validation passed - register function found')
  } else {
    console.warn('⚠️  Warning: register function might not be properly exported')
  }
  
  console.log('Generated:', outputFile)
  console.log('File size:', Math.round(fs.statSync(outputFile).size / 1024) + 'KB')
  
}).catch((error) => {
  console.error('❌ Build failed:', error)
  process.exit(1)
})