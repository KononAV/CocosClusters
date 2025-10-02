import { _decorator, AsyncDelegate, Color, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ViewModel')
export class ViewModel extends Component {

     @property({type:Label})
    private errorLabel:Label;




    start() {


    }

    update(deltaTime: number) {
        
    }


    public enableError(isEnabled:boolean, errorText:string = ""){
            this.errorLabel.node.active = isEnabled;
            this.errorLabel.string = errorText;
           

    }


    public parseNumber(result){
        let numRes:number = parseInt(result);
        if(!isNaN(numRes)){
            console.log("number"+numRes);
            this.enableError(false);

            

        }
        else {//console.log("IT NAN");
            this.enableError( true,"Input is not a number")
            //numRes = 0;


            
        }
        return numRes;
    }


    public muteElements(arrayOfElem:Array<Node>){
        arrayOfElem.forEach((elem:Node)=>{
            if(elem==null)return;
            elem.active = false;
        })
    }

    public async ummuteFixedCount(elem:Node){
        elem.active = true;

    }

    public switchColor(elem:Node, color:Color){
            //console.log(elem+" in switching");
            elem.getComponent(Sprite).color = color;
        

    }

    public drawLabelForCluster(cluster: Node, symb:string){
        if(cluster==null)return;
        cluster.getComponentInChildren(Label).string = symb;

        // cluster.forEach((elem:Node)=>{
        //     elem.getComponentInChildren(Label).string = symb;
        // })

    }



}


