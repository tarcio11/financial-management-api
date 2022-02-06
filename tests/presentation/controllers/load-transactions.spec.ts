import { LoadTransactionsController } from '@/presentation/controllers/load-transactions'
import { Controller } from '@/presentation/controllers/controller'
import { MockProxy, mock } from 'jest-mock-extended'
import { LoadTransactions } from '@/domain/entities/transaction'
import { ServerError } from '@/domain/errors/server-error'

let dateNowSpy

const makeFakeTransaction = (): LoadTransactions.output => ([
  {
    id: 'any_id',
    title: 'any_title',
    amount: 1,
    type: 'income',
    category: 'any_category',
    created_at: dateNowSpy
  }
])

describe('LoadTransactionsController', () => {
  let sut: LoadTransactionsController
  let loadTransactionsSpy: MockProxy<LoadTransactions>

  beforeAll(async () => {
    loadTransactionsSpy = mock()
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000)
  })

  beforeEach(async () => {
    sut = new LoadTransactionsController(loadTransactionsSpy)
    loadTransactionsSpy.load.mockResolvedValue(makeFakeTransaction())
  })

  it('Should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should calls LoadTransactions with correctly', async () => {
    await sut.perform()
    expect(loadTransactionsSpy.load).toHaveBeenCalled()
  })

  it('Should returns an array of transactions', async () => {
    const httpResponse = await sut.perform()
    expect(httpResponse.data).toEqual(makeFakeTransaction())
  })

  it('Should throws if LoadTransactions throws', async () => {
    const error = new Error('infra_error')
    loadTransactionsSpy.load.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
