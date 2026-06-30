"use strict";

const COACH_ID_TABLES = [
  "students",
  "invitations",
  "plans",
  "workout_plans",
  "nutritional_plans",
];

/** @param {import('sequelize').QueryInterface} queryInterface */
async function dropCoachIdForeignKeys(queryInterface, tableName) {
  const [constraints] = await queryInterface.sequelize.query(
    `
    SELECT tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
      AND tc.table_schema = 'public'
      AND tc.table_name = :tableName
      AND kcu.column_name = 'coach_id'
    `,
    { replacements: { tableName } },
  );

  for (const row of constraints) {
    await queryInterface.removeConstraint(tableName, row.constraint_name);
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("coaches", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    for (const tableName of COACH_ID_TABLES) {
      await dropCoachIdForeignKeys(queryInterface, tableName);

      await queryInterface.addConstraint(tableName, {
        fields: ["coach_id"],
        type: "foreign key",
        name: `${tableName}_coach_id_fkey`,
        references: {
          table: "coaches",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });
    }
  },

  async down(queryInterface) {
    for (const tableName of COACH_ID_TABLES) {
      await queryInterface.removeConstraint(
        tableName,
        `${tableName}_coach_id_fkey`,
      );
    }

    await queryInterface.dropTable("coaches");
  },
};
