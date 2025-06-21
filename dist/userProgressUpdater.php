<?php

include "../localconnect.php";
 
$data = json_decode(file_get_contents('php://input'), true);

// Now $data is an associative array
$gameType_Str = $data['gameType_Str'];
$level_Int = $data['level_Int'];
$userId_Int = $data['userId_Int'];
$countGoal_Int = $data['countGoal_Int'];
$count_Int = $data['count_Int'];
$correct_Int = $data['correct_Int'];
$percentage_Int = $data['percentage_Int'];
$percentageGoal_Int = $data['percentageGoal_Int'];


// Prepare the SQL statement
  
$sql = "INSERT INTO userProgress_tbl (gameType, userId, gameLevel, count, countGoal, correct, percentage, percentageGoal)
VALUES ('$gameType_Str', '$userId_Int', '$level_Int', '$count_Int', '$countGoal_Int', '$correct_Int', '$percentage_Int', '$percentageGoal_Int')
ON DUPLICATE KEY UPDATE 
    gameType = '$gameType_Str', 
    userId = '$userId_Int', 
    gameLevel = '$level_Int', 
    count = '$count_Int', 
    countGoal = '$countGoal_Int', 
    correct = '$correct_Int', 
    percentage = '$percentage_Int', 
    percentageGoal = '$percentageGoal_Int'";
  
//  echo $sql ; 	 
//echo ("Received data: " . print_r($data, true));

		 $result = mysqli_query($mysqli,$sql) ;

 
 
 	
 
 

/*
include "../localconnect.php";
 
    $level_Int= $_POST["level_Int"] ;
    $userId_Int =$_POST["userId_Int"] ;
    $countGoal_Int=$_POST["countGoal_Int"] ;
    $count_Int=$_POST["count_Int"] ;
    $correct_Int=$_POST["correct_Int"] ;
    $percentage_Int =$_POST["percentage_Int"] ;
    $percentageGoal_Int= $_POST["percentageGoal_Int"] ;

    $sql = "SELECT * from userProgress_Tbl where  userId = $userId_Int AND  gameLevel = $level_Int  " ;

    $result = $mysqli -> query($sql);

    $rowcount=mysqli_num_rows($result);

    if($rowcount > 0 ) //
    {
      $sql = "UPDATE userProgress_Tbl set count = $count_Int , countGoal = $countGoal_Int, correct = $correct_Int, percentage = $percentage_Int, 
      percentageGoal = $percentageGoal_Int  where userId = $userId_Int AND gameLevel=$level_Int";
 
    }
    else 
    {
    $sql = "INSERT INTO userProgress_Tbl (userId , gameLevel, count, countGoal, correct, percentage, percentageGoal  ) 
    VALUES ( '$userId_Int' ,'$level_Int', '$count_Int','$countGoal_Int','$correct_Int', '$percentage_Int', '$percentageGoal_Int' )";  
     }

        $mysqli -> query($sql);
  
$mysqli -> close();
*/
 
 	
 
?>