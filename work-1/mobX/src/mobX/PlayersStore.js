import { makeObservable, observable, computed, action } from "mobx";

const words = [
  "apple",
  "banana",
  "chocolate",
  "dolphin",
  "elephant",
  "flamingo",
  "giraffe",
  "hippopotamus",
  "island",
  "jazz",
  "kangaroo",
  "lemon",
  "mountain",
  "noodle",
  "ocean",
  "penguin",
  "quasar",
  "robot",
  "sunflower",
  "tiger",
  "umbrella",
  "vortex",
  "waterfall",
  "xylophone",
  "yellow",
  "zeppelin",
  "avalanche",
  "butterfly",
  "carousel",
];

export class PlayersStore {
  players = [];
  gameStarted = false;
  lettersGuessed = [];
  word = "";
  letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  delay = 1000;
  resetActivated = false;
  intervalId = null;

  constructor() {
    makeObservable(this, {
      players: observable,
      gameStarted: observable,
      addPlayer: action,
      removePlayer: action,
      startGame: action,
      word: observable,
      lettersGuessed: observable,
      letters: observable,
      guessLetter: action,
      winners: computed,
      delay: observable,
      setDelay: action,
      resetGame: action,
      resetActivated: observable,
      setInterval: action,
      intervalId: observable,
    });
  }

  setDelay(delay) {
    this.delay = delay;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.setInterval(delay);
  }

  setInterval(delay) {
    // clear previous interval if it exists
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;

    this.intervalId = setInterval(() => {
      // check if all letters have been guessed
      const allLettersGuessed = this.word.split("").every((l) => {
        return this.lettersGuessed.includes(l);
      });

      
      if (!allLettersGuessed) {
        const letter =
          this.letters[Math.floor(Math.random() * this.letters.length)];
        this.guessLetter(letter);
      } else {
        // game over
        clearInterval(this.intervalId);

        // find out who won or if there's a tie
        const winners = this.winners;

        if (winners.length === 1) {
          alert(`Game over. ${winners[0].name} won!`);
        } else {
          const winnerNames = winners.map((winner) => winner.name).join(", ");
          alert(`Game over. It's a tie between ${winnerNames}!`);
        }
      }
    }, delay);
  }

  addPlayer(player) {
    this.players = [...this.players, player];
  }

  removePlayer(id) {
    this.players = this.players.filter((player) => player.id !== id);
  }

  get winners() {
    return this.players.filter((player) => {
      return player.score === Math.max(...this.players.map((p) => p.score));
    });
  }

  startGame() {
    this.word = words[Math.floor(Math.random() * words.length)];
    this.gameStarted = true;
    this.setInterval(this.delay);
  }

  guessLetter(letter) {
    const playerIndex = Math.floor(Math.random() * this.players.length);
    // add letter to the player's lettersGuessed array
    this.players[playerIndex].lettersGuessed = [
      ...this.players[playerIndex].lettersGuessed,
      letter,
    ];

    // add letter to the game's lettersGuessed array
    this.lettersGuessed = [...this.lettersGuessed, letter];
    // remove letter from letters array
    this.letters = this.letters.filter((l) => l !== letter);

    // check if letter is in word
    if (this.word.includes(letter)) {
      // update player score
      this.players[playerIndex].score += 1;
    }
  }

  resetGame() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.word = "";
    this.lettersGuessed = [];
    this.letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];
    this.players = this.players.map((player) => {
      player.score = 0;
      player.lettersGuessed = [];
      return player;
    });
    this.delay = 1000;
    this.resetActivated = true;
    this.gameStarted = false;
  }
}
