'use strict';
let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your name.'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: {
            msg:'Please provide a valid email address.'
          }
      }
    },
    password: {
     type: DataTypes.STRING,
     validate: {
      len: {
        args: [8, 32],
        msg: 'Your password must be between 8 and 32 characters in length.'
        }
     }
   },
    birthdate: DataTypes.DATE,
    bio: DataTypes.TEXT,
    image: {
      type: DataTypes.TEXT,
      validate: {
        isURL: {
          msg: 'Please provide a URL to your profile picture.'
        }
      }
    }
  }, { 
    hooks: {
      beforeCreate: (pendingUser) => {
        if (pendingUser && pendingUser.password) {

          // hash the password before it goes into the user table
          let hash = bcrypt.hashSync(pendingUser.password, 12)
          pendingUser.password = hash

        }
      }
  }
})
  
  user.associate = function(models) {
    // associations can be defined here
  };
  
  return user;
};