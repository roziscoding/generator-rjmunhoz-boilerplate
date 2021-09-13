import { config } from './app.config'
import { startServer } from './presentation/server'

startServer(config).catch((err) => {
  console.error(err)
  process.exit(1)
})
