import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Selection')
export class Selection extends Component {


        @property({type:Label})
        public symbolForSelection: Label;
        //@property({type:Number})
        public colorId:number=0;
        public isVisited:boolean = false;



    start() {
        this.symbolForSelection = this.node.getComponentInChildren(Label);

    }

    update(deltaTime: number) {
        
    }



    
}


