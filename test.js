const bcrypt = require("bcrypt");

const test = async () => {
  try {
    let pw = "123456";
    let hashedPw = await bcrypt.hash(pw, 10);
    const resultPassword = await bcrypt.compare("123", hashedPw);
    console.log(resultPassword);
  } catch (error) {
    console.log(error);
  }
};

test();
