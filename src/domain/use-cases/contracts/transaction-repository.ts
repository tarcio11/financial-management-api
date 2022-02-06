import { AddTransaction, Transaction } from '@/domain/entities/transaction'

export interface TransactionsRepository {
  add: (input: TransactionsRepository.Input) => Promise<TransactionsRepository.Output>
}

export interface LoadTransactionsRepository {
  load: () => Promise<LoadTransactionsRepository.Output>
}

export namespace LoadTransactionsRepository {
  export type Output = Transaction[]
}

export namespace TransactionsRepository {
  export type Input = AddTransaction.input
  export type Output = AddTransaction.output
}
