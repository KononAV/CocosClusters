import {
  _decorator,
  AsyncDelegate,
  Color,
  Component,
  Label,
  Node,
  SkeletalAnimation,
  Skeleton,
  sp,
  Sprite,
} from "cc";
import { SymbolEmmiter } from "./SymbolEmmiter";
const { ccclass, property } = _decorator;

@ccclass("ViewModel")
export class ViewModel extends Component {
  @property({ type: Label })
  private errorLabel: Label;

  start() {}

  update(deltaTime: number) {}

  public enableError(isEnabled: boolean, errorText: string = "") {
    this.errorLabel.node.active = isEnabled;
    this.errorLabel.string = errorText;
  }

  public parseNumber(result) {
    let numRes: number = parseInt(result);
    if (!isNaN(numRes)) {
      this.enableError(false);
    } else {
      this.enableError(true, "Input is not a number");
    }
    return numRes;
  }

  public muteElements(arrayOfElem: Array<Node>) {
    arrayOfElem.forEach((elem: Node) => {
      if (elem == null) return;
      elem.active = false;
    });
  }

  public async ummuteFixedCount(elem: Node) {
    elem.active = true;
  }

  public switchColor(elem: SymbolEmmiter, second: Node) {
    elem.setSelfPrefab(second);
    //elem.addChild(second);
    // elem.getComponentInChildren(sp.Skeleton).skeletonData = color;
    // console.log(elem.name);
  }

  public drawLabelForCluster(cluster: Node, symb: string) {
    if (cluster == null) return;

    cluster.getComponentInChildren(Label).string = symb;
  }
}
