const crypto = require("crypto");
const key = "JinhakDSSCryToKey";

/** value : 복호화 할 데이터 */
const decrypt = value => {
  try {
    var decipher = crypto.createDecipher("aes256", key); // decipher 객체 생성
    var decrypted = decipher.update(value.toString(), "base64", "utf8"); // 인코딩 방식에 따라 복호화
    decrypted += decipher.final("utf8"); // 복호화된 결과 값 return decrypted ;
    return decrypted;
  } catch (exception) {
    throw exception;
  }
};
export { decrypt };
