import { DataSource } from "typeorm";
import { StaffEntity } from "./models/staffModel";
import { ClientEntity } from "./models/clientModel";
import { AppointmentEntity } from "./models/appointmentModel";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "./main.sqlite",
  synchronize: true,
  logging: true,
  entities: [StaffEntity, ClientEntity, AppointmentEntity],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getDataSource = (): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    if (AppDataSource.isInitialized) resolve(AppDataSource);
    else reject("Failed to create connection with database");
  });
};
