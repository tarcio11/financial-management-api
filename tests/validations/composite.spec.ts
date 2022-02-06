import { ValidationComposite } from '@/validation/composite'
import { Validator } from '@/validation/validator'
import { MockProxy, mock } from 'jest-mock-extended'

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let validator1: MockProxy<Validator>
  let validator2: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validator1 = mock<Validator>()
    validator1.validate.mockReturnValue(undefined)
    validator2 = mock<Validator>()
    validator2.validate.mockReturnValue(undefined)

    validators = [validator1, validator2]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('Should return undefined if all validators return undefined', () => {
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('Should return first error if one validator return error', () => {
    validator1.validate.mockReturnValueOnce(new Error('error_01'))
    validator2.validate.mockReturnValueOnce(new Error('error_02'))
    const error = sut.validate()

    expect(error).toEqual(new Error('error_01'))
  })

  it('Should return all errors if any validator return error', () => {
    validator2.validate.mockReturnValueOnce(new Error('error_02'))
    const error = sut.validate()

    expect(error).toEqual(new Error('error_02'))
  })
})
