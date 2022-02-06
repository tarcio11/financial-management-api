import { Controller } from '@/presentation/controllers/controller'
import { LoadTransactionsController } from '@/presentation/controllers/load-transactions'
import { makeLoadTransactionsUseCaseFactory } from '@/main/factories/domain/use-cases/load-transactions'

export const makeLoadTransactionControllerFactory = (): Controller => {
  const controller = new LoadTransactionsController(makeLoadTransactionsUseCaseFactory())
  return controller
}
