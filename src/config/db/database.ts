import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

class Database {
    private static instance: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            const dbName = process.env.DB_DATABASENAME as string;
            const dbUser = process.env.DB_USER as string;
            const dbPassword = process.env.DB_PASSWORD as string;
            const dbHost = process.env.DB_HOST as string;
            const dbPort = process.env.DB_PORT as string;

            if (!dbName || !dbUser || !dbPassword || !dbHost || !dbPort) {
                throw new Error(
                    'Está faltando uma ou mais variáveis de ambiente para o banco de dados',
                );
            }

            Database.instance = new Sequelize(dbName, dbUser, dbPassword, {
                host: dbHost,
                port: parseInt(dbPort, 10),
                dialect: 'mysql',
                logging: console.log,

                define: {
                    timestamps: true,
                    underscored: true,
                    createdAt: 'created_at',
                    updatedAt: 'updated_at',
                },
            });
        }

        return Database.instance;
    }
}

const sequelizeConnection = Database.getInstance();

export { sequelizeConnection };
