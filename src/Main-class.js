
import {Frame, Waiter } from "zimjs";
import trainingMdl from "./trainingMdl.js";	
import trainingView from "./view/trainingView.js";
import BaseViewCtrlr from "./ctrlr/BaseViewCtrlr-class.js";	

export default class Main 
{
#frame; 
#zimStage ;
#trainingView_Tv ; 
#addition_Mdl;
#subtraction_Mdl;
#multiplication_Mdl;
#division_Mdl;
#base_view_ctrlr_Bvc; // controller for the views
status_Str; // status string to determine which training to load


constructor(pStatus_str,pstatus_terminal,pid) 
    {
		this.userid= pid;  
		this.status_Str = pStatus_str; // status string to determine which training to load
		this.statusTerminalIndex = pstatus_terminal ; // status string to determine which training to load
		this.#base_view_ctrlr_Bvc = new BaseViewCtrlr(); // controller for the views
		var waiter = new Waiter();
		var assets = null;//[{font:"CourierNewPS-BoldMT", src: fp+ "CourierNewPS-BoldMT.ttf"},ap+"beep.mp3", ip+"zim-js.png"];
		
		if(this.#frame==null)
			{  
			this.#frame = new Frame(FULL, 960, 540, lighter, "0xFFCC99",this.Zim_frame_has_loaded.bind(this),assets,"" ,waiter);
			}
			else 
			{
				this.Zim_frame_has_loaded();
			}
		
 
 }


   Zim_frame_has_loaded() 
 {

	  
	 this.#zimStage = this.#frame.stage;

	  switch(this.status_Str)
	  {
		  
		  case "AdditionBtnClickedStatus":
			  
		  
			  this.loadAdditionTraining();
			  
		  break; 
		  
		  case "SubtractionBtnClickedStatus":
			  
			  this.loadSubtractionTraining();
			  
		  break; 
		  
		  case "MultiplicationBtnClickedStatus":
			   
			  
			  this.loadMultiplicationTraining();
  
		  break; 
  
		  case "DivisionBtnClickedStatus":
			   
			  
			  this.loadDivisionTraining();
  
		  break; 
		}
		this.#zimStage.update();		
	}

	//unload the view and model when the user clicks on the back button
		Destroy()
		{
				if(this.#addition_Mdl)
				{
					this.#addition_Mdl.Destroy();
				}
				if(this.#subtraction_Mdl)
				{
					this.#subtraction_Mdl.Destroy();

				}
				if(this.#multiplication_Mdl)
				{
					this.#multiplication_Mdl.Destroy();

				}
				if(this.#division_Mdl)
				{
					this.#division_Mdl.Destroy();
				}

				this.#trainingView_Tv.Destroy();
			}
						
						
						loadAdditionTraining()
						{
							if(!this.#addition_Mdl)
								{
						this.#addition_Mdl = new trainingMdl();
						this.#addition_Mdl.Factory_settings(this.updateUserProgress,this.statusTerminalIndex);
					}
 						if(!this.#trainingView_Tv)		
						{ 
 							this.#trainingView_Tv= new trainingView(this.#frame) ;
 							this.#base_view_ctrlr_Bvc.addViewAndId(this.#trainingView_Tv, this.#trainingView_Tv.id );
						}
						 
						this.#trainingView_Tv.setStatusTerminal( this.#addition_Mdl.statusTerminal.bind(this.#addition_Mdl));

 						//check temporary global file called: divisionTrainingMdl.js  ( only for localhost testing )
						
 						this.#base_view_ctrlr_Bvc.display(this.#trainingView_Tv.id, 
 							{title_Str: "Addition Training",  
 							 buttonLabel_Arr: ["1+1 to 4+4","1+1 to 6+6","2+2 to 10+10","2+2 to 12+12","2+2 to 20+20"]
 						});
 						
 						this.#addition_Mdl.view= this.#trainingView_Tv ;//global variable in divisionTrainingMdl.js 
 						this.#addition_Mdl.Start("1",
 						{ 
 							gameType_Str: trainingMdl.ADDITION_GAME ,
	 						liveQuestionCount_Int:1,
							correct_Int:0,
							correctPercent_Int:0,
							liveLevelCount_Int:1,
							userId_Int: this.userid ,// <?php echo $_SESSION["signedInUserId"] ?>
  						});//,liveLevelCount_Int);  //start level=1, create-question=10 
 						
 						this.#trainingView_Tv.Start();

		}//loadAdditionTraining

		 loadSubtractionTraining()
		{

				zog("loadSubtractionTraining called");	
 				 	if(!this.#subtraction_Mdl)
					{
						this.#subtraction_Mdl = new trainingMdl();
						this.#subtraction_Mdl.Factory_settings(this.updateUserProgress,this.statusTerminalIndex);
					}
 						if(!this.#trainingView_Tv)		
						{ 
							this.#trainingView_Tv= new trainingView(this.#frame);
 							this.#base_view_ctrlr_Bvc.addViewAndId(this.#trainingView_Tv, this.#trainingView_Tv.id );
						}
					
						this.#trainingView_Tv.setStatusTerminal( this.#subtraction_Mdl.statusTerminal.bind(this.#subtraction_Mdl));
 						//check temporary global file called: divisionTrainingMdl.js  ( only for localhost testing )
						
 						this.#base_view_ctrlr_Bvc.display(this.#trainingView_Tv.id, 
 							{title_Str: "Subtraction Training",  
 							 buttonLabel_Arr: ["1-1 to 4-4","1-1 to 6-6","2-2 to 10-10","2-2 to 12-12","2-2 to 20-20"]
 						});
 						
 						this.#subtraction_Mdl.view= this.#trainingView_Tv ;//global variable in divisionTrainingMdl.js 
 						
 						this.#subtraction_Mdl.Start("1",
 						{ 
 							gameType_Str: trainingMdl.SUBTRACTION_GAME ,
	 						liveQuestionCount_Int:1,
							correct_Int:0,
							correctPercent_Int:0,
							liveLevelCount_Int:1,
							userId_Int: this.userid //<?php echo  $_SESSION["signedInUserId"] ?>
  						});//,liveLevelCount_Int);  //start level=1, create-question=10 
 						
 						this.#trainingView_Tv.Start();

		}

 loadMultiplicationTraining()
		{
 
 				 	if(!this.#multiplication_Mdl)
					{
						this.#multiplication_Mdl = new trainingMdl();
						this.#multiplication_Mdl.Factory_settings(this.updateUserProgress,this.statusTerminalIndex);
					}
 						if(!this.#trainingView_Tv)		
						{ 
							this.#trainingView_Tv= new trainingView(this.#frame);
 							this.#base_view_ctrlr_Bvc.addViewAndId(this.#trainingView_Tv, this.#trainingView_Tv.id );
						}
					
						this.#trainingView_Tv.setStatusTerminal( this.#multiplication_Mdl.statusTerminal.bind(this.#multiplication_Mdl));
 						//check temporary global file called: divisionTrainingMdl.js  ( only for localhost testing )
						
 						this.#base_view_ctrlr_Bvc.display(this.#trainingView_Tv.id, 
 							{title_Str: "Multiplication Training",  
 							    buttonLabel_Arr: ["1x1 to 4x4","1x1 to 6x6","2x2 to 10x10","2x2 to 12x12","2x2 to 20x20"]
 						});
 						
 						this.#multiplication_Mdl.view= this.#trainingView_Tv ; 
 						
 						this.#multiplication_Mdl.Start("1",
 						{ 
 							gameType_Str: trainingMdl.MULTIPLICATION_GAME ,
	 						liveQuestionCount_Int:1,
							correct_Int:0,
							correctPercent_Int:0,
							liveLevelCount_Int:1,
							userId_Int: this.userid ,// <?php echo  $_SESSION["signedInUserId"] ?>
  						}); 
 						
 						this.#trainingView_Tv.Start();

		}


		 		 loadDivisionTraining()
		{
 
 				 	if(!this.#division_Mdl)
					{
						this.#division_Mdl = new trainingMdl();
						this.#division_Mdl.Factory_settings(this.updateUserProgress,this.statusTerminalIndex);
					}
 						if(!this.#trainingView_Tv)		
						{ 
							this.#trainingView_Tv= new trainingView(this.#frame);
 							this.#base_view_ctrlr_Bvc.addViewAndId(this.#trainingView_Tv, this.#trainingView_Tv.id );
						}
					
						this.#trainingView_Tv.setStatusTerminal( this.#division_Mdl.statusTerminal.bind(this.#division_Mdl));
 						//check temporary global file called: divisionTrainingMdl.js  ( only for localhost testing )
						
 						this.#base_view_ctrlr_Bvc.display(this.#trainingView_Tv.id, 
 						{title_Str: "Division Training",  
 							 buttonLabel_Arr: ["1÷1 to 4÷4","1÷1 to 6÷6","2÷2 to 10÷10","2÷2 to 12÷12","2÷2 to 20÷20"]  
 						});
 						
 						this.#division_Mdl.view= this.#trainingView_Tv ; 
 						
 						this.#division_Mdl.Start("1",
 						{ 
 							gameType_Str: trainingMdl.DIVISION_GAME ,
	 						liveQuestionCount_Int:1,
							correct_Int:0,
							correctPercent_Int:0,
							liveLevelCount_Int:1,
							userId_Int: this.userid // <?php echo  $_SESSION["signedInUserId"] ?>
  						}); 
 						
						  this.#trainingView_Tv.Start();

		}




   
 
 
 updateUserProgress(pUserProgressData_obj)
{
	console.log(pUserProgressData_obj);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "userProgressUpdater.php", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			// Handle the response
			console.log("Data: " + xhr.responseText + "\nStatus: " + xhr.status);
		}
	};
	xhr.send(JSON.stringify(pUserProgressData_obj));
  
} // updateUserProgress

}