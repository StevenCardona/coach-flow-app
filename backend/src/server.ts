import app from "./app";
import { setupAssociations } from "./config/db/associations";
import { sequelize } from "./config/db/db";
import { PORT } from "./config/env";

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

  try {
    await sequelize.authenticate();
    setupAssociations();

    console.log("Database ...");
  } catch (error) {
    sequelize.close();

    console.error("Unable to connect to the database:", error);
  }
});
