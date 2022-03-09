const fs = require("fs");
const Koa = require("koa");
const app = new Koa();
const PORT = process.env.PORT || 3000;

readData = () => {
  try {
    const data = fs.readFileSync("/usr/src/app/files/hash.txt", "utf8");
    console.log(`Data: ${data}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

app.use(async (ctx) => {
  ctx.response.body = readData();
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
