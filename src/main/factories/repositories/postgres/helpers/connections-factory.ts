import { PgConnection } from '@/infra/repositories/postgres/helpers/connection'

export const makePgConnectionFactory = (): PgConnection => {
  return PgConnection.getInstance()
}
