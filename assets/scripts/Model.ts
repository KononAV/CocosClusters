import { _decorator, Component, director, Label, Node } from 'cc';
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

        private _poleX: number=0;
        private _poleY: number=0;

        private _maxX = 10;
        private _maxY = 7;

        private _clusterTypes: number=0;
        private _clusterMinSize:number=0;


        private _randomGenerator: RandomGenerator;

        private isGenering:boolean = false;





   async start() {
        

        director.on("start-clusters", (eventData: { params: Map<string, number> }) => {
            
            if(this.isGenering)return;
            
                this.viewModel.muteElements(this.poleElements.children);

            this.resetCluster();
            
    let params = eventData.params;

    

    this._clusterTypes   = params.get("EnterX<EditBox>")!;
    this._clusterMinSize = params.get("EnterY<EditBox>")!;
    this._poleX          = params.get("EnterN<EditBox>")!;
    this._poleY          = params.get("EnterM<EditBox>")!;


    if(this._poleX>this._maxX||this._poleY>this._maxY||this._poleX<0||this._poleY<0){
        this.viewModel.enableError(true, "One of rules is violated");
        this._poleX=this._poleY=this._clusterMinSize=this._clusterTypes=0;
        return;
        }



    this.isGenering=true;
    this.afterStart();
}, this);
    }


    private afterStart(){
        this._randomGenerator = new RandomGenerator(this._clusterTypes, this._clusterMinSize, this._poleX, this._poleY);
        console.log("init model");
        
        this.viewModel.muteElements(this.poleElements.children);
        this.preferedArrayToAnmute();
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
        
        //this.viewModel.ummuteFixedCount(preferedArray,0);

        this.defineClusters(preferedArray);
        this.ummuteClusters(preferedArray);
    }



    private async ummuteClusters(arr:Node[]){
        const sleep = ms=>new Promise(resolve=>setTimeout(resolve,ms));

        await Promise.all(arr.map(async(item, index)=>{
            

            await sleep(index*100);
            this.viewModel.ummuteFixedCount(item);
            
        })).catch(error=>{
            
            this.viewModel.muteElements(this.poleElements.children);
            return Promise.reject(error);
        }).catch(error=>error).then(()=>this.markClusters()).then(()=>{this.redrawLabel(100);}).then(()=>{this.isGenering=false});
        //const promises = arr.map(item=>this.viewModel.ummuteFixedCount(item));
        
        


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


    private clustersArr = [];


   private defineClusters(arr: Array<Node>) {
    let resultArr = this.recreateArray(arr);
    //let clustersArr = [];

    for (let i = 0; i < this._poleY; i++) {
        for (let j = 0; j < this._poleX; j++) {
            let node = resultArr[i][j];
            let sel = node.getComponent(Selection);

            if (!sel.isVisited) {
                let cluster: Node[] = [];
                this.recurseCheck(resultArr, cluster, i, j);

                if (cluster.length >= this._clusterMinSize) {
                    this.clustersArr.push(cluster);

                    //this.redrawLabel(cluster,100,"!");
                }
            }
        }
    }

    
    // for(let i = 0;i<clustersArr.length;i++){
    //     this.redrawLabel(clustersArr[i],10000,"!");
    // }

    


    for (let row of resultArr) {
        for (let node of row) {
            node.getComponent(Selection).isVisited = false;
    }
}

}

private markClusters(){
    this.clustersArr.forEach((item:Node[])=>{
        item.map((item:Node)=>item.getComponent(Selection).selfSymbol = "!");


    });
    this.clustersArr = [];

}







private async redrawLabel(time:number){
    const sleep = ms=>new Promise(resolve=>setTimeout(resolve,ms));

        await Promise.all(this.poleElements.children.map(async(item, index)=>{
            

            await sleep(index*time);
            this.viewModel.drawLabelForCluster(item, item.getComponent(Selection).selfSymbol);
        })).catch(error=>error);
        //const promises = arr.map(item=>this.viewModel.ummuteFixedCount(item));
        
        



}


private resetCluster(){
    this.poleElements.children.forEach((item:Node)=>item.getComponent(Selection).selfSymbol = "");
    this.redrawLabel(0);

    //this.viewModel.drawLabelForCluster(this.poleElements.children,"");
}



private recurseCheck(arr: Array<Array<Node>>, cluster: Node[], i: number, j: number) {
    if (i < 0 || j < 0 || i >= arr.length || j >= arr[0].length) return;

    let node = arr[i][j];
    let sel = node.getComponent(Selection);

    if (sel.isVisited) return;

    sel.isVisited = true;
    cluster.push(node);

    let colorId = sel.colorId;

    if (j - 1 >= 0 && arr[i][j - 1].getComponent(Selection).colorId === colorId)
        this.recurseCheck(arr, cluster, i, j - 1);

    if (j + 1 < arr[0].length && arr[i][j + 1].getComponent(Selection).colorId === colorId)
        this.recurseCheck(arr, cluster, i, j + 1);

    if (i - 1 >= 0 && arr[i - 1][j].getComponent(Selection).colorId === colorId)
        this.recurseCheck(arr, cluster, i - 1, j);

    if (i + 1 < arr.length && arr[i + 1][j].getComponent(Selection).colorId === colorId)
        this.recurseCheck(arr, cluster, i + 1, j);
}






}

