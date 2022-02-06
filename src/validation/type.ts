import { InvalidParamError } from '@/domain/errors/invalid-param-error'

export class Type {
  constructor (
    private readonly transactionType: string
  ) {}

  validate (): Error | undefined {
    if (!['income', 'outcome'].includes(this.transactionType)) return new InvalidParamError('type')
  }
}
