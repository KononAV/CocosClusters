import { _decorator, CCBoolean, CCObject, Component, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SymbolManager")
export class SymbolManager extends Component {
  @property([Prefab])
  public prefabs: Prefab[] = [];

  start() {}

  update(deltaTime: number) {}
}
