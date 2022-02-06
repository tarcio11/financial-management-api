import { Controller } from '@/presentation/controllers/controller'
import { TransactionController } from '@/presentation/controllers/add-transactions'
import { makeAddTransactionUseCaseFactory } from '@/main/factories/domain/use-cases/add-transactions'

export const makeTransactionControllerFactory = (): Controller => {
  const controller = new TransactionController(makeAddTransactionUseCaseFactory())
  return controller
}
