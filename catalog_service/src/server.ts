import expressApp from "./expressApp";

const PORT = process.env.APP_PORT || 9001;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("server is up");
});
