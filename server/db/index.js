const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// 서버가 실행될 때 최초로 한번 만들어지는 pool
let pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
//let testpool = mysql.createPool({});
console.log('just created pool');
class test {
  constructor() {
    this.a = 1;
    console.log('just created');
  }
}
const test1 = new test();

module.exports = {
  getPool: async function () {
    try {
      console.log('test object');
      //const test1 = await testpool.getConnection();
      // 기존의 pool 에 connect 성공 시 기존 pool 을 반환
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      console.log('Connected to existing pool.');
      connection.release();
      return pool;
    } catch (err) {
      try {
        // connect 에 실패 시 새로운 pool 을 만듦
        console.log('Failed to begin transaction.', err);
        await pool.end();
        console.log('Destroyed existing pool');
      } catch (err1) {
        console.log('Failed to end existing pool', err1);
      } finally {
        console.log('Creating a new pool...');
        let newPool = mysql.createPool({
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          port: process.env.DATABASE_PORT,
          connectTimeout: 10000,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        // pool 을 갱신시키고 return
        pool = newPool;
        console.log('New pool created. Returing new pool.');
        return pool;
      }
    }
  },
};
