
const SQL = require("./../db/sql_connection");

function User(name, avatar, deviceSystem, deviceToken, onlineStatus, privacyStatus){
  this.id = -1;
  this.name = name;
  this.avatar = avatar;
  this.deviceSystem = deviceSystem
  this.deviceToken = deviceToken
  this.onlineStatus = onlineStatus
  this.privacyStatus = privacyStatus
}

User.tableName = "users";

User.prototype.save = function(){

  const sql = {
    command: `INSERT INTO ${User.tableName}
    (name, avatar, device_system, device_token, online_status, privacy_status)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
    values: [
      this.name, this.avatar, this.deviceSystem,
      this.deviceToken, this.onlineStatus, this.privacyStatus
    ]
  }

  const onError = (error) =>{
    console.log(error);
  }
  const onSuccess = (result) => {
    this.id = result.rows[0].id
    console.log("saved user: ", result.rows);
  }

  SQL.connect(sql, onError, onSuccess);
}

User.findAll = function(onError, onSuccess){
  const sql = {command: `SELECT * FROM ${User.tableName};`}
  SQL.connect(sql, onError, onSuccess);
}

User.deleteAll = function(){
  const sql = {command: `DELETE FROM ${User.tableName};`}
  SQL.runSimpleCommand(sql, `Deleted all from ${User.tableName}`)
}

module.exports = User;
