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
import { Symbol } from "./Symbol";
const { ccclass, property } = _decorator;

@ccclass("SymbolEmmiter")
export class SymbolEmmiter extends Component {
  private selfPrefab: Node;

  public colorId: number;

  public isVisited: boolean = false;
  public isActive: boolean = false;

  private anim: sp.Skeleton;

  protected start(): void {
    this.anim = this.getComponentInChildren(sp.Skeleton);
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
    //this.anim.setAnimation(0, "in", false);
    // this.isWin = false;
    this.selfPrefab.getComponent(Symbol).playIn(this.anim);

    this.selfPrefab.getComponent(Symbol).setIdle(this.anim);
  }

  public setWin(delay: number) {
    this.selfPrefab.getComponent(Symbol).playWin(this.anim, delay);
  }

  public cancelAnimation() {
    this.selfPrefab.getComponent(Symbol).cancelAnimation(this.anim);
  }
}
