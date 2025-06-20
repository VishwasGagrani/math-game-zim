import {Rectangle, Label,Button,Container, Pane} from "zimjs";	

export default class InfoDisplay 
{ 

	  constructor(
		  pFrame,
		pWidth = 400, //windth of window
		pHeight = 300 //height of window 
	)
	{ 
		this.width = pWidth;
		this.height = pHeight;	 
		this.winPaneLabel_Lb;
		this.btn_Arr =[] ; //showing buttons for alert box
		this.callback_Arr;


		this.frame =pFrame;
		this.disable_Rec = new Rectangle({
			width:this.frame.stage.width,
					height:this.frame.stage.height,
					color:"rgba(255,255,255,0.5)"
				});
				
				 var a = new Label({text:"",color:black,size:30, align:"center", valign:"middle"}) ;
			 
		}

		  display(
 			pMsg_str,  //msg to show
			pBtnLabel_arr, // all buttons to show
			pCallback_arr, //all callbacks 
 			)
		{
		this.callback_Arr = pCallback_arr;

		this.winPane = new Pane( 
			{
				container:this.frame.stage, //@ very important in case you make a new frame every time. Because in that case you won't be able to see pane if it still points to older frame.
				width:400,
				height:300,
				titleBar:new Label({text:"Next?",color:black,size:30, }) ,
				backgroundColor:white,
 				draggable:false,
				close:false,
				modal:false, //if true: clicking backdrop closes 
				displayClose:false,// if true, clicking the box closes the pane
				content:{

					header: new Label({text:"How would you like to proceed ?",color:black,size:30, 
						align:"center", valign:"middle"}) ,
					//@ message: "hello",
					//@ display:new Label({text:"abc ",color:black,size:25, align:"center", valign:"middle"}) ,
					buttonScale:1,
					buttons:[
					{
						label:new Label({text:pBtnLabel_arr[0],color:black,size:25, align:"center"}),  
						bgColor: green ,
						call:(e)=>{
							this.undisplay();
							this.callback_Arr [0](pBtnLabel_arr[0]) 
						} 
					}
					,  
					{
						label:new Label({text:pBtnLabel_arr[1],color:black,size:25, align:"center"}),  
						bgColor:green,
						call:(e)=>{
							this.undisplay();
							this.callback_Arr [1](pBtnLabel_arr[1])
							}
						} 
						]
					}
			});
	
		//  zog(this.winPane.container == this.frame);
			this.winPane.show();//centerReg();

				
 		}

	  undisplay()
	{
		if(this.winPane)
		{ 
			this.winPane.hide();
		}
	}//undisplay
	 

	} //InfoDisplay 

 
  