import { TransactionController } from '@/presentation/controllers/add-transactions'
import { Controller } from '@/presentation/controllers/controller'
import { AddTransaction } from '@/domain/entities/transaction'
import { ok } from '@/presentation/helpers/http'
import { ServerError } from '@/domain/errors/server-error'

import { MockProxy, mock } from 'jest-mock-extended'

let dateNowSpy

const makeFakeTransaction = (): AddTransaction.output => ({
  id: 'any_id',
  title: 'any_title',
  amount: 1,
  type: 'income',
  category: 'any_category',
  created_at: dateNowSpy
})

const makeTransactionParams = (): TransactionController.Request => ({
  title: 'any_title',
  amount: 1,
  type: 'income',
  category: 'any_category'
})

describe('TransactionController', () => {
  let sut: TransactionController
  let addTransactionSpy: MockProxy<AddTransaction>

  beforeAll(() => {
    addTransactionSpy = mock()
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000)
  })

  beforeEach(() => {
    sut = new TransactionController(addTransactionSpy)
    addTransactionSpy.add.mockResolvedValue(makeFakeTransaction())
  })

  it('Should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('Should build Validators correctly', () => {
    const validators = sut.buildValidators(makeTransactionParams())
    expect(validators).toHaveLength(5)
  })

  it('Should calls AddTransaction with correct values', async () => {
    const httpRequest = makeTransactionParams()
    const expectedTransaction = {
      title: httpRequest.title,
      amount: httpRequest.amount,
      type: httpRequest.type,
      category: httpRequest.category
    }

    await sut.perform(httpRequest)

    expect(addTransactionSpy.add).toHaveBeenCalledWith(expectedTransaction)
  })

  it('Should return 500 if AddTransaction throws', async () => {
    const error = new Error('infra_error')
    addTransactionSpy.add.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(makeTransactionParams())

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('Should return 200 if valid data is provided', async () => {
    const httpRequest = makeTransactionParams()

    const httpResponse = await sut.perform(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeTransaction()))
  })
})
