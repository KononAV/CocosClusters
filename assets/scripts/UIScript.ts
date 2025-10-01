import { _decorator, Button, Component, Label, Node } from 'cc';
import { ViewModel } from './ViewModel';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('UIScript')
export class UIScript extends Component {

    @property({type:Button})
    private startButton:Button;



    @property({type:ViewModel})
    private viewModel:ViewModel;


    



    public onPropChanged(result, name){  
        this.viewModel.parseNumber(result);
        console.log(name);
    }

   


    start() {

    }

    update(deltaTime: number) {
        
    }
}


