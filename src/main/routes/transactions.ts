import { adaptExpressRoute as adapt } from '@/main/adapters/express-router'
import { makeTransactionControllerFactory } from '@/main/factories/presentation/controller/add-transactions'
import { makeLoadTransactionControllerFactory } from '@/main/factories/presentation/controller/load-transactions'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/transactions', adapt(makeTransactionControllerFactory()))
  router.get('/transactions', adapt(makeLoadTransactionControllerFactory()))
}
