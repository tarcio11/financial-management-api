import { LoadTransactionsUseCase } from '@/domain/use-cases/load-transactions'
import { LoadTransactionsRepository } from '@/domain/use-cases/contracts/transaction-repository'
import { MockProxy, mock } from 'jest-mock-extended'

const makeFakeTransaction = (): LoadTransactionsRepository.Output => ([
  {
    id: 'valid_id',
    title: 'valid title',
    amount: 1,
    type: 'income',
    category: 'valid category',
    created_at: new Date()
  }
])

describe('LoadTransactionsUseCase', () => {
  let sut: LoadTransactionsUseCase
  let loadTransactionsRepositorySpy: MockProxy<LoadTransactionsRepository>
  const makeFakeTransactionSpy = makeFakeTransaction()

  beforeAll(() => {
    loadTransactionsRepositorySpy = mock()
  })

  beforeEach(() => {
    sut = new LoadTransactionsUseCase(loadTransactionsRepositorySpy)
    loadTransactionsRepositorySpy.load.mockResolvedValue(makeFakeTransactionSpy)
  })

  it('Should calls LoadTransactionsRepository correctly', async () => {
    await sut.load()

    expect(loadTransactionsRepositorySpy.load).toHaveBeenCalled()
  })

  it('Should throws if LoadTransactionsRepository throws', async () => {
    loadTransactionsRepositorySpy.load.mockRejectedValue(new Error('error'))

    await expect(sut.load()).rejects.toThrow('error')
  })

  it('Should returns transactions', async () => {
    const transactions = await sut.load()

    expect(transactions).toEqual(makeFakeTransactionSpy)
  })
})
