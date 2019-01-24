import * as React from "react";

export interface GameType {
  pickedValues: number[];
  startTime?: Date;
  duration?: number;
}

export interface IDayContext {
  games: GameType[];
}

const DayContext = React.createContext<IDayContext>({
  games: []
});

export default DayContext;
