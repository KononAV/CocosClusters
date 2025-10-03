import { _decorator, Component, Node, Prefab } from "cc";
import { PooliingSystem } from "./PooliingSystem";
const { ccclass, property } = _decorator;

@ccclass("SymbolEmmiter")
export class SymbolEmmiter extends Component {
  @property(Prefab)
  private selfPrefab: Node;

  public colorId: number = 0;
  public isVisited: boolean = false;
  public selfSymbol: string = "";
  public isActive: boolean = false;

  public setSelfPrefab(pref: Node) {
    this.selfPrefab = pref;

    this.node.children.push(this.selfPrefab);
  }

  update(deltaTime: number) {}
}
