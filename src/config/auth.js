module.exports = {
  secret: process.env.AUTH_SECRET || "ecommercewines",
  expires: process.env.AUTH_EXPIRES || "7d",
  rounds: process.env.AUTH_ROUNDS || 10
}