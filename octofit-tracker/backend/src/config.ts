import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

export function getApiBaseUrl(): string {
  const codespace = process.env.CODESPACE_NAME
  const port = process.env.PORT ? process.env.PORT : String(PORT)

  if (codespace) {
    // Codespaces preview URL for the forwarded port
    return `https://${codespace}-${port}.app.github.dev`
  }

  return `http://localhost:${port}`
}

export { PORT }
