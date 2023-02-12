import 'reflect-metadata';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'sample',
  password: 'sample',
  database: 'sample',
  synchronize: true,
  logging: false,
  entities: ['src/db/entity/*{.ts,.js}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  subscribers: [],
});

export default AppDataSource;

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
