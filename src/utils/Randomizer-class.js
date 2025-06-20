 
export default class Randomizer 
{ 
	constructor()
	{

	}

   static True_false()
	{
		return Math.random() < 0.5;
	}

 

 	/** Return a random float between 'from' and 'to', inclusive. */
		static Random_range (
	from, //value of from will be included in output
	to //value of to will be included in output
	) {
		return from + ((to - from) * Math.random());
	
	}


	/** Return a random string of a certain length.  You can optionally specify 
	    which characters to use, otherwise the default is (a-zA-Z0-9) */
	 randomString (
	len , 
	charactersToUse  = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	){
		var str = "";
		for (var i = 0; i< len ;i++)
		{
			str += charactersToUse.charAt(Random_range(0, charactersToUse.length - 1));
		}
		return str;
	}
 
 
	//updated on: 24 sep 2021 in neopphgdv21i4a project
	//guide: getRandomItemsFromArray will take an array. And give out a copy of random subset array 
	getRandomItemsFromArray( //tested // input an array, output n-random items. If n == arr.length then
		//this function acts liks shuffle
		pOriginal_arr, // original array with items
		n ,// number of items to be output. Can be same as original or less 
		pAnchorPos_arr=[]//array of position to be anchored ( not to be shuffled)
 		) {
		
		if( !n ||  n> pOriginal_arr.length)
		{
			n = pOriginal_arr.length;
		}
		
		 var out_arr =[] ;//= pOriginal_arr.slice(); // guide: Don't slice(0,n) Must make it 0 to full length. Not just 0 to n. Because we want shuffle the whole array. Otherwise you will always get values from 0 to n only
		 

		 var anchor_arr =[];
		// if(!pAnchorPos_arr) pAnchorPos_arr=[]; //just use blank array if not mentioned

		 //remove the anchored values so that they are not a part of shuffle 
		for ( var i=0 ;i< pOriginal_arr.length ;i++)
		{
			var j =  pAnchorPos_arr.indexOf(i) ;
			if(j == -1)
			{ 	
				out_arr.push(pOriginal_arr[i]);
			}
			else 
			{
				anchor_arr.push(pOriginal_arr[i]);
			}
		}


		 
		Randomizer.shuffle (out_arr);

	 
		//put back the anchored values in the anchored positions 
		var out2_arr =[];
		
		for ( var i=0,k=0 ;i< pOriginal_arr.length ;i++)
		{
			var j =  pAnchorPos_arr.indexOf(i) ;
			if(j >= 0 )
			{ 	
				//console.log(i,anchor_arr[j])
				out2_arr.push(anchor_arr[j]); //put back value in there 
			}
			else 
			{
				out2_arr.push(out_arr[k]);
				k++;
			}
 		}
 
		//cut the array to the max length required 
 
		out2_arr.splice(n,pOriginal_arr.length); //remove off all items after n. 
		//( project-specific-eg: remove off all after 8 to 29. So we have 0 to 7 )
 		 
	 	return out2_arr;

	}

	//getRandomItemsFromArray too acts like shuffle
	/** Shuffle an Array.  This operation affects the array in place, and returns that array.
		The shuffle algorithm used is a variation of the [Fisher Yates Shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) */
	 static shuffle(arr ) 
	{
		if (arr!=null) 
		{
			for (var i = 0; i< arr.length ;i++) 
			{
				var j =  parseInt(Randomizer.Random_range(0, arr.length - 1));
				var a = arr[i];
				var b = arr[j];
				arr[i] = b;
				arr[j] = a;
			}
		}
		
		return arr;
	}

	 
}