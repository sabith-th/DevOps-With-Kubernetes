const Koa = require("koa");
const app = new Koa();
const PORT = process.env.PORT || 3000;

const randomString = Math.random().toString(36).substring(2);
let current;

printLog = () => {
  current = `${new Date()}: ${randomString}`;
  console.log(current);
  setTimeout(printLog, 5000);
};

printLog();

app.use(async (ctx) => {
  ctx.response.body = current;
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
