
import Randomizer from "./utils/Randomizer-class";

   	  export default class trainingMdl  
 	  { 
  	  	
		static ADDITION_GAME = "additionGameType";
		static MULTIPLICATION_GAME = "multiplicationGameType";
		static SUBTRACTION_GAME = "subtractionGameType";
		static DIVISION_GAME = "divisionGameType";

 		constructor()
		{ 
			this.countGoal_Int=0 ;
			this.correctPercentGoal_Int= 0;
			this.gameType_Str = "" ; //is it addition, subtraction, multi etc? 
			this.liveQuestionCount_Int;
			this.correct_Int ;
			this.correctPercent_Int;
			this.arr0 =[];
			this.arr1 =[];
			this.userId_Int ; 
		}

		Factory_settings(pUpdateUserProgress_fun, pStatusTerminal_fun)
		{
			 this.updateUserProgress = pUpdateUserProgress_fun;
			 this.statusTerminalMainClass = pStatusTerminal_fun; //status string to determine which training to load
		}
 
   

 reversePlayChanges()
 {
	this.liveQuestionCount_Int +=1; //always 0 because of splicing  
		  this.arr0.splice(0, 1); 
		  this.arr1.splice(0, 1);
		  this.answer_Arr.splice(0,1);
			this.Start("");
 }

  Start(pVal_str,pObj)
  {
	if(pObj)
		{ 
			this.gameType_Str = pObj.gameType_Str; 
			this.liveQuestionCount_Int = pObj.liveQuestionCount_Int;
			this.correct_Int = pObj.correct_Int;
			this.correctPercent_Int = pObj.correctPercent_Int;
			this.liveLevelCount_Int=pObj.liveLevelCount_Int;
			this.userId_Int = pObj.userId_Int;	
			this.arr0=[];
			this.arr1=[];
	   }



	   if( this.arr0.length < 2 ) //if less than 2 questions are remaining. ( Remember we also need to show "next question", so 3 atleast are important in pool)
	   { 
		this.createQuestion(this.liveLevelCount_Int,3);
		 }
		 else 
		 {
			this.displayQuestion();
		 }

		 this.view.cmdTerminal("displayLiveLevel", String(this.liveLevelCount_Int));
  }

    statusTerminal(pStatus_str,pVal_str="")
 {
 		 
		zog(pStatus_str,pVal_str);
	switch(pStatus_str)
 	{
 		case "ansSubmissionComplete":
		 this.judge( pVal_str) ;
 		break; 

 		case "judgementComplete":
			
			//check index.php for  declaration
			this.updateUserProgress(
					{
						gameType_Str: this.gameType_Str,
						level_Int: this.liveLevelCount_Int,
						userId_Int: this.userId_Int,  
						countGoal_Int: this.countGoal_Int,
		 				count_Int: this.liveQuestionCount_Int,
		 				correct_Int: this.correct_Int,
		 				percentage_Int: this.correctPercent_int,
		 				percentageGoal_Int: this.correctPercentGoal_Int
		 			}
			  );
 		
			  this.reversePlayChanges();

 		break; 
 				

 	
  		case "playAgainBtnClicked":

  			this.Play_again();

  		break; 

  		case "nextLevelBtnClicked":

		  this.liveLevelCount_Int+=1;  //inc level 
		  this.arr0=[];
		  this.arr1 =[];
	 		  
			 
				this.Start(this.liveLevelCount_Int,
					{ 
 						gameType_Str: this.gameType_Str ,
	 						liveQuestionCount_Int:1,
							correct_Int:0,
							correctPercent_Int:0,
							liveLevelCount_Int:this.liveLevelCount_Int,
							userId_Int: this.userId_Int
 						}

	 		 	);
				  this.view.Start();

  		break ;

  		case "mainMenuBtnClicked":

				this.statusTerminalMainClass("backToMainMenu");

  		break; 

  		case "restartTrainingClicked":

				this.Restart_training();
  		break ;

 	}
 
} // statusTerminal

Restart_training()
{
	
	this.arr0=[];
	this.arr1 =[];
		this.Start( "1",
			  { 
				   gameType_Str: this.gameType_Str ,
					   liveQuestionCount_Int:1,
					  correct_Int:0,
					  correctPercent_Int:0,
					  liveLevelCount_Int:1,
					  userId_Int: this.userId_Int
				   }

			);
			this.view.Start();
}

Play_again()
{
	//liveLevelCount_Int+=1;  //inc level 
	this.arr0=[];
	this.arr1 =[];
	this.Start(  this.liveLevelCount_Int,
		  { 
			   gameType_Str: this.gameType_Str ,
				   liveQuestionCount_Int:1,
				  correct_Int:0,
				  correctPercent_Int:0,
				  liveLevelCount_Int:this.liveLevelCount_Int,
				  userId_Int: this.userId_Int
			   }

		);
		this.view.Start();
}

 judge(pSubmitVal_int)
{
 
 	if( this.answer_Arr[0] ==  pSubmitVal_int )
	{
		this.correct_Int += 1; 
		  this.view.cmdTerminal("displayFeedback","correct");		 
 	}
	else 
	{
		this.view.cmdTerminal("displayFeedback","incorrect");		 
	}

	this.correctPercent_int = this.correct_Int/this.liveQuestionCount_Int * 100 ;

		this.view.cmdTerminal("displayStats","correct,"+ this.correct_Int+
			",correctPercent,"+ this.correctPercent_int +",count,"+ this.liveQuestionCount_Int );		 

		this.statusTerminal("judgementComplete");

}//judge 


  createQuestion(
 	pLevel_int, //select level for the question 
 	pQuestNum_int) // num of questions you want to create 
	{

 		var fromnum_int = 0;
		var tonum_int  = 0;
 		
	  
		if (this.liveLevelCount_Int == 1 )
		{
 				fromnum_int = 1;
 				tonum_int = 4;
 				this.countGoal_Int=150 ;
				 this.correctPercentGoal_Int= 90;
		}
		else
		if (this.liveLevelCount_Int == 2  )
		{ 
				fromnum_int =1;
 				tonum_int = 6;
 				this.countGoal_Int=150 ;
				 this.correctPercentGoal_Int= 90;
		}
		else
		if (this.liveLevelCount_Int == 3 )
		{		
		 		fromnum_int = 2;
				tonum_int = 10 ;
				this.countGoal_Int=150 ;
				this.correctPercentGoal_Int= 90;
		}
		else
		if (this.liveLevelCount_Int == 4 )
		{		
		 		fromnum_int = 2;
				tonum_int = 12 ;
				this.countGoal_Int=150 ;
				this.correctPercentGoal_Int= 90;
		}
		else
		if (this.liveLevelCount_Int == 5 )
		{		
		 		fromnum_int = 2;
				tonum_int = 20 ;
				this.countGoal_Int=150 ;
				this.correctPercentGoal_Int= 90;
		}		 

		var arr0 = [];
  		var arr1 = [];
		this.arr0=[];
 		
 		while(arr0.length < pQuestNum_int ) //keep adding numbers till the number of questions you want 
 		{ 
	  		 for ( var i = fromnum_int ;i < tonum_int+1 ;i++)
			 {
				arr0.push(i)	;
 	   		 }//for 

   		}//while 
		 
		   arr1 = arr0.slice(0,arr0.length);   	

		Randomizer.shuffle(arr0);
		Randomizer.shuffle(arr1);
 
		this.answer_Arr=[];
 
		if( this.gameType_Str == trainingMdl.ADDITION_GAME)
		{
			for ( i = 0 ;i < arr0.length  ;i++)
			{
				this.answer_Arr.push(arr0[i]+arr1[i]);
			}	
		}
		else
		if( this.gameType_Str == trainingMdl.MULTIPLICATION_GAME)
		{
			for ( i = 0 ;i < arr0.length  ;i++)
			{
				this.answer_Arr.push(arr0[i] * arr1[i]);
			}	
		}
		else 
		if( this.gameType_Str == trainingMdl.SUBTRACTION_GAME)
		{

				 for ( i = 0 ;i < arr0.length  ;i++)
				{
					if(arr0[i] < arr1[i] )
					{
						 var temp = arr0[i];
						 arr0[i] = arr1[i];
						 arr1[i] = temp; 
					}
					this.answer_Arr.push(arr0[i] - arr1[i]); 
				}
		}
		else
		if( this.gameType_Str == trainingMdl.DIVISION_GAME)
		{ 	
				 for ( i = 0 ;i < arr0.length  ;i++)
				{
					if(arr0[i] < arr1[i] )
					{
						 var temp = this.arr0[i];
						 arr0[i] = arr1[i];
						 arr1[i] = temp; 
					}
					if(arr0[i] % arr1[i] == 0 )
					{ 
						this.answer_Arr.push((arr0[i] / arr1[i])); 
					}
					else 
					{
						//mark these values as unusable for the question
						arr0[i]=-1; 
						arr1[i]=-1;	
						this.answer_Arr.push(-1);
					}
				}

				//@removing the unusable questions 
				for (let i = 0; i < arr0.length; i++) {
					if (arr0[i] === -1) 
					{
						arr0.splice(i, 1);
						arr1.splice(i, 1);
						this.answer_Arr.splice(i, 1);
						i--; // Adjust index after removal
					}
				}

				 
		}

		this.arr0 = arr0.slice(0,arr0.length);   	
 		this.arr1 = arr1.slice(0,arr1.length);   	

		this.displayQuestion();
		this.view.cmdTerminal("displayStats","countGoal,"+this.countGoal_Int+",correctPercentGoal,"+ this.correctPercentGoal_Int );		 
 		
	}
 

	displayQuestion() 
	{
  			 var q = this.readQuestion(0); 
  			 this.view.cmdTerminal("displayLiveQuestion", q );

 			 //read next question too
 			 var q = this.readQuestion(1);		
			  this.view.cmdTerminal("displayNextQuestion", "Next: " + q);

 	} //displayQuestion
	

	 readQuestion(pQuestionIndex_int)
	{
		var num1 ;
		var num2 ;
 		 
		num1 = this.arr0[pQuestionIndex_int];
		num2 = this.arr1[pQuestionIndex_int];
 		 
		if( this.gameType_Str == trainingMdl.ADDITION_GAME)
			return num1 + " + " + num2 + " = ?" ;
		if( this.gameType_Str == trainingMdl.MULTIPLICATION_GAME)
			return num1 + " x " + num2 + " = ?" ;
		if( this.gameType_Str == trainingMdl.SUBTRACTION_GAME)
			return num1 + " - " + num2 + " = ?" ;
		if( this.gameType_Str == trainingMdl.DIVISION_GAME)
			return num1 + " ÷ " + num2 + " = ?" ;
 
	}

	Destroy()
	{
		this.arr0 = [];
		this.arr1 = [];
		this.answer_Arr = [];
		this.view = null;
		this.updateUserProgress = null;
		this.statusTerminalMainClass = null;
	} //Destroy



}

					
 
