import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import { SymbolManager } from "./SymbolManager";
import { Selection } from "./Selection";
import { SymbolEmmiter } from "./SymbolEmmiter";
const { ccclass, property } = _decorator;

@ccclass("PooliingSystem")
export class PooliingSystem extends Component {
  @property(SymbolManager)
  private smbManager: SymbolManager;

  private pool: Map<number, Array<Node>> = new Map();

  start() {
    console.log(this.smbManager.prefabs.length + " length");

    //this.getElementFromPool(0);
  }

  public createDictForPool() {
    for (let i = 0; i < this.smbManager.prefabs.length; i++) {
      const newElem = instantiate(this.smbManager.prefabs[i]);
      //newElem.getComponent(Selection).isActive = true;
      this.pool.set(i, []);
    }
  }

  public getElementFromPool(id: number): Node {
    const iter: Node[] = this.pool.get(id);
    for (const elem of iter) {
      if (!elem.getComponent(Selection).isActive) {
        console.log("element founded");
        elem.getComponent(Selection).isActive = true;

        return elem;
      }
    }
    console.log("cant find");
    const newElem = instantiate(this.smbManager.prefabs[id]);
    this.pool.get(id).push(newElem);
    return newElem;
  }

  public returnToPool(selection: SymbolEmmiter) {
    selection.isActive = false;
  }

  update(deltaTime: number) {}
}
