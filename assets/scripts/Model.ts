import {
  _decorator,
  Component,
  debug,
  director,
  error,
  Label,
  Node,
  Pool,
} from "cc";
import { ViewModel } from "./ViewModel";
import { RandomGenerator } from "./RandomGenerator";
import { Selection } from "./Selection";
import { PooliingSystem } from "./PooliingSystem";
import { SymbolEmmiter } from "./SymbolEmmiter";
import { Symbol } from "./Symbol";
const { ccclass, property } = _decorator;

@ccclass("Model")
export class Model extends Component {
  @property({ type: ViewModel })
  private viewModel: ViewModel;

  @property({ type: Node })
  private poleElements: Node;

  private _poleX: number = 0;
  private _poleY: number = 0;

  private _maxX = 10;
  private _maxY = 7;

  private _clusterTypes: number = 0;
  private _clusterMinSize: number = 0;

  private _randomGenerator: RandomGenerator;

  private isGenering: boolean = false;

  @property(PooliingSystem)
  private pool: PooliingSystem;

  async start() {
    this._randomGenerator = new RandomGenerator(
      this._clusterTypes,
      this._poleX,
      this._poleY
    );

    this.pool.createDictForPool();

    director.on(
      "start-clusters",
      async (eventData: { params: Map<string, number> }) => {
        if (this.isGenering) return;

        this.viewModel.muteElements(this.poleElements.children);
        //this.resetCluster();

        this.clusterArrClean();

        console.log("resolve");
        let params = eventData.params;
        this._clusterTypes = params.get("EnterX<EditBox>")!;
        this._clusterMinSize = params.get("EnterY<EditBox>")!;
        this._poleX = params.get("EnterN<EditBox>")!;
        this._poleY = params.get("EnterM<EditBox>")!;
        if (
          this._poleX > this._maxX ||
          this._poleY > this._maxY ||
          this._poleX < 0 ||
          this._poleY < 0 ||
          this.pool.getLength() < this._clusterTypes ||
          this._clusterTypes <= 0
        ) {
          this.viewModel.enableError(true, "One of rules is violated");
          this._poleX =
            this._poleY =
            this._clusterMinSize =
            this._clusterTypes =
              0;

          return;
        }
        this.isGenering = true;
        this.afterStart();
      }
    );
  }

  private clusterArrClean() {
    this.clustersArr.forEach((item: Node[]) => {
      item.map((i: Node) => {
        i.getComponent(SymbolEmmiter).cancelAnimation();
        this.pool.returnToPool(i.getComponent(SymbolEmmiter).getSelfPrefSymb());
      });
    });
    this.clustersArr = [];
  }

  private afterStart() {
    this._randomGenerator = new RandomGenerator(
      this._clusterTypes,
      this._poleX,
      this._poleY
    );

    this.preferedArrayToAnmute();
  }

  private preferedArrayToAnmute() {
    let preferedArray = [];
    let addNum = 0;

    for (let i = 0; i < this._poleY; i++) {
      for (let j = 0; j < this._poleX; j++) {
        preferedArray[i * this._poleX + j] =
          this.poleElements.children[i * this._poleX + j + addNum];
        this.viewModel.switchColor(
          preferedArray[i * this._poleX + j].getComponent(SymbolEmmiter),
          this.pool.getElementFromPool(
            this._randomGenerator.getRandomPole(i * this._poleX + j)
          )
        );
        preferedArray[i * this._poleX + j].getComponent(SymbolEmmiter).colorId =
          this._randomGenerator.getRandomPole(i * this._poleX + j);
      }
      addNum += this._maxX - this._poleX;
    }
    this.defineClusters(preferedArray);

    this.ummuteClusters(preferedArray);
  }

  private async ummuteClusters(arr: Node[]) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await Promise.all(
      arr.map(async (item, index) => {
        await sleep(index * 100);
        this.viewModel.ummuteFixedCount(item);
      })
    )
      .catch((error) => {
        this.viewModel.muteElements(this.poleElements.children);
        return Promise.reject(error);
      })
      .catch((error) => error)
      .then(() => this.markClusters())
      .then(() => {});
  }

  update(deltaTime: number) {}

  private recreateArray(arr: Array<Node>) {
    let newArr = [];
    for (let i = 0; i < this._poleY; i++) {
      newArr[i] = [];
      for (let j = 0; j < this._poleX; j++) {
        newArr[i][j] = arr[i * this._poleX + j];
      }
    }
    return newArr;
  }

  private clustersArr = [];

  private defineClusters(arr: Array<Node>) {
    let resultArr = this.recreateArray(arr);

    for (let i = 0; i < this._poleY; i++) {
      for (let j = 0; j < this._poleX; j++) {
        let node = resultArr[i][j];
        let sel = node.getComponent(SymbolEmmiter);

        if (!sel.isVisited) {
          let cluster: Node[] = [];
          this.recurseCheck(resultArr, cluster, i, j);

          if (cluster.length >= this._clusterMinSize) {
            this.clustersArr.push(cluster);
          }
        }
      }
    }

    for (let row of resultArr) {
      for (let node of row) {
        node.getComponent(SymbolEmmiter).isVisited = false;
      }
    }
  }

  private mathDuration() {
    let delay = 0;
    this.clustersArr.forEach((item: Node[]) => {
      delay += item[0].getComponent(SymbolEmmiter).askDuration("win");
    });
    return delay;
  }

  private async markClusters() {
    const delay = this.mathDuration();
    const sleep = (ms: number) =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      }).catch((error) => {});

    await this.markWins(sleep, delay);
  }

  private async markWins(sleep, delay: number) {
    try {
      if (this.clustersArr.length != 0) await sleep(2000);

      for (const cluster of this.clustersArr) {
        const animations = cluster.map((item: Node) => {
          return item.getComponent(SymbolEmmiter).setWin(delay);
        });

        await Promise.all(animations);

        await sleep(1000);
      }
    } catch (error) {
    } finally {
      this.isGenering = false;
    }
  }

  private recurseCheck(
    arr: Array<Array<Node>>,
    cluster: Node[],
    i: number,
    j: number
  ) {
    if (i < 0 || j < 0 || i >= arr.length || j >= arr[0].length) return;

    let node = arr[i][j];
    let sel = node.getComponent(SymbolEmmiter);

    if (sel.isVisited) return;

    sel.isVisited = true;
    cluster.push(node);

    let colorId = sel.colorId;

    if (
      j - 1 >= 0 &&
      arr[i][j - 1].getComponent(SymbolEmmiter).colorId === colorId
    )
      this.recurseCheck(arr, cluster, i, j - 1);

    if (
      j + 1 < arr[0].length &&
      arr[i][j + 1].getComponent(SymbolEmmiter).colorId === colorId
    )
      this.recurseCheck(arr, cluster, i, j + 1);

    if (
      i - 1 >= 0 &&
      arr[i - 1][j].getComponent(SymbolEmmiter).colorId === colorId
    )
      this.recurseCheck(arr, cluster, i - 1, j);

    if (
      i + 1 < arr.length &&
      arr[i + 1][j].getComponent(SymbolEmmiter).colorId === colorId
    )
      this.recurseCheck(arr, cluster, i + 1, j);
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
