const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const PORT = process.env.PORT || 3000;

const FILE_PATH = "/usr/src/app/files/count.txt";

const fileExists = () => {
  try {
    if (fs.existsSync(FILE_PATH)) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};

readCount = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    console.log(`Count: ${data}`);
    return parseInt(data);
  } catch (err) {
    console.error(err);
  }
};

writeCount = (count) => {
  fs.writeFile(FILE_PATH, count.toString(), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

app.use(async (ctx) => {
  let count = 0;
  if (fileExists()) {
    count = readCount();
  }
  writeCount(++count);
  ctx.response.body = count;
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
