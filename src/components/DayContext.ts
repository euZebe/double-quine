import * as React from "react";

export interface GameType {
  pickedValues: number[];
  startTime?: Date;
  duration?: number;
}

export interface IDayContext {
  games: GameType[];
  toggleValue: (gameID: number, value: number) => void;
}

const DayContext = React.createContext<IDayContext>({
  games: [],
  toggleValue: () => {}
});

export default DayContext;
