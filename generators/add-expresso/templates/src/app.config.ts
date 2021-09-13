export const config = {
  name: process.env.APP_NAME || 'app',
  server: {
    binding: {
      port: parseInt(
        process.env.PORT ||
          process.env.APP_PORT ||
          process.env.SERVER_BINDING_PORT ||
          '3000',
        10
      )
    }
  }
}

export type AppConfig = typeof config
