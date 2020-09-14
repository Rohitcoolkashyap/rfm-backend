module.exports = {
  MONGO_SRV:
    process.env.MONGO_SRV ||
    "mongodb+srv://rohit:supercell@cluster0.pk7ng.mongodb.net/Test?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "something",
};
