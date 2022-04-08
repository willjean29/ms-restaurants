const app = require("./express-app");

async function main() {
  await app.listen(8000);
  console.log("listening to port 8000");
}

main();
