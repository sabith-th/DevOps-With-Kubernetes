const fs = require("fs");
const path = require("path");
const axios = require("axios");
const Koa = require("koa");
const app = new Koa();
const PORT = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");

const fileExists = (file) => {
  try {
    if (fs.existsSync(file)) {
      return true;
    }
  } catch (error) {
    console.error("Error checking existence of file", error);
  }

  return false;
};

const getFileName = () => {
  return `${new Date().toLocaleDateString().replaceAll("/", "-")}.jpg`;
};

const getNewImage = async (filePath) => {
  const response = await axios.get("https://picsum.photos/1200", {
    responseType: "stream",
  });
  response.data.pipe(fs.createWriteStream(filePath));
};

const getImage = async (fileName) => {
  try {
    const filePath = path.join(directory, fileName);
    if (!fileExists(filePath.toString())) {
      console.log("No file found for the day, fetching new one....");
      await getNewImage(filePath);
    }
    console.log("Serving image....");
    return fs.readFileSync(filePath);
  } catch (error) {
    console.error("Error getting image", error);
  }
};

const buildResponse = (image) => {
  return `
    <h1>Picture of the Day</h1>
    <img src="data:image/jpeg;base64,${image.toString("base64")}" />
    <h2>TODOs</h2>
    <input type="text" id="todo-input" maxlength="140" />
    <button id="todo-button">Create TODO</button>
    <ul id="todo-list">
      <li>Learn k8s</li>
      <li>Complete Exercises</li>
    </ul>
  `;
};

app.use(async (ctx) => {
  const fileName = getFileName();
  ctx.response.body = buildResponse(await getImage(fileName));
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
