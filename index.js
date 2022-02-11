const crypto = require("crypto");
var combination;
var lostC = 0;
var maxLostC = 0;
var bets = 0;
var betting = true;
var lostArr = new Array(20).fill(0);

function getNumber() {
  const availableChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 30; i++) {
    randomString +=
      availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  crypto.randomBytes(256).toString("hex");
  combination = crypto.randomBytes(256).toString("hex") + randomString + bets;
  const hash = crypto.createHash("sha512").update(combination).digest("hex");
  let index = 0;
  let result;

  do {
    result = parseInt(hash.substring(index * 5, index * 5 + 5), 16);
    index += 1;
    if (index * 5 + 5 > 129) {
      result = 9999;
      break;
    }
  } while (result >= 1e6);
  //return [result % 1e4] * 1e-2;
  //console.log(([result % 1e4] * 1e-2).toFixed(2))
  let number = [result % 1e4] * 1e-2;
  if (number < 91) {
    lostC++;
  } else {
    if (lostC > maxLostC) {
      maxLostC = lostC;
      if (lostC >= lostArr[0]) {
        lostArr.unshift(lostC);
        lostArr.pop();
      }
    }
    lostC = 0;
  }
  bets++;
  if (bets % 1000 === 0) {
    console.clear();
    console.log(
      "Lost Streak:   " +
        maxLostC +
        "\nBets:          " +
        bets +
        "\nWorst Streaks: " +
        lostArr
    );
  }
  if (betting) {
    setTimeout(getNumber, 1);
  }
}

getNumber();
