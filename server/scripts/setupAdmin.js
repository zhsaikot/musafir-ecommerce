import dotenv from 'dotenv'
import fs from 'node:fs/promises'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

dotenv.config()

const prompt = readline.createInterface({ input, output })
const ask = async (label, fallback = '') => {
  const value = await prompt.question(`${label}${fallback ? ` [${fallback}]` : ''}: `)
  return value.trim() || fallback
}

try {
  console.log('MUSAFIR admin setup. Values are written only to server/.env.\n')
  const mongoUri = await ask('MongoDB connection URI')
  const jwtSecret = await ask('JWT secret', 'change-this-secret-before-production')
  const name = await ask('Admin name', 'Musafir Admin')
  const email = await ask('Admin email')
  const phone = await ask('Admin phone')
  const password = await ask('Admin password')

  if (!mongoUri || !email || !phone || !password) {
    throw new Error('MongoDB URI, admin email, phone, and password are required.')
  }

  const env = [
    `MONGO_URI=${mongoUri}`,
    `JWT_SECRET=${jwtSecret}`,
    'PORT=5000',
    `ADMIN_NAME=${name}`,
    `ADMIN_EMAIL=${email}`,
    `ADMIN_PHONE=${phone}`,
    `ADMIN_PASSWORD=${password}`,
    '',
  ].join('\n')

  await fs.writeFile('.env', env, 'utf8')
  console.log('\nserver/.env created. Now run: npm run create-admin')
} catch (error) {
  console.error(`\nSetup failed: ${error.message}`)
  process.exitCode = 1
} finally {
  prompt.close()
}