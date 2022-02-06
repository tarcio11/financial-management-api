import { AddTransaction } from '@/domain/entities/transaction'
import { Controller } from '@/presentation/controllers/controller'
import { HttpResponse, ok } from '@/presentation/helpers/http'
import { Validator } from '@/validation/validator'
import { ValidationBuilder as Builder } from '@/validation/builder'

export class TransactionController extends Controller {
  constructor (private readonly addTransaction: AddTransaction) {
    super()
  }

  override async perform (request: TransactionController.Request): Promise<HttpResponse> {
    const { title, amount, type, category } = request
    const transaction = await this.addTransaction.add({ title, amount, type, category })

    return ok(transaction)
  }

  override buildValidators ({ title, amount, category, type }: TransactionController.Request): Validator[] {
    return [
      ...Builder.of({ value: title, fieldName: 'title' })
        .required()
        .build(),
      ...Builder.of({ value: amount, fieldName: 'amount' })
        .required()
        .build(),
      ...Builder.of({ value: category, fieldName: 'category' })
        .required()
        .build(),
      ...Builder.of({ value: type, fieldName: 'type' })
        .required()
        .type({ type: type })
        .build()
    ]
  }
}

export namespace TransactionController {
  export type Request = {
    title: string
    amount: number
    type: string
    category: string
  }
}
