import { LoadTransactionsRepository } from '@/domain/use-cases/contracts/transaction-repository'

export class LoadTransactionsUseCase {
  constructor (private readonly transactionRepository: LoadTransactionsRepository) {}

  async load (): Promise<LoadTransactionsRepository.Output> {
    return await this.transactionRepository.load()
  }
}
