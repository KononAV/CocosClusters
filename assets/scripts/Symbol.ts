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
  private currentWinPromise: Promise<void> | null = null;
  private stopWinLoop: (() => void) | null = null;

  protected start(): void {
    this.anim = this.getComponentInChildren(sp.Skeleton);
  }
  public async playWin(anim: sp.Skeleton, delay: number) {
    this.isWin = true;
    this.cancelWin = false;
    this.currentDelay = delay;

    anim.setAnimation(0, "win", false);

    return this.playWinAsync(anim);
  }

  private async playWinAsync(anim: sp.Skeleton) {
    if (this.stopWinLoop) this.stopWinLoop();

    let isActive = true;
    this.stopWinLoop = () => {
      isActive = false;
    };

    this.currentWinPromise = (async () => {
      while (isActive && !this.cancelWin && this.node.isValid) {
        await sleep(this.currentDelay);
        if (!isActive || this.cancelWin) break;
        anim.setAnimation(0, "win", false);
      }
      anim.clearTracks();
      anim.setToSetupPose();
    })();

    return this.currentWinPromise;
  }

  public playIn(anim: sp.Skeleton) {
    this.isWin = false;
    this.currentDelay = 0;
    this.cancelAnimation(anim);

    anim.setAnimation(0, "in", false);
  }

  public setIdle(anim: sp.Skeleton) {
    if (anim.findAnimation("idle") && !this.isWin) {
      this.unschedule(this.idleCallback);

      this.idleCallback = () => {
        anim.setAnimation(0, "idle", false);
      };

      this.idleCallback();

      this.schedule(this.idleCallback, 5 + Math.random() * 25);
    } else {
      this.unschedule(this.idleCallback);
      this.idleCallback = null;
    }
  }

  public cancelAnimation(anim: sp.Skeleton) {
    this.cancelWin = true;
    if (this.stopWinLoop) this.stopWinLoop();
    this.stopWinLoop = null;
    this.currentWinPromise = null;
    anim.clearTracks();
    anim.setToSetupPose();
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
