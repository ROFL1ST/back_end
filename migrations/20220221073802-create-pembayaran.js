"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pembayarans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idPetugas: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "petugas",
          as: "idPetugas",
          key: "id"
        }
      },
      nisn: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "siswas",
          key: "nisn",
          as: "nisn",
        },
      },
      tglBayar: {
        type: Sequelize.STRING,
      },
      bulanDibayar: {
        type: Sequelize.STRING,
      },
      tahunDibayar: {
        type: Sequelize.STRING,
      },
      idSpp: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "siswas",
          key: "idSpp",
          as: "idSpp",
        },
      },
      jumlahBayar: {
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
    }).then(() => queryInterface.addIndex('pembayarans', ['idPetugas']))
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pembayarans");
  },
};
