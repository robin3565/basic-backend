const express = require("express");
const router = express.Router();
const commom = require("../util/commom")
const mysql = require("../mysql");

router.get("/board", async (req, res) => {
  let resData = {
    result: "OK", // NG
    err_msg: "",
    data: null,
  };

  let query =  " SELECT *" 
            + "   FROM board_test" 
            + "  WHERE 1 "
            + "  ORDER BY uid DESC "
            ;

  const [contents] = await mysql.query(query);

  resData.data = contents;
  if (contents.length == 0) {
    resData.result = "NG";
    resData.err_msg = "잘못된 정보입니다.";
  }

  return res.json(resData);
});

router.get("/board/:uid", async (req, res) => {
    const uid = req.params.uid;

    let resData = {
      result: "OK", // NG
      err_msg: "",
      data: null,
    };
  
    let query =  " SELECT * " 
              + "   FROM board_test " 
              + "  WHERE 1 "
              + "    AND uid = '" + uid + "' "
              + "  ORDER BY uid DESC "
              ;
  
    const [contents] = await mysql.query(query);
  
    resData.data = contents;
    if (contents.length == 0) {
      resData.result = "NG";
      resData.err_msg = "잘못된 정보입니다.";
    }
  
    return res.json(resData);
  });

  router.post("/board/:id", async (req, res) => {
    const id = req.params.id;

    let resData = {
      result: "OK", // NG
      err_msg: "",
      data: null,
    };
  
    let query =  " SELECT * " 
              + "   FROM board_test " 
              + "  WHERE 1 "
              + "    AND id = '" + id + "' "
              + "  ORDER BY uid DESC "
              ;
  
    const [contents] = await mysql.query(query);
  
    resData.data = contents;
    if (contents.length == 0) {
      resData.result = "NG";
      resData.err_msg = "잘못된 정보입니다.";
    }
  
    return res.json(resData);
  });

  router.post("/board", async (req, res) => {
    const { id, title, board_content, summary } = req.body;

    let resData = {
      result: "OK",
      err_msg: "",
      data: null,
    };
  
    let query = "  INSERT INTO board_test SET "
              + "  reg_date = NOW(), "
              + "  reg_time = NOW(), "
              + "  id      = '" + id + "', "
              + "  title   = '" + commom.addslashes(commom.toValue(title)) + "', "
              + "  content = '" + commom.addslashes(commom.toValue(board_content)) + "', "
              + "  summary = '" + commom.addslashes(commom.toValue(summary)) + "' "
              ;
  
    const [contents] = await mysql.query(query);
  
    resData.data = contents;
    if (contents.length == 0) {
      resData.result = "NG";
      resData.err_msg = "잘못된 정보입니다.";
    }
  
    return res.json(resData);
  });

  router.put("/board", async (req, res) => {
    const { title, board_content, summary, uid } = req.body;

    let resData = {
      result: "OK",
      err_msg: "",
      data: null,
    };
  
    let query = " UPDATE board_test SET " 
              + " mod_date      = NOW()," 
              + " mod_time      = NOW(),"
              + " title         = '" + commom.addslashes(commom.toValue(title)) + "', " 
              + " content       = '" + commom.addslashes(commom.toValue(board_content)) + "', " 
              + " summary       = '" + commom.addslashes(commom.toValue(summary)) + "' "
              + " WHERE uid     = '" + uid + "' "
              ;  
  
    const [contents] = await mysql.query(query);
  
    resData.data = contents;
    if (contents.length == 0) {
      resData.result = "NG";
      resData.err_msg = "잘못된 정보입니다.";
    }
  
    return res.json(resData);
  });

  router.delete("/board", async (req, res) => {
    const { uid } = req.body;

    let resData = {
      result: "OK",
      err_msg: "",
      data: null,
    };
  
    let query =  " DELETE FROM board_test " 
              + " WHERE 1 "
              + " AND uid = '" + uid + "'"
              ; 
  
    const [contents] = await mysql.query(query);

    console.log(query)
  
    resData.data = contents;
    if (contents.length == 0) {
      resData.result = "NG";
      resData.err_msg = "잘못된 정보입니다.";
    }
  
    return res.json(resData);
  });

module.exports = router;
