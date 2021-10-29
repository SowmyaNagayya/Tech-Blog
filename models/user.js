const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

//create User Model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginpw) {
        return bcrypt.compareSync(loginpw, this.loginpw);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            beforeCreate: async (pendingUserData) => {
                try {
                    pendingUserData.password = await bcrypt.hash(pendingUserData.password, 10);
                } catch (err) {
                    return false;
                }

                return pendingUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            beforeUpdate: async (updatedUserData) => {
                try {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                } catch (err) {
                    return false;
                }

                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
);

module.exports = User;