import expresso from '@expresso/app'
import { createApp } from '@expresso/router'
import { getRoutes } from './endpoints'

export const appFactory = expresso((app) => {
  const routes = getRoutes()

  createApp({
    app,
    openApiInfo: {
      info: {
        title: '<%= apiName %>',
        version: '<%= apiVersion %>',
        description: '<%= apiDescription %>',
        contact: {
          name: '<%= authorName %>',
          email: '<%= authorEmail %>'
        },
        license: {
          name: '<%= licenseName %>',
          url: '<%= licenseUrl %>'
        }
      },
      openapi: '3.0.1'
    },
    routing: routes,
    documentation: {
      ui: {
        endpoint: '/docs'
      }
    }
  })
})
