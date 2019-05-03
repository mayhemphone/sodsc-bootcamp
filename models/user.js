'use strict'

let bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your name!'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Hey, please give me a valid email address!'
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
    cell: DataTypes.STRING,
    scoot: DataTypes.STRING,
    newsletter: DataTypes.STRING,
    animalId: DataTypes.INTEGER,
    image: {
      type: DataTypes.TEXT,
      defaultValue: '/img/user_anon.png'
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    member: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    facebookId: DataTypes.STRING,
    facebookToken: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (pendingUser) => {
        if(pendingUser && pendingUser.password) {
          // hash the password before it goes into user table
          let hash = bcrypt.hashSync(pendingUser.password, 12)

          // Reassign the password to the hashed value
          pendingUser.password = hash
        }
      }
    }
  })

  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.cart_items)
  }

  user.prototype.validPassword = function(typedInPassword) {
    return bcrypt.compareSync(typedInPassword, this.password)
  }

  return user
}