import { GameType } from "../components/DayContext";
import { action, autorun, observable, toJS } from "mobx";

const NEW_GAME_TEMPLATE = {pickedValues: []};

export class GamesStore {
  constructor() {
    autorun(() => {
      this.persistGame(
        this.currentGameIndex,
        this.games[this.currentGameIndex]
      );
    });
  }

  @observable games: GameType[] = this.getItemsFromStorage();

  private getItemsFromStorage(): GameType[] {
    const values: string[] = Object.values(window.localStorage);
    return values.map(element => observable(JSON.parse(element))) as GameType[];
  }

  @observable currentGameIndex: number = -1;

  @action
  toggleValue(gameIndex: number, value: number) {
    const { pickedValues } = this.games[gameIndex];
    const indexOfValue = pickedValues.indexOf(value);
    if (pickedValues.length && indexOfValue === pickedValues.length - 1) {
      // remove last
      const updatedGame = {
        pickedValues: pickedValues.slice(0, pickedValues.length - 1)
      };
      this.games.splice(gameIndex, 1, updatedGame);
      // this.persistGame(gameID.toString(), updatedGame);
    } else if (indexOfValue === -1) {
      // if value exists in the array but not at the last place, don't add it
      const updatedGame = { pickedValues: [...pickedValues, value] };
      this.games.splice(gameIndex, 1, updatedGame);
      // this.persistGame(gameID.toString(), updatedGame);
    }
  }

  @action
  initiateNewGame(): void {
    this.games.push(NEW_GAME_TEMPLATE);
  }

  private persistGame(gameIndex: number, game: GameType) {
    if (this.currentGameIndex >= 0 && this.currentGameIndex < this.games.length){
      localStorage.setItem(gameIndex.toString(), JSON.stringify(toJS(game)));
    }
  }
}
