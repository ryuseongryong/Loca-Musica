const db = require('../../db');

module.exports = {
  delete: async (req, res) => {
     //const accessTokenData = checkAccessToken(req);

    // Access token 이 없거나 유효하지 않은 경우 종료
    if (!accessTokenData){
      res.status(401).send({ message: 'invalid access token' });
      return;
    }
    
    const connection = await db.getConnection(async (conn) => conn);
    connection.beginTransaction();
    
    try {
      // const {email} = accessTokenData;
      // console.log(req.body);
      // const email = req.body.email;

      // const [userData] = await connection1.query(
      //   `SELECT * FROM users WHERE email = "${email}"`
      // );

      // Admin 이 아닌 경우 종료
      // if (!userData[0].admin){
      //   connection1.release();
      //   res.status(403).send({message: "not admin"})
      //   return;
      // }

      const code = req.params.code;

      const [existingMusical] = await connection.execute(
        `SELECT * FROM musicals WHERE code = ?`,
        [code]
      )
      if (!existingMusical[0]){
        res.status(404).send({message: "musical not found"})
        return;
      }

      // numbers 삭제
      const [deleted] = await connection.exeucte(
        `DELETE FROM numbers WHERE id = ?`,
        [code]
      )
      
      connection.commit();
      connection.release();

      res.status(200).send({message: "ok"})
    } catch (err) {
      res.status(500).send({message: "internal server error"})
    }
  }
};
