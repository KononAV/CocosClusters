import { _decorator, Color, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ViewModel')
export class ViewModel extends Component {

     @property({type:Label})
    private errorLabel:Label;




    start() {

    }

    update(deltaTime: number) {
        
    }


    private enableError(isEnabled:boolean, errorText:string = ""){
            this.errorLabel.node.active = isEnabled;
            this.errorLabel.string = errorText;
           

    }


    public parseNumber(result){
        const numRes:number = parseInt(result);
        if(!isNaN(numRes)){
            console.log("number"+numRes);
            this.enableError(false);

        }
        else {console.log("IT NAN");
            this.enableError( true,"Input is not a number")


            
        }
    }


    public muteElements(arrayOfElem:Array<Node>){
        arrayOfElem.forEach((elem:Node)=>{
            elem.active = false;
        })
    }

    public ummuteFixedCount(arrayOfElem:Array<Node>, count:number){
        arrayOfElem.forEach((elem:Node)=>{
            elem.active = true;
            console.log("unmute");
        })

    }

    public switchColor(elem:Node, color:Color){
            console.log(elem+" in switching");
            elem.getComponent(Sprite).color = color;
        

    }

}


