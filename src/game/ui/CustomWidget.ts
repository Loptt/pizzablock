import Widget from "./Widget";
import { InputEvent } from "../InputHandler";
import { StrMap } from "../../util/Types";

type UpdateFunction = (self: CustomWidget, delta: number) => void;
type InputFunction = (self: CustomWidget, e: InputEvent) => void;
type RenderFunction = (self: CustomWidget, g: CanvasRenderingContext2D) => void;

class CustomWidget extends Widget {
  private updateFunc: UpdateFunction;
  private inputFunc: InputFunction;
  private renderFunc: RenderFunction;
  public data: StrMap<any>;

  constructor() {
    super(0, 0, 0, 0);
    this.updateFunc = () => null;
    this.inputFunc = () => null;
    this.renderFunc = () => null;
    this.data = {};
  }

  public onUpdate(updateFunc: UpdateFunction): CustomWidget {
    this.updateFunc = updateFunc;
    return this;
  }

  public onInput(inputFunc: InputFunction): CustomWidget {
    this.inputFunc = inputFunc;
    return this;
  }

  public onRender(renderFunc: RenderFunction): CustomWidget {
    this.renderFunc = renderFunc;
    return this;
  }

  public update(delta: number): void {
    this.updateFunc(this, delta);
  }

  public input(e: InputEvent): void {
    this.inputFunc(this, e);
  }

  public render(g: CanvasRenderingContext2D): void {
    this.renderFunc(this, g);
  }
}

export default CustomWidget;