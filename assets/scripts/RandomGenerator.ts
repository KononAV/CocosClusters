import { _decorator, assetManager, Color, Component, JsonAsset, math, Node, resources, SkeletalAnimation, sp } from 'cc';
const { ccclass, property } = _decorator;


//type ColorDictionary= Record<number,Color>;


@ccclass('RandomGenerator')
export class RandomGenerator{

    private _colorArr;
    private _colorDict: Map<number, sp.SkeletonData>;

    private _arrSizeX:number;
    private _arrSizeY:number;

    private _skelets:sp.SkeletonData[];

    //private _

    public constructor(colorsCount:number, minSize:number, x:number, y:number){
        this.getSkeletons();

        this._colorDict = new Map<number, sp.SkeletonData>();
        this._colorArr = [];

        this.initColors(colorsCount);
        this.initRandomPole(x,y,colorsCount);
        


    }


    private  getSkeletons(){

         resources.loadDir("animations",sp.SkeletonData, (resources, err)=>{
            if(err){
                this._skelets = err;
              this._skelets.forEach((item:sp.SkeletonData)=>{
                console.log(item.name);
              })
                
            }else{
                console.log("not err", resources);
            }

        })
        
    }


    private initRandomPole(x:number,y:number, randomMax:number){
        for(let i =0; i<y;i++){
            for(let j =0; j<x;j++){
                this._colorArr[i*x+j] = Math.floor(Math.random()*(randomMax));
            }
        }

    }

    public getColorPole(id:number){
        return this._colorArr[id];
    }

    private initColors(count:number)
    {

        for(let i =0;i<count;i++){
            this._colorDict.set(i,this._skelets[i]);

        }







        // for(let i = 0;i<count;i++){

        //     this._colorDict.set(i, new Color(
        //         Math.floor(Math.random()*256),
        //         Math.floor(Math.random()*256),
        //         Math.floor(Math.random()*256)
        //     ));
        // }

    }


    public getDictRes(id:number){
        return this._colorDict.get(this._colorArr[id]);

    }

    start() {
        

    }

    update(deltaTime: number) {
        
    }
}


