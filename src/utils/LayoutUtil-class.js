 		
export default class LayoutUtil { 
		 	

 	//Layout 
		
		//review/retest: 18apr2020
		//unit-test: /mac-store/Google Drive/library/freelancing-business/programming/repository/lab/as3/framework/unit-tests/grid-table.fla
 		//when you already know the width of stage
		//pItem_num => number of items 
		 
		static getGridPointArrayForGivenWidth = function 
		(
		pItem_num, 
		pItemWidth_num, 
		pItemHeight_num, 
		pWidth_num, 
		pHgap_num, 
		pVgap_num
		)
		{
			var point_arr = [];
			var x;
			var y;

			var colndex_num = -1;
			var rowIndex_num = -1;

		 
			/* Following two lines are wrong formula
			//guide: w = itemWidth * ( n ) + gap * ( n-1) 
			var col_num = ((pWidth_num + pHgap_num) / (pItemWidth_num + pHgap_num));
			*/
			/*corrected above two lines:
			//guide: w = itemWidth * ( n ) + gap * ( n+1) */
			var col_num = ((pWidth_num - pHgap_num) / (pItemWidth_num + pHgap_num));

			col_num = Math.floor(col_num);
			var row_param_num = Math.floor((pItem_num / col_num) + 1); //upper value always  1.2 = 2 , 1.6 = 2 


			var offsetX_param_num = 0;
			var offsetY_param_num = 0; 
 

			//updating the offset, as it will change, if the above value of columns, is having values after decimals
			var add_num = (pWidth_num - (col_num * pItemWidth_num + (col_num - 1) * pHgap_num)) / 2;
			offsetX_param_num += add_num;
			//	offsetY_param_num += add_num ; //adding vertically too, so that it looks equal 
 
			for (var i = 0; i < pItem_num; i++)
			{

				if (i % col_num == 0)
				{

					colndex_num = 0;
					rowIndex_num += 1; //incrementing downwards 
					
					if (rowIndex_num == row_param_num - 1) //last row 
					{
						var lastRowRemaining_num = pItem_num % col_num; // if there are lesser items remaining in the last row, then centere them
 						offsetX_param_num += ((col_num - lastRowRemaining_num) * (pItemWidth_num + pHgap_num)) / 2;
					}
				}

				x = offsetX_param_num + (pHgap_num * colndex_num + pItemWidth_num * colndex_num);
				colndex_num++;


				y = offsetY_param_num + (pVgap_num * (rowIndex_num) + pItemHeight_num * rowIndex_num);

				point_arr[i] = {x:x, y:y};

			}

			return point_arr;

		}



		

//updated  on 2aug2020 
//unit-test 2aug2020 
		
 
//2aug2020
		 
		static getGridPointArray = function(
			pCntWidth_num, //width of container. But no x,y position facility yet here. 
			pCntHeight_num, // height of container. But no x,y position facility yet here 
			//eg put stage.stageWidth and stage.stageHeight. The items will show in center of stage
			pItem_num, //number of items 
			itemWidth_param_num, //item width
			itemHeight_param_num, //item height
			row_param_num, //number of rows you want 
			col_param_num, //number of columns
			pHgap_num, //horizontal gap
			pVgap_num //vertical gap
		)
		{
			
			
			var point_arr = [];
			var x;
			var y;

			var posX = -1;
			var posY = -1;

			var offsetX_param_num =0;
			var offsetY_param_num=0 ;
			
			//validate actual number of rows. As the user can provide any value 
			//wrong>>>> row_param_num = int((pItem_num / col_param_num) + 1); //upper value always  1.2 = 2 , 1.6 = 2 
		row_param_num = Math.ceil(pItem_num / col_param_num) ; //upper value always  1.2 = 2 , 1.6 = 2 
				
		if(pCntWidth_num>0)
		{
		 offsetX_param_num =	((pCntWidth_num - (col_param_num*itemWidth_param_num) - ((col_param_num-1) * pHgap_num)) )/2; 
		}
 
		if(pCntHeight_num>0)
		{
 			offsetY_param_num = ((pCntHeight_num - (row_param_num*itemHeight_param_num) - ((row_param_num-1) * pVgap_num)) )/2; 
		}
 
 			// trace(pCntHeight_num,offsetY_param_num,"offsetY_param_num")

			for (var i = 0; i < pItem_num; i++)
			{

				if (i % col_param_num == 0)
				{
					posX = 0;
					posY += 1;
					 
					//if (posY == row_param_num - 1) //last row 
					if( LayoutUtil.areItemsLessThanItemPerRow(pItem_num,posY,col_param_num)) //	//This also means that it is the last row. 
					{
						var lastRowRemaining_num = pItem_num % col_param_num; // if there are lesser items remaining in the last row, then centere them
 						offsetX_param_num += ((col_param_num - lastRowRemaining_num) * (itemWidth_param_num + pHgap_num)) / 2;
 					}//if
				}//if
 
				x = offsetX_param_num + (pHgap_num * (posX) + itemWidth_param_num * posX);
 
				posX++;
				y = offsetY_param_num + (pVgap_num * (posY) + itemHeight_param_num * posY);

				point_arr[i] = {x:x, y:y};

			}//for

			return point_arr;

		}//grid
		
		
			//check if items (horizontally) in the row are less than the items in other rows. 
		//This also means that it is the last row. 
		static areItemsLessThanItemPerRow=function(pItem_num,posY  ,col_param_num) 
		{
			
			var remainingItem_Num = pItem_num- ((posY  ) * col_param_num);

			return remainingItem_Num < col_param_num ;
		}

	
////Layout 
	
		

  //tested
	 static setRandomMcPosInsideArea=function( mc_arr,area_mc) 
{
	var arr =[];
for( var i=0 ;i< mc_arr.length;i++)
	{
	arr.push(new Point(
	vrandom.randomRange( area_mc.width/mc_arr.length * i +10,   (area_mc.width *(i+1)/mc_arr.length )- mc_arr[i].width),
	  vrandom.randomRange(5, area_mc.height- mc_arr[i].height -5 )
		));
	}
	 
	return vrandom.getRandomItemsFromArray( arr,mc_arr.length);
	 
}
	 /*example:
		
 	 pt_arr = getRandomPuzzlePosition([mc1,mc2,mc3],mc4);	
  	
	*/
	
}