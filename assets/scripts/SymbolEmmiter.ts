import {
  _decorator,
  Component,
  Node,
  Prefab,
  SkeletalAnimation,
  Skeleton,
  sp,
} from "cc";
import { PooliingSystem } from "./PooliingSystem";
import { Selection } from "./Selection";
const { ccclass, property } = _decorator;

@ccclass("SymbolEmmiter")
export class SymbolEmmiter extends Component {
  private selfPrefab: Node;

  public colorId: number;

  public isVisited: boolean = false;
  public selfSymbol: string = "";
  public isActive: boolean = false;

  private anim: sp.Skeleton;

  private isWin: boolean = false;

  protected start(): void {
    console.log("start  emmiter");
    this.anim = this.getComponentInChildren(sp.Skeleton);

    // this.schedule(() => {
    //   this.anim.setAnimation(0, "idle", false);
    // }, 2);
  }

  public setSelfPrefab(pref: Node) {
    this.selfPrefab = pref;
    this.setPrefab();
  }

  private setPrefab() {
    this.colorId = this.selfPrefab.getComponent(Selection).colorId;
    this.anim.skeletonData = this.selfPrefab.getComponentInChildren(
      sp.Skeleton
    ).skeletonData;
    this.anim.setAnimation(0, "in", false);
    this.isWin = false;
  }

  public setWin() {
    this.anim.setAnimation(0, "win", true);
    this.isWin = true;
  }
}
