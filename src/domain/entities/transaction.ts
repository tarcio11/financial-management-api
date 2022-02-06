export interface AddTransaction {
  add: (transaction: AddTransaction.input) => Promise<AddTransaction.output>
}

export interface LoadTransactions {
  load: () => Promise<LoadTransactions.output>
}

export namespace AddTransaction {
  export type input = {
    title: string
    amount: number
    type: string
    category: string
  }

  export type output = Transaction
}

export namespace LoadTransactions {
  export type output = Transaction[]
}

export type Transaction = {
  id: string
  title: string
  amount: number
  type: string
  category: string
  created_at: Date
}
