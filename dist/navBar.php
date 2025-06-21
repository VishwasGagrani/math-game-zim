<?php  
$str= <<<abcd
<nav class="navbar navbar-expand-lg navbar-custom-color sticky-top " aria-label="">
    <div class="container-fluid">
      <a class="navbar-brand navbar-custom" href="#"  >MathTraining.com</a>
 
       <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar_Id" 
       aria-controls="" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="collapsibleNavbar_Id">
      
      <ul class="navbar-nav me-auto mb-2 mb-sm-0">
      %adminSection%
      </ul>

        <ul class="navbar-nav ms-auto" style='text-align: right;'>
           <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle nav-link-custom" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                  <span class="dropdown-item-text" style="font-size: 0.9em;">%email%</span>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a id="signout_Id" class="dropdown-item" href="javascript:void(0);">Signout</a>
                </li>
              </ul>
            </li>
         </ul>

       </div>
    </div>
  </nav>   
abcd; 


$str1= <<<efgh

 
<li class="nav-item">
<a class="nav-link nav-link-custom" href="../admin/index.php" target="_blank">Admin Area</a>
</li>
 

efgh;
 
$str = str_replace("%email%", '<p>'. $_SESSION["signedInUserEmail"].'</p>',$str);
$str = str_replace("%userId%", '<p>'. $_SESSION["signedInUserId"].'</p>',$str);
  
 //error_log("value of isAdmin is >>>> ". $_SESSION["isAdmin"]);

if($_SESSION["isAdmin"] == "1" )
{
  $str = str_replace("%adminSection%", $str1,$str);
}
else 
{
 $str = str_replace("%adminSection%", "" ,$str); 
}

echo $str ;
 ?> 