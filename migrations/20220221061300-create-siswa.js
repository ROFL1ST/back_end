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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "kelas",
          key: "id",
          as: "idKelas",
        },
      },
      alamat: {
        type: Sequelize.STRING
      },
      noTelp: {
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
    await queryInterface.dropTable('siswas');
  }
};