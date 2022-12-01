var express = require("express");
var router = express.Router();
const mysql = require("../mysql");

router.post("/login", async (req, res) => {
  const { act_type, id, pw, name, phone } = req.body;

  // response 초기화
  let resData = {
    result: "OK", // NG
    err_msg: "",
    data: null,
  };

  let query = "";
  switch(act_type) {
    case "signup" :
      query =
      "  INSERT INTO user_info SET " +
      "         id = '" + id + "', " +
      "   password = '" + pw + "', " +
      "       name = '" + name + "', " +
      "      phone = '" + phone + "'"
      ;
      break;
    case "login" :
      query =
      " SELECT *" +
      "   FROM user_info" +
      "  WHERE     id = '" + id + "'" +
      "  AND password = '" + pw + "'"
      ;
      break;
    case "get_user_info" :
      query =
      " SELECT *" +
      "   FROM user_info" +
      "  WHERE        id" +
      "   LIKE        '"  + id + "'"
      ;
      break;
  }
  
  const [contents] = await mysql.query(query);

  resData.data = contents;
  if (contents.length == 0) {
    resData.result = "NG";
    resData.err_msg = "잘못된 정보입니다.";
  }

  return res.json(resData);
});

module.exports = router;
