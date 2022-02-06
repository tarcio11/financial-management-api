import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm'

@Entity('transactions')
export class PgTransactionEntity {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  title: string

  @Column()
  amount: number

  @Column()
  type: string

  @Column()
  category: string

  @CreateDateColumn()
  created_at: Date
}
