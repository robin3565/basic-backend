const express = require("express");
const router = express.Router();
const commom = require("../util/commom")
const mysql = require("../mysql");

router.post("/board", async (req, res) => {
  const { act_type, uid, id, title, board_content, summary } = req.body;

  // response 초기화
  let resData = {
    result: "OK", // NG
    err_msg: "",
    data: null,
  };

  let sql = "";

  if(uid) {
    sql += "AND uid = '" + uid + "'"
  }

  if(id) {
    sql += "AND id = '" + id + "'"
  }


  let query = "";
  switch(act_type) {
    case "submit_init" :
    query = "  INSERT INTO board_test SET "
        + "  reg_date = NOW(), "
        + "  reg_time = NOW(), "
        + "  id      = '" + id + "', "
        + "  title   = '" + commom.addslashes(commom.toValue(title)) + "', "
        + "  content = '" + commom.addslashes(commom.toValue(board_content)) + "', "
        + "  summary = '" + commom.addslashes(commom.toValue(summary)) + "' "
        ;
        break;
    case "submit_mod" : 
    query = " UPDATE board_test SET " 
          + " mod_date      = NOW()," 
          + " mod_time      = NOW(),"
          + " title         = '" + commom.addslashes(commom.toValue(title)) + "', " 
          + " content       = '" + commom.addslashes(commom.toValue(board_content)) + "', " 
          + " summary       = '" + commom.addslashes(commom.toValue(summary)) + "' "
          + " WHERE uid     = '" + uid + "' "
          ;  
          break;
    case "get_board_info" :
    query =  " SELECT *" 
          + "   FROM board_test" 
          + "  WHERE 1 "
          + sql 
          + "  ORDER BY uid DESC "
          ;
          break;
    case "delete" :
    query =  " DELETE FROM board_test " 
          + " WHERE 1 "
          + sql
          ; 
          break;
  }
  
  console.log(query)
  const [contents] = await mysql.query(query);

  resData.data = contents;
  if (contents.length == 0) {
    resData.result = "NG";
    resData.err_msg = "잘못된 정보입니다.";
  }

  return res.json(resData);
});

module.exports = router;
