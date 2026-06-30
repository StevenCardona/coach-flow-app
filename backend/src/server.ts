import app from "./app";
import { setupAssociations } from "./config/db/associations";
import { sequelize } from "./config/db/db";
import { syncSchema } from "./config/db/sync-schema";
import { PORT } from "./config/env";

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

  try {
    await sequelize.authenticate();
    setupAssociations();
    await syncSchema();

    console.log("Database connected");
  } catch (error) {
    sequelize.close();

    console.error("Unable to connect to the database:", error);
  }
});
