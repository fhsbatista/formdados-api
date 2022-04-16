import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { serverError } from '../../presentation/helpers/http/http-helper'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      try {
        await this.logErrorRepository.logError(httpResponse.body.stack)
      } catch (error) {
        return serverError(error)
      }
    }
    return httpResponse
  }
}
