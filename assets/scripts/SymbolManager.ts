import { _decorator, CCBoolean, CCObject, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Symbols')
export class Symbols 
{
    @property({type:CCBoolean})
    public id:Boolean;



}



@ccclass('SymbolManager')
export class SymbolManager extends Component {


        @property({type:Symbol})
        public prefabs: symbol;



    start() {

    }

    update(deltaTime: number) {
        
    }
}


