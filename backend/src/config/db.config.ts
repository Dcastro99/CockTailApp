import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/user.model';

export const connect = () => {
    const hostName = "localhost";
    const userName = "admin";
    const password = "admin";
    const database = "postgres";
    const dialect: any = "postgres";

    console.log('dialect  ', dialect)

    const operatorsAliases: any = false;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect,
        operatorsAliases,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([User]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    return db;

}