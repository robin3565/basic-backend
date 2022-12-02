// addslashes
exports.addslashes = (string) => {
  return string
    .replace(/\\/g, "\\\\")
    .replace(/\u0008/g, "\\b")
    .replace(/\t/g, "\\t")
    .replace(/\n/g, "\\n")
    .replace(/\f/g, "\\f")
    .replace(/\r/g, "\\r")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace("NaN", "");
};

exports.toValue = (value) => {
  return value || "";
};

exports.getPageInfo = (page, limit, totalCnt) => {
  // page: 현재 페이지 번호
  // limit:  페이지당 개수
  // totalCnt: 전체 개수
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if(totalCnt < 0) totalCnt = 0;
  let totalPage = Math.ceil(totalCnt / page);
  
  // 전체 페이지보다 현재 페이지 번호가 더 클 경우 == 오류
  if(totalPage < page) {
    limit = 0;
    page = 1;
  }

  let result = {
    page: page,
    limit: limit,
    totalCnt: totalCnt,
    totalPage: totalPage,
    startIndex: startIndex,
    endIndex: endIndex,
  }

  return result;
};
