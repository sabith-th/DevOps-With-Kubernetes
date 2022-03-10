const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const PORT = process.env.PORT || 3000;

const HASH_FILE = "/usr/src/app/files/hash.txt";
const COUNT_FILE = "/usr/src/app/files/count.txt";

const fileExists = (file) => {
  try {
    if (fs.existsSync(file)) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};

const readData = (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    console.log(`${file}: ${data}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

app.use(async (ctx) => {
  const hash = readData(HASH_FILE);
  let count = 0;
  if (fileExists(COUNT_FILE)) {
    count = parseInt(readData(COUNT_FILE));
  }
  const responseBody = `${hash} \nPING / PONGS: ${count}`;
  ctx.response.body = responseBody;
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
