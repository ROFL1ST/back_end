"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("petugas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      namaPetugas: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.ENUM("admin", "petugas"),
        defaultValue: "petugas",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("petugas");
  },
};
