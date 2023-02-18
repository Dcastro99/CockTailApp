import { Table, Column, Model, BeforeCreate } from 'sequelize-typescript'
import bcrypt from "bcrypt";
@Table
export class User extends Model {
  
	@Column({unique: true, primaryKey: true, autoIncrement: true, autoIncrementIdentity: true, })
    id!: number

    @Column
    name!: string

    @Column
    email!: string

    @Column
    password!: string

    @BeforeCreate
    static hashPassword(instance: User) {
        if (instance.password) {
            const salt = bcrypt.genSaltSync(10, 'a');
            instance.password = bcrypt.hashSync(instance.password, salt);
           }
      }
}