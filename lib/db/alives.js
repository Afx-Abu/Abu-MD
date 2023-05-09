const config = require("../../config");

const { DataTypes } = require("sequelize");

const AlivesDB = config.DATABASE.define("Alives", {

  chat: {

    type: DataTypes.STRING,

    allowNull: false,

  },

  type: {

    type: DataTypes.TEXT,

    allowNull: false,

  },

  message: {

    type: DataTypes.TEXT,

    allowNull: false,

  },

  status: { type: DataTypes.BOOLEAN, allowNull: false },

});

async function getAlive(jid = null,type = null) {

  var Msg = await AlivesDB.findAll({

    where: {

      chat: jid,

      type: type,

    },

  });

  if (Msg.length < 1) {

    return false;

  } else {

    return Msg[0].dataValues;

  }

}

async function setAlive(jid = null, type = null, text = null) {

  var Msg = await AlivesDB.findAll({

    where: {

      chat: jid,

      type: type,

    },

  });

  if (Msg.length < 1) {

    return await AlivesDB.create({

      chat: jid,

      message: text,

      type,

      status: true,

    });

  } else {

    return await Msg[0].update({ chat: jid, message: text });

  }

}

async function AliveStatus(jid=null,type=null) {

  var Msg = await AlivesDB.findAll({

    where: {

      chat: jid,

      type: type,

    },

  });

  if (Msg.length < 1) return false;

  if (Msg[0].dataValues.status) {

    return await Msg[0].update({ chat: jid, status: false });

  } else {

    return await Msg[0].update({ chat: jid, status: true });

  }

}

async function delAlive(jid = null,type=null) {

  var Msg = await AlivesDB.findAll({

    where: {

      chat: jid,

      type: type,

    },

  });

  return await Msg[0].destroy();

}

async function AliveGet(jid = null,type=null) {

  return new Promise(async (resolve, reject) => {

    try {

      var Msg = await AlivesDB.findAll({

        where: {

          chat: jid,

          type:type

        },

      });

      if (Msg.length < 1) {

        resolve(false);

      } else {

        resolve(Msg[0].dataValues.status);

      }

    } catch {

      resolve(false);

    }

  });

}

module.exports = {

  AlivesDB,

  setAlive,

  getAlive,

  delAlive,

  AliveStatus,

  AliveGet,

};

