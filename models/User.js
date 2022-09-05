const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


//Phone validation from https://stackoverflow.com/questions/67250004/check-if-the-value-is-phone-number-in-model-sequelize/67250175#67250175
const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;

const roleType = (userData) => {
  return !userData.location_id ? 'stallholder' : 'organiser'
}


class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
 }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stallholder_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'stallholder',
        key: 'id',
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'location',
        key: 'id',
      },
    },
    //We validate on username (and allow email addresses) because a user might want 2 'identites' and cannot use a unique email twice
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len:[3,64],
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // This should be fed by which login is used
    role_type: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isIn: [["Organiser", "Stallholder", "User"]], //Added option of user in case
      // }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validator: function (v) {
          return phoneValidationRegex.test(v);
        },
      },
    },

  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.role_type = !newUserData.role_type ? await roleType(newUserData) : newUserData.role_type;
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.role_type = !updatedUserData.role_type ? await roleType(updatedUserData) : updatedUserData.role_type;
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
   // defaultScope: {
   //   attributes: { exclude: ['password'] },
   // }//This should disallow password from  Sequelize API queries 
   }
);

module.exports = User;
