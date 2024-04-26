import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

dotenv.config()


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_ENPOINT_DEV': JSON.stringify(process.env.VITE_ENPOINT_DEV),
    'process.env.VITE_ENPOINT_PROD': JSON.stringify(process.env.VITE_ENPOINT_PROD),
  },
})


