import { _decorator, Component, Node, sp } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Symbol")
export class Symbol extends Component {
  protected anim: sp.Skeleton;

  private cancelWin: boolean = false;

  protected start(): void {
    this.anim = this.getComponentInChildren(sp.Skeleton);
  }
  public playWin(anim: sp.Skeleton, delay: number) {
    this.cancelWin = false;
    console.log(this.playWinAsync(anim, delay));
  }

  private async playWinAsync(anim: sp.Skeleton, delay) {
    while (!this.cancelWin) {
      await new Promise((resolve) => {
        setTimeout(resolve, delay + 1000);
      });
      console.log("promise");
      if (!this.cancelWin) anim.setAnimation(0, "win", false);
      return await anim.findAnimation("win").duration;
    }
  }
  public playIn(anim: sp.Skeleton) {
    anim.setAnimation(0, "in", false);
    //this.isWin = false;
  }

  public setIdle(anim: sp.Skeleton) {
    if (anim.findAnimation("idle")) {
      this.schedule(() => {
        anim.setAnimation(0, "idle", false);
      }, 2);
    }
  }

  public cancelAnimation(anim: sp.Skeleton) {
    this.cancelWin = true;
    anim.clearAnimation(0);
  }
}
