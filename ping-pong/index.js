const Koa = require("koa");
const app = new Koa();
const PORT = process.env.PORT || 3000;

let count = 0;

app.use(async (ctx) => {
  count++;
  ctx.response.body = count;
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
