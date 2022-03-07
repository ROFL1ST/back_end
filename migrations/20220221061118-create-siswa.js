'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nisn: {
        type: Sequelize.STRING,
        unique: true
      },
      nis: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      idKelas: {
        type: Sequelize.INTEGER,
        unique: true
      },
      alamat: {
        type: Sequelize.STRING
      },
      noTelp: {
        type: Sequelize.STRING
      },
      idSpp: {
        type: Sequelize.INTEGER,
        unique: true
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
    await queryInterface.dropTable('siswas');
  }
};