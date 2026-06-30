import { sequelize } from "./db";

export async function syncSchema(): Promise<void> {
  await sequelize.sync({ alter: true });
  console.log("Database schema synchronized (alter: true)");
}
