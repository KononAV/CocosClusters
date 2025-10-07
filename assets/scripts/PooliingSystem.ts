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
  private currentLength: number = 0;

  start() {}

  public createDictForPool() {
    for (let i = 0; i < this.smbManager.prefabs.length; i++) {
      const newElem = instantiate(this.smbManager.prefabs[i]);
      this.pool.set(i, []);
    }
    this.currentLength = this.pool.size;
  }

  public getElementFromPool(id: number): Node {
    const iter: Node[] = this.pool.get(id);
    for (const elem of iter) {
      if (!elem.getComponent(Selection).isActive) {
        elem.getComponent(Selection).isActive = true;

        return elem;
      }
    }
    const newElem = instantiate(this.smbManager.prefabs[id]);
    this.pool.get(id).push(newElem);
    return newElem;
  }

  public returnToPool(selection: SymbolEmmiter) {
    selection.isActive = false;
  }

  public getLength() {
    return this.currentLength;
  }

  update(deltaTime: number) {}
}
