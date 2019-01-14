import * as React from "react";

export interface Game {
  pickedValues: number[];
  startTime?: Date;
  duration?: number;
}

export interface IDayContext {
  games: Game[];
}

const DayContext = React.createContext<IDayContext>({ games: [] });

export default DayContext;
