import { TransactionUseCase } from '@/domain/use-cases/add-transaction'
import { AddTransaction } from '@/domain/entities/transaction'
import { TransactionsRepository } from '@/domain/use-cases/contracts/transaction-repository'

import { MockProxy, mock } from 'jest-mock-extended'

let dateNowSpy

const mockFakeTransaction = (): AddTransaction.output => ({
  id: 'valid_id',
  title: 'valid title',
  amount: 1,
  type: 'income',
  category: 'valid category',
  created_at: dateNowSpy
})

const makeTransactionParams = (): AddTransaction.input => ({
  title: 'valid title',
  amount: 1,
  type: 'income',
  category: 'valid category'
})

describe('TransactionUseCase', () => {
  let sut: TransactionUseCase
  let transactionsRepositorySpy: MockProxy<TransactionsRepository>

  beforeAll(() => {
    transactionsRepositorySpy = mock()
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000)
  })

  beforeEach(() => {
    sut = new TransactionUseCase(transactionsRepositorySpy)
    transactionsRepositorySpy.add.mockResolvedValue(mockFakeTransaction())
  })

  it('Should calls TransactionsRepository with correct values', async () => {
    const input = makeTransactionParams()

    await sut.add(input)
    expect(transactionsRepositorySpy.add).toHaveBeenCalledWith(input)
  })

  it('Should trows if TransactionsRepository throws', async () => {
    transactionsRepositorySpy.add.mockRejectedValue(new Error('any_error'))

    const promise = sut.add(makeTransactionParams())
    await expect(promise).rejects.toThrow('any_error')
  })

  it('Should return the correct data', async () => {
    const input = makeTransactionParams()

    const output = await sut.add(input)
    expect(output).toEqual(mockFakeTransaction())
  })
})
