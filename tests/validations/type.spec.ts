import { Type } from '@/validation/type'
import { InvalidParamError } from '@/domain/errors/invalid-param-error'

describe('Type', () => {
  it('should throw an error if the type is invalid', () => {
    const type = new Type('invalid')

    const error = type.validate()

    expect(error).toEqual(new InvalidParamError('type'))
  })

  it('should not throw an error if the type is valid', () => {
    const type = new Type('income')
    expect(type.validate).not.toThrowError(InvalidParamError)
  })
})
