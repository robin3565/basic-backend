var express = require("express");
var router = express.Router();
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

  let query = "";
  switch(act_type) {
    case "submit_init" :
      query =
      "  INSERT INTO board_test SET " +
      "  reg_date = NOW(), " +
      "  reg_time = NOW(), " +
      "  id   = '" + id + "', " +
      "  title = '" + title + "', " +
      "  content = '" + board_content + "', " +
      "  summary = '" + summary + "'"
      ;
      break;
    case "submit_mod" : 
    query =
    "   UPDATE board_test SET " +
    " mod_date        = NOW()," +
    " mod_time        = NOW()," +
    "    title        = '" + title + "', " +
    "  content        = '" + board_content + "', " +
    "  summary        = '" + summary + "' " +
    "    WHERE    uid = '" + uid + "' "
    ;  
    break;
    case "get_board_info" :
      query = 
      " SELECT *" +
      "   FROM board_test" +
      "   WHERE 1 "
      + sql +
      "   ORDER BY uid DESC"
      ;
      break;
    case "delete" :
        query = 
        " DELETE FROM board_test " +
        " WHERE 1 "
        + sql
        ; 
  }
  
  console.log(query)
  const [contents] = await mysql.query(query);

  // 모든 데이터 호출
  // let arr = [];
  // for (item of contents) {
  //   if (item.mod_mem_uid == 0) {
  //     item.is_mod = "N";
  //   } else {
  //     item.is_mod = "Y";
  //   }
  //   arr.push(item);
  // }
  // contents.map((item, idx) => (
  //   item.index = idx
  // ))

  resData.data = contents;
  if (contents.length == 0) {
    resData.result = "NG";
    resData.err_msg = "잘못된 정보입니다.";
  }

  return res.json(resData);
});

module.exports = router;
