const randomString = Math.random().toString(36).substring(2);

printLog = () => {
  console.log(`${new Date()}: ${randomString}`);
  setTimeout(printLog, 5000);
};

printLog();
