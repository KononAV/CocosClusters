import { _decorator, Button, CCString, Component, Label, Node, sp } from "cc";
import { Symbol } from "./Symbol";
const { ccclass, property } = _decorator;

@ccclass("Selection")
export class Selection extends Symbol {
  public colorId: number = 0;

  public isActive: boolean = true;

  //   public playWin(anim: sp.Skeleton) {
  //     super.playWin(anim);
  //   }

  public playIn(anim: sp.Skeleton) {
    super.playIn(anim);
  }

  update(deltaTime: number) {}
}
