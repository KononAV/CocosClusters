import { _decorator, Button, CCString, Component, Label, Node, sp } from 'cc';
const { ccclass, property } = _decorator;





@ccclass('Selection')
export class Selection extends Component {


        @property({type:Label})
        public symbolForSelection: Label;


        @property({type:sp.SkeletonData})
        public skeleton:sp.SkeletonData


        @property({type:String})
        public winAnimName: string;

         @property({type:String})
        public idleAnimName: string;

         @property({type:String})
        public inAnimName: string;



        //@property({type:Number})
        public colorId:number=0;
        public isVisited:boolean = false;
        public selfSymbol:string = "";



    start() {
        this.symbolForSelection = this.node.getComponentInChildren(Label);

    }

    update(deltaTime: number) {
        
    }





    
}


