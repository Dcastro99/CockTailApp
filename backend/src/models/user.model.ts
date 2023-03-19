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
    uid!: string

    @Column
    name!: string

    @Column
    email!: string

    @Column
    displayPhotoLink!: string

	@Column({type: DataType.JSON, allowNull:false})
	userSettings?: JSON

    @Column({type: DataType.JSON, allowNull:false})
	userSocialLinks?: JSON
}