import { _decorator, Component, Node } from 'cc';
import { ViewModel } from './ViewModel';
import { RandomGenerator } from './RandomGenerator';
import { Selection } from './Selection';
const { ccclass, property } = _decorator;

@ccclass('Model')
export class Model extends Component {

        @property({type:ViewModel})
        private viewModel:ViewModel;

        @property({type:Node})
        private poleElements:Node;

        private _poleX: number=5;
        private _poleY: number=5;

        private _maxX = 10;
        private _maxY = 7;

        private _clusterTypes: number=4;
        private _clusterMinSize:number=3;


        private _randomGenerator: RandomGenerator;


        private resultClusters;

    start() {
        this.resultClusters = [];
        this._randomGenerator = new RandomGenerator(this._clusterTypes, this._clusterMinSize, this._poleX, this._poleY);
        console.log("init model");
        
        this.viewModel.muteElements(this.poleElements.children);
        this.preferedArrayToAnmute();console.log(this.poleElements.children.length);

    }

    private setColors(){

    }




    private preferedArrayToAnmute(){
        let preferedArray = [];
        let addNum = 0;


        for(let i = 0; i<this._poleY;i++){
            //preferedArray[i]=[];
            for(let j = 0; j<this._poleX;j++){

                
                preferedArray[i*this._poleX+j] = this.poleElements.children[i*this._poleX+j+addNum];
                console.log(this._randomGenerator.getDictRes(i*this._poleX+j)+" generated");
                this.viewModel.switchColor(preferedArray[i*this._poleX+j], this._randomGenerator.getDictRes(i*this._poleX+j));
                preferedArray[i*this._poleX+j].getComponent(Selection).colorId = this._randomGenerator.getColorPole(i*this._poleX+j);
            
                
            }
            addNum+=this._maxX-this._poleX;
        }
        this.viewModel.ummuteFixedCount(preferedArray,0);

        this.defineClusters(preferedArray);
    }

    update(deltaTime: number) {
        
    }



    private recreateArray(arr:Array<Node>){

        let newArr = [];
        for(let i = 0; i<this._poleY;i++){
            newArr[i] = [];
            for(let j = 0; j<this._poleX;j++){
                newArr[i][j] = arr[i*this._poleX+j];
            }
        }
        return newArr;

    }


    private defineClusters(arr:Array<Node>){
        let resultArr = this.recreateArray(arr);

        for(let i =0; i<this._poleY;i++){
            for(let j = 0; j<this._poleX;j++){
                this.recurseCheck(resultArr, [], i,j);

            }
        }

        this.resultClusters.forEach((element:Array<Node>) => {
            if(element.length>this._clusterMinSize)console.log("CLUSTER FOUND");
        });
    }

    private recurseCheck(arr:Array<Node>, minArr:Array<Node> = [], i:number, j:number)
    {
        //let miniClusterCount = [];

        //arr[i][j].getComponent(Selection).isVisited = true;


        console.log(arr?.[i-1][j]+" VALID");

        console.log(arr[i][j].getComponent(Selection).colorId + "ID");
        if(arr?.[i][j-1]&&!arr[i][j-1].getComponent(Selection).isVisited&&arr[i][j].getComponent(Selection).colorId == arr[i][j-1].getComponent(Selection).colorId)
            {
                minArr.push(arr[i][j-1]);
                this.recurseCheck(arr, minArr,i,j-1);
            }
        if(arr?.[i+1][j]&&!arr[i+1][j].getComponent(Selection).isVisited&&arr[i][j].getComponent(Selection).colorId == arr[i+1][j].getComponent(Selection).colorId)
            {
                minArr.push(arr[i+1][j]);
                this.recurseCheck(arr, minArr,i+1,j);
            }
        if(arr?.[i][j+1]&&!arr[i][j+1].getComponent(Selection).isVisited&&arr[i][j].getComponent(Selection).colorId == arr[i][j+1].getComponent(Selection).colorId)
            {
                minArr.push(arr[i][j+1]);
                this.recurseCheck(arr, minArr,i,j+1);
            }
        if(arr?.[i-1][j]&&!arr[i-1][j].getComponent(Selection).isVisited&&arr[i][j].getComponent(Selection).colorId == arr[i-1][j].getComponent(Selection).colorId)
            {
                minArr.push(arr[i-1][j]);
                this.recurseCheck(arr, minArr,i-1,j);
            }
            
                return this.resultClusters.push(minArr);

            


    }





}


