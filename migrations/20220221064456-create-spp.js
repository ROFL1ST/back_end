"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("spps", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        idSpp: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          references: {
            model: "siswas",
            key: "id",
            as: "idSpp",
          },
        },
        tahun: {
          type: Sequelize.INTEGER,
        },
        nominal: {
          type: Sequelize.INTEGER,
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
      .then(() => queryInterface.addIndex("spps", ["idSpp"]));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("spps");
  },
};
