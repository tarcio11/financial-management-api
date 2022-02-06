import { PgTransactionsRepository } from '@/infra/repositories/postgres/pg-transactions-repository'
import { PgConnection } from '@/infra/repositories/postgres/helpers/connection'
import { PgRepository } from '@/infra/repositories/postgres/repository'
import { PgTransactionEntity } from '@/infra/repositories/postgres/entities/transaction'

import { Repository } from 'typeorm'
import { IBackup, IMemoryDb, newDb } from 'pg-mem'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database'
  })
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/repositories/postgres/entities/*.ts']
  })
  await connection.synchronize()
  await PgConnection.getInstance().connect()
  return db
}

describe('PgTransactionsRepository', () => {
  let sut: PgTransactionsRepository
  let connection: PgConnection
  let pgTransactionRepo: Repository<PgTransactionEntity>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgTransactionEntity])
    backup = db.backup()
    pgTransactionRepo = connection.getRepository(PgTransactionEntity)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(async () => {
    backup.restore()
    sut = new PgTransactionsRepository()
  })

  it('should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })
  describe('add()', () => {
    it('should be able to create a transaction', async () => {
      const { id } = await sut.add({
        title: 'any_title',
        amount: 10,
        type: 'income',
        category: 'any_category'
      })

      const pgTransaction = await pgTransactionRepo.findOne(id)

      expect(pgTransaction?.id).toBe(1)
      expect(pgTransaction?.title).toBe('any_title')
    })
  })

  describe('load()', () => {
    it('should be able to load all transactions', async () => {
      await pgTransactionRepo.save({
        title: 'any_title',
        amount: 10,
        type: 'income',
        category: 'any_category'
      })

      const transactions = await sut.load()

      expect(transactions).toBeInstanceOf(Array)
      expect(transactions.length).toBe(1)
    })
  })
})
