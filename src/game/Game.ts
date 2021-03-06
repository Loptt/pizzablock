import State, {GameState} from './states/State';
import {InputEvent} from './InputHandler';
import SingleplayerState from './states/SingleplayerState';
import Multiplayer1v1State from './states/Multiplayer1v1State';
import { GameUser } from './GameContainer';
import Multiplayer1v4State from './states/Multiplayer1v4State';

export const Screen = {
  width: 1080,
  height: 800,
};

type PoorMansUnknown = {} | null | undefined;

class Game {
  private g: CanvasRenderingContext2D;
  private currentState: State;
  public static user: GameUser;
  public static history: any;

  constructor(g: CanvasRenderingContext2D, state: GameState, user: GameUser, history: any) {
    this.g = g;
    Game.user = user;
    Game.history = history;
    this.currentState = SingleplayerState.getInstance();

    if (state === GameState.MULTIPLAYER_1v1) {
      this.currentState = Multiplayer1v1State.getInstance();
    } else if (state === GameState.MULTIPLAYER_1v4) {
      this.currentState = Multiplayer1v4State.getInstance();
    }
  }

  public update(delta: number): void {
    this.currentState.update(delta);
  }

  public input(e: InputEvent): void {
    this.currentState.input(e);
  }

  public render(): void {
    const {g} = this;
    const {width, height} = Screen;

    // clear screen
    g.clearRect(0, 0, width, height);
    g.fillStyle = 'black';
    g.fillRect(0, 0, width, height);

    // render state
    this.currentState.render(g);
  }
}

export default Game;
