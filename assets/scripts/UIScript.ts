import { _decorator, Button, Component, director, Label, Node } from "cc";
import { ViewModel } from "./ViewModel";
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass("UIScript")
export class UIScript extends Component {
  @property({ type: Button })
  private startButton: Button;

  private _labelsDict: Map<string, number> = new Map<string, number>();

  @property({ type: ViewModel })
  private viewModel: ViewModel;

  public onPropChanged(result, name: Node) {
    this._labelsDict.set(name.name, this.viewModel.parseNumber(result));
  }

  public onStartPressed() {
    director.emit("start-clusters", { params: this._labelsDict });
    //return (this._labelsDict.get("EnterX<EditBox>"), )
  }

  start() {
    this._labelsDict.set("EnterX<EditBox>", 0);
    this._labelsDict.set("EnterY<EditBox>", 0);

    this._labelsDict.set("EnterN<EditBox>", 0);
    this._labelsDict.set("EnterM<EditBox>", 0);
  }

  public blockStart(isBlocking: boolean) {
    this.startButton.node.active = isBlocking;
  }

  update(deltaTime: number) {}
}
