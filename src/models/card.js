'use strict';
module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define('card', {
    texto: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    data_modificacao: DataTypes.DATE,
    tags: DataTypes.STRING
  }, {});
  card.associate = function(models) {
    // associations can be defined here
  };
  return card;
};

//yarn sequelize model:generate --name card --attributes texto:string,data_criacao:date,data_modificacao:date,tags:string