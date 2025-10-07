import { _decorator, Component, Node, sp } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Symbol")
export class Symbol extends Component {
  protected anim: sp.Skeleton;

  private cancelWin: boolean = true;
  private idleCallback = null;
  public isActive: boolean = true;
  private currentDelay: number = 0;
  private isWin: boolean = false;

  protected start(): void {
    this.anim = this.getComponentInChildren(sp.Skeleton);
  }
  public async playWin(anim: sp.Skeleton, delay: number) {
    this.isWin = true;
    this.cancelWin = false;
    this.currentDelay = delay;

    this.playWinAsync(anim);
  }

  private async playWinAsync(anim: sp.Skeleton) {
    while (!this.cancelWin) {
      console.log(anim.node.parent.name);
      anim.setAnimation(0, "win", false);
      await sleep(this.currentDelay);
    }
  }
  public playIn(anim: sp.Skeleton) {
    this.isWin = false;
    this.currentDelay = 0;
    this.cancelWin = true;
    anim.clearAnimation(0);

    anim.setAnimation(0, "in", false);
  }

  public setIdle(anim: sp.Skeleton) {
    if (anim.findAnimation("idle") && !this.isWin) {
      this.unschedule(this.idleCallback);
      this.idleCallback = () => {
        anim.setAnimation(0, "idle", false);
        this.schedule(this.idleCallback, 5 + Math.random() * 25);
      };
    } else {
      this.unschedule(this.idleCallback);
      this.idleCallback = null;
    }
  }

  public cancelAnimation(anim: sp.Skeleton) {
    this.currentDelay = 0;

    this.cancelWin = true;
    anim.clearAnimation(0);
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
