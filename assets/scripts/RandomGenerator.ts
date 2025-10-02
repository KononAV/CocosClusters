import { _decorator, Color, Component, math, Node } from 'cc';
const { ccclass, property } = _decorator;


//type ColorDictionary= Record<number,Color>;


@ccclass('RandomGenerator')
export class RandomGenerator{

    private _colorArr;
    private _colorDict: Map<number, Color>;

    private _arrSizeX:number;
    private _arrSizeY:number;

    //private _

    public constructor(colorsCount:number, minSize:number, x:number, y:number){
        this._colorDict = new Map<number, Color>();
        this._colorArr = [];

        this.initColors(colorsCount);
        this.initRandomPole(x,y,colorsCount);
        


    }


    private initRandomPole(x:number,y:number, randomMax:number){
        //this._colorArr = new Array(new Array(x));
        for(let i =0; i<y;i++){
            //this._colorArr[i] = [];
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
        for(let i = 0;i<count;i++){

            this._colorDict.set(i, new Color(
                Math.floor(Math.random()*256),
                Math.floor(Math.random()*256),
                Math.floor(Math.random()*256)
            ));
        }

    }


    public getDictRes(id:number){
        return this._colorDict.get(this._colorArr[id]);

    }

    start() {
        

    }

    update(deltaTime: number) {
        
    }
}


