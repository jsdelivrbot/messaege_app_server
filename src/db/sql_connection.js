
const fs = require('fs');
const pg = require('pg');

function SqlConnection(){

  this.connectionString = process.env.LOCAL_PSQL;
  // this.connectionString = process.env.DATABASE_URL;

}

SqlConnection.prototype.connect = function (onConnect) {
  // https://node-postgres.com/guides/upgrading
  console.log(process.env.TIMES);
  var pool = new pg.Pool({
      connectionString: this.connectionString
  });

  pool.connect((err, client, done) => {
    onConnect(err, client, done);
  });
};

module.exports = new SqlConnection();
