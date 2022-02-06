module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    `${process.env.TS_NODE_DEV === 'DEVELOPMENT' ? 'src' : 'dist'}/infra/repositories/postgres/entities/*.{js,ts}`
  ],
  migrations: [
    `${process.env.TS_NODE_DEV === 'DEVELOPMENT' ? 'src' : 'dist'}/main/database/migrations/*.{js,ts}`
  ],
  cli: {
    migrationsDir: 'src/main/database/migrations'
  }
}
