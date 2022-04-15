import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  /**
   * Get "routes files" and add them to the router dynamically
  */
  readdirSync(path.join(`${__dirname}`, '/../', 'routes')).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
