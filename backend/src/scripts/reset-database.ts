import { setupAssociations } from "../config/db/associations";
import { sequelize } from "../config/db/db";

async function main() {
  try {
    await sequelize.authenticate();
    setupAssociations();
    await sequelize.sync({ force: true });
    console.log("Database reset complete (force: true)");
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    await sequelize.close();
    console.error("Database reset failed:", error);
    process.exit(1);
  }
}

void main();
