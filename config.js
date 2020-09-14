module.exports = {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://rohit:supercell@cluster0.pk7ng.mongodb.net/Test?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};
