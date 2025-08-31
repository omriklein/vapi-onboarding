'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calls', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      callId: { type: Sequelize.STRING, allowNull: true, unique: true },
      startedAt: { type: Sequelize.DATE, allowNull: false },
      durationMs: { type: Sequelize.INTEGER, allowNull: false },
      summary: { type: Sequelize.STRING, allowNull: false },
      transcript: { type: Sequelize.STRING, allowNull: true },
      agentId: {
        type: Sequelize.INTEGER, allowNull: true,
        reference: {
          model: 'agents',
          key: 'id'
        }, onUpdate: 'CASCADE', onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('NOW()') },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('calls');
  }
};
