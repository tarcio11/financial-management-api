import { Required, RequiredString } from '@/validation/required'
import { RequiredFieldError } from '@/validation/errors'

describe('Required', () => {
  it('Should return RequiredError if value is null', () => {
    const sut = new Required(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return RequiredError if value is undefined', () => {
    const sut = new Required(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return undefined if value is not null or undefined', () => {
    const sut = new Required('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredString', () => {
  it('Should extends Required', () => {
    const sut = new Required('')

    expect(sut).toBeInstanceOf(Required)
  })

  it('Should return RequiredError if value is empty', () => {
    const sut = new RequiredString('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('Should return undefined if value is not empty', () => {
    const sut = new RequiredString('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
