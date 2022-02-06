import { ValidationComposite } from '@/validation/composite'
import { HttpResponse } from '@/presentation/helpers/http'
import { Controller } from '@/presentation/controllers/controller'
import { ServerError } from '@/domain/errors/server-error'

import { mocked } from 'ts-jest/utils'

jest.mock('@/validation/composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (request: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('Should return 400 if validation fails', async () => {
    const error = new Error('Validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle('any_request')

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('Should return 500 if perform throws', async () => {
    const error = new Error('Perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle('any_request')

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('Should return 500 if perform throws a non error object', async () => {
    const error = 'Perform_error'
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle('any_request')

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })

  it('Should return same result as perform', async () => {
    const httpResponse = await sut.handle('any_request')

    expect(httpResponse).toEqual(sut.result)
  })
})
