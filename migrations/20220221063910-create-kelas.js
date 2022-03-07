'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kelas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idKelas: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "siswas",
          key: "idKelas",
          as: "idKelas",
        },
      },
      namaKelas: {
        type: Sequelize.STRING
      },
      kompetensi_keahlian: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kelas');
  }
};