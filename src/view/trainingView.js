
import InfoDisplay from "../viewcomponent/InfoDisplay-class.js";
import pieTimerDorg from "../viewcomponent/pieTimerDorg.js";	
import keypadGinorg from "../viewcomponent/keypadGinorg.js";	
import {Button, Container, Label, Rectangle, Layout, ResizeManager} from "zimjs";
import PieTimerEvent, { ZimFrameEvent } from "../SimpleTypes.js";
import GameSettings from "../settings/GameSettings-class.js";


		export default class trainingView //status terminal of the model 
 	  { 
		constructor(pFrame,pStatusTerminal_fun)
 	  		{ 
		 
				this.frame =pFrame;
				this.zimStage = pFrame.stage; 
				this.mdlStatusTerminal_Fun = pStatusTerminal_fun;
				this.game_Cnt;
				this.header;
				this.HUD;
				this.footer;
				this.levelInfo_Cnt;
				this.keyPad_Cnt;
				this.pieTimer_Pt;
				this.manager ;
				this.questionLive_Lb ; //question showing right now 
				this.questionNext_Lb ; //upcoming queston 
				this.levelInfoBox_Arr ;//
				this.statsInfoBox_Arr;
				this.info; 
				this.title_Str ; 
				this.keypad_Kp ;
				this.buttonLabel_Arr ;
  	  		 
 
 			 	this.info = new InfoDisplay( this.frame,400,300 ); 

			} 


			 setStatusTerminal(pStatusTerminal_fun)
			{
					 this.mdlStatusTerminal_Fun = pStatusTerminal_fun ;
			}



			 cmdTerminal( pCmd_str, pVal_str )
			{
 				switch(pCmd_str)
				{
					 

					case "displayLiveQuestion":
						this.questionLive_Lb.text = pVal_str;
 					break; 

 					case "displayNextQuestion":
						this.questionNext_Lb.text = pVal_str;
 					break; 

 					case "createLiveLevel":
  						 this.createLiveLevel();
 					break; 

 					case "createLiveStats":
						this.createLiveStats();
 					break; 

 					case "displayLiveLevel":
						this.displayLiveLevel(parseInt(pVal_str));
  					break; 

 					


 					case "displayStats":

 							var arr = pVal_str.split(",");

 							for( var i=0; i< arr.length; i++ )
 							{ 
 								if( i % 2 == 0 ) //only labels at 0,2,4,6,  
 								{ 
 									zog(arr[i]);
 									switch(  arr[i] )
 									{ 
 										case "countGoal":
 											this.statsInfoBox_Arr[0].text = arr[i+1] ;
 										break; 

 										case "count":
											this.statsInfoBox_Arr[1].text = arr[i+1] ;
 										break; 
 										
 										case "correct":
											this.statsInfoBox_Arr[2].text = arr[i+1] ;
 										break; 
 										
 										case "correctPercent":
											this.statsInfoBox_Arr[3].text = parseInt( arr[i+1]) ;
 										break; 

										case "correctPercentGoal":
											this.statsInfoBox_Arr[4].text = arr[i+1] ;
 										break; 
 
 									}//switch 

  								}//if 

 							}//for 
  					break; 
 				}

					this.zimStage.update();
 
			}//cmdTerminal 

			Start( )
			{
				this.statsInfoBox_Arr[1].text = "0";
					 
						this.statsInfoBox_Arr[2].text = "0";
					 
						this.statsInfoBox_Arr[3].text = "0";
 										 
						this.pieTimer_Pt.run(
							GameSettings.GAME_TIME, //time in sec
							red, //pie color of timer
							this.Handle_status.bind(this)) //callback on each tick
			}
		 
			Handle_events(e)
			{
				switch(e.type)
				{ 
					case ZimFrameEvent.RESIZE:
						this.manager.resize();
 			        
  					break; 
				}

				 
				
			}

			 Handle_status(pStatus_str,pVal_str)
			{
			 	zog("  Handle_status ", pStatus_str);	

			 
				switch(pStatus_str)
				{ 
					 
					case "keypadGinorg.submitBtnClicked":
 						this.mdlStatusTerminal_Fun("ansSubmissionComplete",pVal_str);
  					break; 

 					case "keypadGinorg.valueChanged":

 					break ;

 					case PieTimerEvent.TIME_OUT_COMPLETE:
 						//
						// this.mdlStatusTerminal_Fun( "timeoutComplete");
						this.Handle_timeout_complete();
 					break; 

					case "Main Menu":
  						
							//this.info.undisplay();

   							this.mdlStatusTerminal_Fun("mainMenuBtnClicked");

  						break; 
  						case  "Start Again":
  						
							this.keypad_Kp.clearScreen();
							this.info.undisplay();

  							this.mdlStatusTerminal_Fun("playAgainBtnClicked");
  						break; 

  						case "Next Level":
  						{
						 
							this.keypad_Kp.clearScreen();
							this.info.undisplay();;
  							this.mdlStatusTerminal_Fun("nextLevelBtnClicked");
  						}
						break; 

  						case "Restart\nTraining":
  						
							this.keypad_Kp.clearScreen();
							this.info.undisplay();;
  							this.mdlStatusTerminal_Fun("restartTrainingClicked");
  						
   					break; 

 					}
 		 
 				this.zimStage.update();
			}

		Handle_timeout_complete()
		{
			if(this.liveLevelCount_Int < 5)
			{ 
				this.Display_alert(  this.liveLevelCount_Int);
			}
			else 
			{
				this.DisplayTrainingCompleteAlert(this.liveLevelCount_Int);
			}
		}

			DisplayTrainingCompleteAlert(pVal_str)
			{ 
				
				this.info.display("Training Complete!",
					["Start Again", "Restart\nTraining"],
					[this.Handle_status.bind(this),this.Handle_status.bind(this)] );
					//@ Not able to get e.currentTarget.text's value. That's why using 
					//Handle_status  instead of Handle_event(e)
			}

				Display_alert(pVal_str)
			{ 
				this.info.display("Level-"+ pVal_str +" Timeout!",
					["Start Again","Next Level"],
					[this.Handle_status.bind(this),this.Handle_status.bind(this)] );

			}

			 display( pView_obj) //pTitle_str , pButtonLabel_arr)
			{
				this.title_Str = pView_obj.title_Str ;
				this.buttonLabel_Arr = pView_obj.buttonLabel_Arr ;// pButtonLabel_arr;
  				this.createLayout();//frame);
  				this.addUiToHUD();
  				this.addUiToHeader();//headerSectInfo_Vo);
 				this.addUiToBody();//ui_obj);
   				this.addUIToFooter();
				this.zimStage.addChild(this.info.view_Cnt);
  				this.zimStage.update();	
 			}

			 undisplay()
			{
				 

				this.zimStage.removeAllChildren();
 				 
 				this.zimStage.update();
			}
 
			 createLayout()
			{
				
				this.header = new Container(800,450 * 10/100);
				 this.header.addTo(this.zimStage);
				 
				//this.zimStage.addChild(this.header);

				this.game_Cnt = new Container(800,450 * 60/100);
				this.game_Cnt.addTo(this.zimStage);
				//this.game_Cnt.type = "Region";  
 
				this.HUD =  new Container(800,450 * 30/100).addTo(this.zimStage);//new Label({text:"Hud Hud"});
 				this.footer =  new Container(800,450 * 5/100).addTo(this.zimStage);//new Label({text:"footer footer"});
 
				const layout1 = new Layout(this.zimStage, [
				{object:this.header, height:10, marginTop:0, maxWidth:120,minHeight:10,  valign:"middle"},
				{object:this.HUD, height:20,  marginTop:0, marginBottom:1, maxWidth:100,  valign:"middle"},
 				{object:this.game_Cnt, marginTop:0, height:55, valign:"top"},
				{object:this.footer,  height:5,  maxWidth:50,minHeight:5, valign:"middle"} 
				],3, 0, null, true,false);
				
				this.button_Cnt = new Container(400,450*10/100).addTo(this.header);
				this.title_Cnt = new Container(400,450*10/100).addTo(this.header);
				const layout1_1 = new Layout(this.header, [
			        {object:this.button_Cnt, height:10,  marginLeft:0, align:LEFT,valign:MIDDLE},
			        {object:this.title_Cnt, height:10,  marginLeft:0,align:LEFT, valign:MIDDLE},
			    ], 0,0, null , false, false);


				this.levelInfo_Cnt = new Container(800/2,450*60/100).addTo(this.game_Cnt); 
				this.keyPad_Cnt = new Container(800/2,450*60/100).addTo(this.game_Cnt);
     

			    const layout1_2 = new Layout(this.game_Cnt, [
			        {object:this.levelInfo_Cnt,  marginLeft:3, align:CENTER, valign:MIDDLE},
			        {object:this.keyPad_Cnt,   marginLeft:3,align:CENTER, valign:MIDDLE},
			    ], 3,3, null, false, false);


			    
  
			      this.manager = new ResizeManager()
			        .add(layout1)
					.add(layout1_1)
			        .add(layout1_2);    
			    
			    this.frame.on ( ZimFrameEvent.RESIZE ,this.Handle_events.bind(this));

 			}//createLayout

 			 createLiveLevel()
 			{
 				new Label({text:"Level-1", size:15}).pos(0,10,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Level-2", size:15}).pos(0, 60+10,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Level-3", size:15}).pos(0,120+10,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Level-4", size:15}).pos(0,180+10,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Level-5", size:15}).pos(0,240+10,LEFT,TOP,this.levelInfo_Cnt);

 				var rec={width:100,height:40,color:"yellow",corner:5, borderColor:"black", borderWidth:3};
 				var arr = this.buttonLabel_Arr ;// ["1÷1 to 4÷4","1÷1 to 6÷6","2÷2 to 10÷10","2÷2 to 12÷12","2÷2 to 20÷20"];

				var j=0;
				this.levelInfoBox_Arr=[]; 
				for( var i=0;i < arr.length ;i++)
				{
					 
 					this.levelInfoBox_Arr[i] =  new Label({text:arr[i], size:15,backing:new Rectangle(Object.assign({}, rec)).centerReg(), valign:"middle", align:"center"}).pos(80,j,LEFT,TOP,this.levelInfo_Cnt);
 					j += 60;
 				}

 			}
 			 createLiveStats()
 			{
 				new Label({text:"Count Goal", size:15}).pos(210,10,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Count", size:15}).pos(210,70,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Correct", size:15}).pos(210,130,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Percentage", size:15}).pos(210,190,LEFT,TOP,this.levelInfo_Cnt);
				new Label({text:"Percentage\nGoal", size:15}).pos(210,250,LEFT,TOP,this.levelInfo_Cnt);


 				var rec={width:80,height:40,color:"white",corner:5, borderColor:"black", borderWidth:3}
  				var j=0;
  				this.statsInfoBox_Arr=[];

				for( var i=0;i < 5 ;i++)
				{
					this.statsInfoBox_Arr[i] = new Label({text:"0", size:15 ,backing:new Rectangle(Object.assign({}, rec)).centerReg(), valign:"middle", align:"center"}).pos(300,j,LEFT,TOP,this.levelInfo_Cnt);
 					j += 60;
 				}
  			}

 			 displayLiveLevel( pLevelCount_int)
 			{
				
				this.liveLevelCount_Int = pLevelCount_int;

 				var recWhite={width:100,height:40,color:"white",corner:5, borderColor:"black", borderWidth:3}

				for( var i=0; i< this.levelInfoBox_Arr.length; i++)
				{
					if(pLevelCount_int == i+1 )
					{
						this.levelInfoBox_Arr[i].backing.color ="yellow"
					}
					else 
					{
						 
						this.levelInfoBox_Arr[i].backing.color ="white"
					}

 				}//for 
  			}
 
			 addUiToHeader()
			{
				 
				  // Add title label centered in title_Cnt
    new Label({ text: this.title_Str, size: 25, align: "left", valign: "middle" })
        .pos(0, 0, LEFT, MIDDLE, this.title_Cnt);
 
    const btn = new Button({ label: new Label({text:"Main Menu",size:15, color:0xffffff, borderColor:0,borderWidth:2}) ,width:150,height:40 });
    btn.pos(btn.width/2, 0, LEFT, CENTER, this.button_Cnt);
 
    btn.on("click", () => this.Handle_status("Main Menu"));
				
 			}
 		 
			
			 addUiToHUD()
			{
					this.questionLive_Lb = new Label({text:"", size:50, align:"center", valign:"middle"}).addTo(this.HUD).center();
 
					this.pieTimer_Pt= new pieTimerDorg( this.frame);
 					 
					this.pieTimer_Pt.view_Cnt.pos(50,25,LEFT,TOP, this.HUD);	

					this.questionNext_Lb = new Label({ text:"", size:20, align:"right", valign:"middle"} ).pos(0,0,RIGHT,CENTER,this.HUD);
 
					this.zimStage.update();
						
 			}


			 addUiToBody()
			{
				
				this.cmdTerminal("createLiveLevel");
  				this.cmdTerminal("createLiveStats");
 
				  this.keypad_Kp = new keypadGinorg( 
				400,450*6/10, //width 

				true, //to show display field on top or not? 
				this.Handle_status.bind(this),  //call back  
				this.Handle_status.bind(this), //submit  
				null,  //audio path 
				this.frame
				);
				this.keypad_Kp.view_Cnt.pos(0,0,CENTER,CENTER,this.keyPad_Cnt); 
			}



			 addUIToFooter()
			{
				 new Label({text:"Copyright Text"}).pos(0,0,CENTER,CENTER,this.footer);
 			}

			Destroy()
			{
				this.pieTimer_Pt.unrun();
				this.keypad_Kp.clearScreen();
				this.info.undisplay();;
				this.zimStage.removeAllChildren();
				 
			}


   	 }

 
