import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from './user.model';
@Table
export class Cocktail extends Model {
  
	@Column({unique: true, primaryKey: true, autoIncrement: true, autoIncrementIdentity: true, })
    id!: number

    @Column
    name!: string

	
	@Column
	@ForeignKey(() => User)
	userId!: number

	@BelongsTo(() => User, {targetKey: 'id'})
	user?: User
}