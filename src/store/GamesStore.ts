import { action, autorun, computed, observable, toJS } from "mobx";
import { set, keys, get, clear } from "idb-keyval";
import { GameType } from "../components/DayContext";

const NEW_GAME_TEMPLATE = { pickedValues: [], duration: 0 };

export class GamesStore {
  constructor() {
    autorun(() => {
      this.persistGame(
        this.currentGameIndex,
        this.games[this.currentGameIndex]
      );
    });

    this.getItemsFromStorage();
  }

  @observable games: GameType[] = [];

  private getItemsFromStorage(): void {
    keys().then(keys =>
      Promise.all(keys.map(k => get(k))).then(values => {
        this.games = values.map(value =>
          observable(JSON.parse(value.toString()))
        );
      })
    );
  }

  @observable currentGameIndex: number = -1;

  @action
  toggleValue(gameIndex: number, value: number) {
    const game = this.games[gameIndex];
    const { pickedValues } = game;
    const indexOfValue = pickedValues.indexOf(value);
    if (pickedValues.length && indexOfValue === pickedValues.length - 1) {
      // remove last
      const updatedGame = {
        ...game,
        pickedValues: pickedValues.slice(0, pickedValues.length - 1)
      };
      this.games.splice(gameIndex, 1, updatedGame);
    } else if (indexOfValue === -1) {
      // if value exists in the array but not at the last place, don't add it
      const updatedGame = { ...game, pickedValues: [...pickedValues, value] };
      this.games.splice(gameIndex, 1, updatedGame);
    }
  }

  @action
  setDuration(gameIndex: number, duration: number): void {
    this.games[gameIndex].duration = Math.floor(duration / 1000); // stores duration in seconds
  }

  @action
  initiateNewGame(): void {
    this.games.push(NEW_GAME_TEMPLATE);
  }

  @action
  trashAllGames(): void {
    this.games.splice(0, this.games.length);
    this.currentGameIndex = -1;
    clear().catch(console.error);
  }

  @computed
  get allPickedNumbers() {
    return this.games
      .map(g => g.pickedValues)
      .reduce((agg, array) => [...agg, ...array], [])
      .reduce((agg: any, value) => {
        agg[value] = agg[value] ? agg[value] + 1 : 1;
        return agg;
      }, {});
  }

  private persistGame(gameIndex: number, game: GameType) {
    if (
      this.currentGameIndex >= 0 &&
      this.currentGameIndex < this.games.length
    ) {
      set(gameIndex.toString(), JSON.stringify(toJS(game))).catch(
        console.error
      );
    }
  }
}
