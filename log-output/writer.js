const fs = require("fs");

const randomString = Math.random().toString(36).substring(2);
let current;

printLog = () => {
  current = `${new Date()}: ${randomString}`;
  fs.writeFile("/usr/src/app/files/hash.txt", current, (err) => {
    if (err) {
      console.error(err);
    }
  });
  setTimeout(printLog, 5000);
};

printLog();
