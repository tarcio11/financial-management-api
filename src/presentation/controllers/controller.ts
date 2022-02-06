import { badRequest, HttpResponse, serverError } from '@/presentation/helpers/http'
import { ValidationComposite } from '@/validation/composite'
import { Validator } from '@/validation/validator'

export abstract class Controller {
  abstract perform (request: any): Promise<HttpResponse>

  buildValidators (request: any): Validator[] {
    return []
  }

  async handle (request: any): Promise<HttpResponse> {
    const error = this.validate(request)
    if (error !== undefined) return badRequest(error)
    try {
      return await this.perform(request)
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (request: any): Error | undefined {
    const validators = this.buildValidators(request)
    return new ValidationComposite(validators).validate()
  }
}
