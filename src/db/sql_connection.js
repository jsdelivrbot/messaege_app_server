
const pg = require('pg');

function SqlConnection(){
  this.connectionString = "postgres://localhost/chat_app";
}

SqlConnection.prototype.connect = function (sql, onFail, onSuccess) {
  // https://node-postgres.com/guides/upgrading
  var pool = new pg.Pool({
      connectionString: this.connectionString
  });

  return pool.connect().then((client) => {
    console.log("client query");
    return client.query(sql.command, sql.values, (err, res) => {
      console.log("query result");
      if (err) {
        onFail(err);
      } else {
        onSuccess(res);
      }
      client.end();
    });
  })
};

SqlConnection.prototype.runSimpleCommand = function(sql, logOutput){
  const onError = (err) => {console.log(err.stack)}
  const onSuccess = (result) => {if(logOutput)console.log(logOutput);}
  return this.connect(sql, onError, onSuccess);
}

module.exports = new SqlConnection();
