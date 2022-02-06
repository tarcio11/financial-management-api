export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined
      ? 'Required field'
      : `Required field: ${fieldName}`
    super(message)
    this.name = 'RequiredFieldError'
  }
}
