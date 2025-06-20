
import {Shape, Ticker,Label,Container, Circle, Rectangle, Button} from  'zimjs';
import Chronometer from '../services/Chronometer-class.js';
import PieTimerEvent from '../SimpleTypes.js'; 
export default class pieTimerDorg 
	{ 
		constructor  (pframe)
		{
			this.zimStage = pframe.stage;	
			 this.startAngle =0;
			 this.endAngle=0 ;
			 this.inc; 
			 this.pieClr_Str ;
			 this.shape ;
			 this.shapeBg; 
			 this.w ; //updated in createSettings()
			 this.h ;//updated in createSettings()
			 this.label_Lb; //label to show on the pie timer 
			 this.timeoutCallback ;// constructor to be called on timeout
			this.createSettings();

			this.label_Lb = new Label({text:"10",color:"#ffffff", align:"center",valign:"center", outlineColor:"#000000", outlineWidth:4});

			this.view_Cnt = new Container(this.w,this.h)   //accessible from outside so that this whole display is inside a container. So that you can use all container methods 

			  this.shape = new Shape();
			 
			  this.shapeBg = new Circle(this.h/2,yellow,black,3);
			this.shape.y = this.h/2;
			this.shapeBg.y = this.h/2;
			this.label_Lb.y = this.h/2;
			this.chronometerPgrp = new Chronometer();
			this.updateShape();
 			this.view_Cnt.addChild(this.shapeBg,this.shape,this.label_Lb);

 		}

 		  createSettings() //default setting
 		{
 			this.w=this.h=60;
 			this.startAngle = -90 - ( 360 * 1/1) ; //debugging: -360 is mysterious. Without putting -360 the updateShape() does not render the first display
			this.endAngle =-90 ;
			this.inc = 10 ; 
			this.totalMs= 1*1000;
 			this.pieClr_Str= "#ff0000" ;
 		}
		

		  updateSettings( 
		pTimerSizeInSec_flt, //timer size
		pPieClr_str//color of the pie 

		 ) 
		{
			this.totalMs= pTimerSizeInSec_flt*1000;
 			this.pieClr_Str= pPieClr_str ;
			
  		}
  	 
 		  run(
 			pTimerSizeInSec_flt, 
		pPieClr_str ,
		pTimeoutCallback, //constructor tobe called on timeout
		)
 		{
			zog("run called");	
			this.timeoutCallback = pTimeoutCallback;
 			this.updateSettings(pTimerSizeInSec_flt,pPieClr_str);

 				 this.chronometerPgrp.Start(
	 	 	this.totalMs, 
	 	 	true, //countdown mode 
	 	 	this.callbackTerminal, //pDispatch_fun
	 	 	0, //pCallBackTime
	 	 	0) ;
			Ticker.add(this.callbackTerminal.bind(this));
 			//Ticker.add(this.updateShape.bind(this));
  		}

  		  unrun()
  		{
			zog("unrun called");
			Ticker.removeAll(); //@ only using .remove is not working 
  			Ticker.remove(this.callbackTerminal.bind(this));
  			//????? this.cnt.removeChild(this.shape);  
  			this.chronometerPgrp.Stop();
  		}

  		   callbackTerminal()
		 {
			//zog("pTime",pTime);	
			var pTime = this.chronometerPgrp.Get_total_milliseconds();
			this.startAngle  = -90 - (  360 * pTime/this.totalMs) ; 
			this.label_Lb.text = Chronometer.Get_MMSS(pTime) ;
 		 	 
 		 	 if(pTime > 0 )
 		 	 { 
	   	 	 	this.updateShape();
   	 	 	}
   	 	 		else
   	 	 		{
					zog("timeout");	
					this.label_Lb.text ="0";
					this.unrun();
   	 	 			if(this.timeoutCallback) this.timeoutCallback(PieTimerEvent.TIME_OUT_COMPLETE);
   	 	 		} 


 		 }
 		
 		  updateShape()
 		{
				 zog("helo");
			this.shape.graphics.clear();
			this.shape.graphics.f(this.pieClr_Str);
			this.shape.graphics.moveTo(0,0)
  			    var s = this.startAngle  * Math.PI/180;
			    var e = ( this.endAngle )*Math.PI/180;
			   
				this.shape.graphics.arc(0,0,this.w/2,s,e);
  			     	
	 
  			 	this.zimStage.update();	 
		}
		 
	 
	}
 
	 