const Koa = require("koa");
const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(async (ctx) => {
  ctx.response.body = "<h1>Hello World</h1>";
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
