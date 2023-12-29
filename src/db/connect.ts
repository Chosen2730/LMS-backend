const mongoose = require("mongoose");

export const ConnectDB = (url: string) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
