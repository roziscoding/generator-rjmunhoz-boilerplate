import server from '@expresso/server'
import { AppConfig } from '../app.config'
import { appFactory } from './app'

export const startServer = (config: AppConfig) => {
  return server.start(appFactory, config)
}
