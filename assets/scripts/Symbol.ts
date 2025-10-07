import { _decorator, Component, Node, sp } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Symbol")
export class Symbol extends Component {
  protected anim: sp.Skeleton;

  private cancelWin: boolean = false;
  private idleCallback = null;

  protected start(): void {
    this.anim = this.getComponentInChildren(sp.Skeleton);
  }
  public async playWin(anim: sp.Skeleton, delay: number) {
    this.cancelWin = false;
    this.playWinAsync(anim, delay);
  }

  private async playWinAsync(anim: sp.Skeleton, delay: number) {
    while (!this.cancelWin) {
      if (!this.cancelWin) anim.setAnimation(0, "win", false);
      await sleep(delay);
    }
  }
  public playIn(anim: sp.Skeleton) {
    anim.setAnimation(0, "in", false);
  }

  public setIdle(anim: sp.Skeleton) {
    if (anim.findAnimation("idle")) {
      this.unschedule(this.idleCallback);
      this.idleCallback = () => {
        anim.setAnimation(0, "idle", false);
      };
      this.schedule(this.idleCallback, 5 + Math.random() * 25);
    } else {
      this.unschedule(this.idleCallback);
      this.idleCallback = null;
    }
  }

  public cancelAnimation(anim: sp.Skeleton) {
    this.cancelWin = true;
    anim.clearAnimation(0);
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
