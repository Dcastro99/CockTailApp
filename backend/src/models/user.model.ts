import { Table, Column, Model, BeforeCreate, DataType } from 'sequelize-typescript'
import bcrypt from "bcrypt";

export class UserSettings {
    geolocationOn?: boolean = false;
    geolocationDistance?: number = 0;
}

export class UserSocialLink {
    name?: string = "";
    link?: string = "";
}

export class UserSocialList {
    links : UserSocialLink[] = [];
}

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

    @Column
    displayPhotoLink!: string

	@Column({type: DataType.JSON, allowNull:false})
	userSettings?: JSON

    @Column({type: DataType.JSON, allowNull:false})
	userSocialLinks?: JSON

    @BeforeCreate
    static hashPassword(instance: User) {
        if (instance.password) {
            const salt = bcrypt.genSaltSync(10, 'a');
            instance.password = bcrypt.hashSync(instance.password, salt);
           }
      }
}