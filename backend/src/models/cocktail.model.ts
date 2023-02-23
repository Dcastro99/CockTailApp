import { Table, Column, Model, BelongsTo, ForeignKey, DataType, NotNull } from 'sequelize-typescript'

import { User } from './user.model';


export class Ingredient {
	name : string = "";
}

export class Ingredients {
	ingredients : Ingredient[] = [];
}

@Table
export class Cocktail extends Model {
  
	@Column({unique: true, primaryKey: true, autoIncrement: true, autoIncrementIdentity: true, })
    id!: number

    @Column
    name!: string

	@Column
    isFavorite!: boolean
	
	@Column
	@ForeignKey(() => User)
	userId!: number

	@BelongsTo(() => User, {targetKey: 'id'})
	user?: User

	@Column({type: DataType.JSON, allowNull:false})
	ingredients?: JSON
}