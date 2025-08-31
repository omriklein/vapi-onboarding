'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('calls', 'summary', {
            type: Sequelize.TEXT, allowNull: false,
        });
        await queryInterface.changeColumn('calls', 'transcript', {
            type: Sequelize.TEXT, allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('calls', 'summary', {
            type: Sequelize.STRING, allowNull: false,
        });
        await queryInterface.changeColumn('calls', 'transcript', {
            type: Sequelize.STRING, allowNull: false,
        });
    }
};