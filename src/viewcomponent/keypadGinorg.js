 	
import { Button, Label, Rectangle, Pane } from "zimjs";	
import ViewComponentFactory from "../factory/ViewComponentFactory-class.js";
import LayoutUtil from "../utils/LayoutUtil-class.js";

	export default class keypadGinorg { 

		constructor( 
		pWidth_flt, //width 
		pHeight_flt, //height 
		pShowDisplayField_bool, //to show display field on top or not? 
		pOnValueChange_fun,  //call back function 
		pOnSubmit_fun, //submit function 
		pap,  //audio path 
		frame) 
	{  			

		this.obj_arr = [];
		this.btn_arr = []; 
		this.ap = pap ;
		this.val_Num;
		this.val_Str =""; 
		this.title_Lb ;
		this.display_Lb;
		this.displayLb_Rec;
 		{ 

			this.onValueChange_Fun = pOnValueChange_fun;
			this.onSubmit_Fun = pOnSubmit_fun;

			this.zimStage = frame.stage;	
	 
			this.view_Cnt = new Pane(
			{  			 
	 			width:pWidth_flt,
				height:pHeight_flt,
			 
				backgroundColor:"black",
				draggable:false,
				close:false,
				modal:false,
				displayClose:false,
				 
			})
 	

		this.view_Cnt.backdrop.visible=false; 
		 
	   
  		
		if(pShowDisplayField_bool)
		{


			//Note that if you don't want any mess with label-alignment, then make the backing-rectangle as "center registered" ie. apply centerReg() 
			this.displayLb_Rec = new Rectangle({width:pWidth_flt-40,height:40,color:"#ffffff",borderColor:"#000000",borderWidth:2,corner:10}).centerReg();
 			 
			this.display_Lb= new Label({  text:"", size_Int:20,color:"#000000", align:"center", valign:"middle" ,backing:this.displayLb_Rec});

			 

			this.title_Lb= ViewComponentFactory.createLabel(
			  	{
 			  		 text_Str: "Click the buttons to answer",
		             data_Obj:null, //attching data 
		             editable_Bool:false,//if label is editable. (use html5 textarea )
		             password_Bool:false,//if password
		             placeholder_Str:"",  //only for editable textfield, ie. a textarea property.
		             maxLength_Str:"", //only for editable textfield, eg. "3"
		             parent_Mc:null, //parent  
		             pos_Obj:null,//{dirX:0,dirY:0,dirXName:CENTER,dirYName:CENTER}, // {dirX,dirY,dirXName,dirYName} eg. {100,100,CENTER,TOP}
		             loc_Obj:null,
 		             font_Str:"Arial", //font name, eg. "Arial"
		             size_Int:20, //font size, eg. 25
		             color_Str:"#ffffff", //eg. "#FF0000"
		             align_Str:"center", //alignment of text center,bottom
 		             url_Str:""
			  	}	
			  ); 
 			
	 
				this.title_Lb.pos(0,10,CENTER,TOP,this.view_Cnt);
			 
				this.display_Lb.pos(0,this.title_Lb.height+30,CENTER,TOP,this.view_Cnt);
 

 		}
 		
		var row_int =4; 
		var col_int =3; 
		var hGap_int=10;
		var vGap_int=10 ;
		var btnWidth_flt = (this.view_Cnt.width-(hGap_int*2))/col_int  -  (hGap_int*(col_int-1)) ;
		var btnHeight_flt; 
		if(pShowDisplayField_bool)
		{ 
			btnHeight_flt = (this.view_Cnt.height-(vGap_int*2) - 80  - (vGap_int*(row_int-1)) )/ row_int ;
		}
		else 
		{
			btnHeight_flt = (this.view_Cnt.height -(vGap_int*2) -(vGap_int*(row_int-1)))/row_int ;
 		}


			var obj=( {  width:btnWidth_flt, height:btnHeight_flt, corner:2});

			var arr= [1,2,3,4,5,6,7,8,9,"Clear",0,"Enter"]; 
			for( var i=0; i<arr.length; i++)
			{
 				var btn = new Button(obj) ;
				btn.label.text = arr[i];
				btn.label.size= 20;
				btn.centerReg();// btnWidth_flt/2, btnHeight_flt/2;
				this.btn_arr.push( btn );
 			}

  
		var pt_arr = LayoutUtil.getGridPointArray(
			this.view_Cnt.width,
			this.view_Cnt.height,
 			this.btn_arr.length,
			btnWidth_flt,
			btnHeight_flt,
			row_int,
			col_int,
			hGap_int,
			vGap_int
		)
 
		for( var i=0; i< pt_arr.length ;i++)
		{

			this.btn_arr[i].x = pt_arr[i].x - this.view_Cnt.width/2 +btnWidth_flt/2  ;

			if(pShowDisplayField_bool)
				this.btn_arr[i].y = pt_arr[i].y -this.view_Cnt.height/2 +btnHeight_flt/2 + 40;	
 			else 
			 this.btn_arr[i].y = pt_arr[i].y -this.view_Cnt.height/2 +btnHeight_flt/2 + (this.display_Lb.height +10) ;	

 			this.btn_arr[i].on("click",this.btn_arr_click.bind(this));
			this.view_Cnt.addChild(this.btn_arr[i]);

		}//for 
 		//ViewComponentFactory.setXY(this.display_Lb,-100,-100);
  	 	 
 		}//construct 

	}

		  btn_arr_click(e)
		{
			var btn = e.currentTarget ; 
			var label_str = btn.label.text;

			if(this.ap)asset(this.ap + "click.mp3").play( );

 			if(label_str.toLowerCase() == "clear")
			{
 				//val_Str = String("" );
 				this.val_Str = val_Str.substring(0,this.val_Str.length-1);

				if(this.display_Lb)
 				this.display_Lb.text = this.val_Str
 			}
 			else 
 			if(label_str.toLowerCase() == "enter") //on submission send the submitted value, and clear the memory 
			{
 				
				
  				if(this.onSubmit_Fun) //callback 
				this.onSubmit_Fun("keypadGinorg.submitBtnClicked",this.val_Str);

				this.val_Str =  ""  ;
				this.display_Lb.text =this.val_Str;
 				return ;
 				
 			}	
			else
			{ 

				this.val_Str +=  (label_str);

				if(this.display_Lb)
			 	this.display_Lb.text	= this.val_Str ;
			}

			if(this.onValueChange_Fun) //callback 
			this.onValueChange_Fun("keypadGinorg.valueChanged",this.val_Str);

		this.zimStage.update();

 		}


 		  reverse() //reset 
 		{
 			if(this.display_Lb)
 			this.display_Lb.text = "";	
 			this.val_Str ="";
 			this.val_Num=0;
 		}


 		  clearScreen()
 		{
			this.val_Str="";
 			if(this.display_Lb)
 			this.display_Lb.text = ""

 		}
 
 		 	 
	}

 