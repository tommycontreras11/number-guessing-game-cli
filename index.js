import { game, getInput } from "./helper.js" 

const main = async () => {
  let continueGame = true;

  while (continueGame) {
    await game();

    const answer = (await getInput("Do you want to retry? (y/n): "))
      .toLowerCase()
      .trim();

    continueGame = answer === "y" || answer === "yes";

    if (continueGame) {
      console.clear();
    }
  }

  process.exit();
};

main();