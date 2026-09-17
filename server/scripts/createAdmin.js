import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'

dotenv.config()

const required = ['MONGO_URI', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'ADMIN_NAME', 'ADMIN_PHONE']
const missing = required.filter((key) => !process.env[key])

if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(', ')}`)
  process.exit(1)
}

try {
  await mongoose.connect(process.env.MONGO_URI)
  const email = process.env.ADMIN_EMAIL.toLowerCase().trim()
  const existingUser = await User.findOne({ email }).select('+password')

  if (existingUser) {
    existingUser.name = process.env.ADMIN_NAME
    existingUser.phone = process.env.ADMIN_PHONE
    existingUser.password = process.env.ADMIN_PASSWORD
    existingUser.role = 'admin'
    await existingUser.save()
    console.log(`Admin access updated for ${email}`)
  } else {
    await User.create({ name: process.env.ADMIN_NAME, email, phone: process.env.ADMIN_PHONE, password: process.env.ADMIN_PASSWORD, role: 'admin' })
    console.log(`Admin account created for ${email}`)
  }
} catch (error) {
  console.error(`Could not create admin account: ${error.message}`)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}