import { LoadTransactionsUseCase } from '@/domain/use-cases/load-transactions'
import { makePgTransactionsRepositoryFactory } from '@/main/factories/repositories/postgres/pg-transactions'

export const makeLoadTransactionsUseCaseFactory = (): LoadTransactionsUseCase => {
  return new LoadTransactionsUseCase(makePgTransactionsRepositoryFactory())
}
