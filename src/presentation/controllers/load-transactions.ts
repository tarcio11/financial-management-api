import { Controller } from '@/presentation/controllers/controller'
import { LoadTransactions } from '@/domain/entities/transaction'
import { HttpResponse, ok } from '@/presentation/helpers/http'

export class LoadTransactionsController extends Controller {
  constructor (private readonly loadTransactionsUseCase: LoadTransactions) {
    super()
  }

  override async perform (): Promise<HttpResponse> {
    const transactions = await this.loadTransactionsUseCase.load()

    return ok(transactions)
  }
}
