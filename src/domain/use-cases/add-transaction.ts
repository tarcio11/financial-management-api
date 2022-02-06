import { TransactionsRepository } from '@/domain/use-cases/contracts/transaction-repository'
import { AddTransaction } from '../entities/transaction'

export class TransactionUseCase implements AddTransaction {
  constructor (private readonly transactionsRepository: TransactionsRepository) {}

  async add (input: TransactionsRepository.Input): Promise<TransactionsRepository.Output> {
    const transaction = await this.transactionsRepository.add(input)
    return transaction
  }
}
