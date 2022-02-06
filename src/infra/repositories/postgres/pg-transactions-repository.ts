import { TransactionsRepository, LoadTransactionsRepository } from '@/domain/use-cases/contracts/transaction-repository'
import { PgRepository } from '@/infra/repositories/postgres/repository'
import { PgTransactionEntity } from '@/infra/repositories/postgres/entities/transaction'

export class PgTransactionsRepository extends PgRepository implements TransactionsRepository, LoadTransactionsRepository {
  async add (input: TransactionsRepository.Input): Promise<TransactionsRepository.Output> {
    const pgTransactionRepository = this.getRepository(PgTransactionEntity)
    const transaction = pgTransactionRepository.create(input)
    await pgTransactionRepository.save(transaction)
    return transaction
  }

  async load (): Promise<LoadTransactionsRepository.Output> {
    const pgTransactionRepository = this.getRepository(PgTransactionEntity)
    const transactions = await pgTransactionRepository.find()
    return transactions
  }
}
