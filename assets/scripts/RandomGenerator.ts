import {
  _decorator,
  assetManager,
  Color,
  Component,
  JsonAsset,
  math,
  Node,
  resources,
  SkeletalAnimation,
  sp,
} from "cc";
import { PooliingSystem } from "./PooliingSystem";
const { ccclass, property } = _decorator;

//type ColorDictionary= Record<number,Color>;

@ccclass("RandomGenerator")
export class RandomGenerator {
  private _colorArr: number[];

  public constructor(colorsCount: number, x: number, y: number) {
    this._colorArr = [];

    this.initRandomPole(x, y, colorsCount);
  }

  private initRandomPole(x: number, y: number, randomMax: number) {
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        this._colorArr[i * x + j] = Math.floor(Math.random() * randomMax);
        console.log(this._colorArr[i * x + j] + "COLOR ARR");
      }
    }
    const shuffeled: number[] = this._colorArr.sort(() => Math.random() - 0.5);
    this._colorArr = shuffeled;
  }

  public getRandomPole(id: number) {
    return this._colorArr[id];
  }

  start() {}

  update(deltaTime: number) {}
}
