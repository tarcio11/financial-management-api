import { TransactionUseCase } from '@/domain/use-cases/add-transaction'
import { makePgTransactionsRepositoryFactory } from '@/main/factories/repositories/postgres/pg-transactions'

export const makeAddTransactionUseCaseFactory = (): TransactionUseCase => {
  return new TransactionUseCase(makePgTransactionsRepositoryFactory())
}
