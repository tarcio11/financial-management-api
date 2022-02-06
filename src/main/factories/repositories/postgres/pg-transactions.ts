import { PgTransactionsRepository } from '@/infra/repositories/postgres/pg-transactions-repository'

export const makePgTransactionsRepositoryFactory = (): PgTransactionsRepository => {
  return new PgTransactionsRepository()
}
