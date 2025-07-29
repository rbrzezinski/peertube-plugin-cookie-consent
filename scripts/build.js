const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')

console.log('Building PeerTube Cookie Consent Plugin (ES6 Module)...')

// Пути файлов
const rootDir = path.join(__dirname, '..')
const sourceFile = path.join(rootDir, 'client', 'common-client-plugin.js')
const distDir = path.join(rootDir, 'dist')
const targetFile = path.join(distDir, 'common-client-plugin.js')

// Создаем папку dist если её нет
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
  console.log('✅ Created dist directory')
}

// Проверяем что исходный файл существует
if (!fs.existsSync(sourceFile)) {
  console.error('❌ Source file not found:', sourceFile)
  console.log('Please create client/common-client-plugin.js first')
  process.exit(1)
}

// Собираем с правильными настройками для PeerTube ES6 модулей
esbuild.build({
  entryPoints: [sourceFile],
  bundle: true,
  outfile: targetFile,
  format: 'esm', // ES Module формат для современного PeerTube
  platform: 'browser',
  target: ['es2020'], // Более современный target
  minify: false,
  sourcemap: false,
  // Включаем все зависимости в bundle
  external: [],
  banner: {
    js: '// PeerTube Cookie Consent Plugin - ES Module'
  }
}).then(() => {
  // Проверяем что файл создался
  const stats = fs.statSync(targetFile)
  
  console.log('✅ Build completed successfully!')
  console.log(`📁 Source: ${sourceFile}`)
  console.log(`📁 Target: ${targetFile}`)
  console.log(`📊 Size: ${Math.round(stats.size / 1024)}KB`)
  
  // Проверяем содержимое на правильный экспорт
  const content = fs.readFileSync(targetFile, 'utf8')
  if (content.includes('export') && content.includes('register')) {
    console.log('✅ ES6 export validation passed - register function found')
  } else {
    console.warn('⚠️  Warning: ES6 export might not be correct')
  }
  
}).catch((error) => {
  console.error('❌ Build failed:', error)
  process.exit(1)
})