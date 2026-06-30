import { setupAssociations } from "../config/db/associations";
import { sequelize } from "../config/db/db";
import { syncSchema } from "../config/db/sync-schema";

async function main() {
  try {
    await sequelize.authenticate();
    setupAssociations();
    await syncSchema();
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    await sequelize.close();
    console.error("Schema sync failed:", error);
    process.exit(1);
  }
}

void main();
