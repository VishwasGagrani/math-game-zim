
import  Main  from './Main-class.js';
import MenuController from './ctrlr/MenuController-class';
import './handler/indexHandler'  ;


var menu =null ;
var gameApp = null; //to hold the game app instance
document.addEventListener('DOMContentLoaded', Init);

 
function Init()
{

     const signoutLink = document.getElementById('signout_Id');
     
    if (signoutLink) {
        signoutLink.addEventListener('click', signoutClickedStatus);
    }
    menu = new MenuController(statusTerminal); //4 buttons to choose the game 
    
}

 function signoutClickedStatus()
    {
      
      window.location.href = "../index.php";
     
        $.post("./route.php",
      {
        status_Str: Api.USER_SIGNOUT_REQUESTED
      },
      function(data,status)
      {
       }); 
    }
function statusTerminal( pStatus_str)
{
    switch(pStatus_str)
    { 
        case 'AdditionBtnClickedStatus':
        case 'SubtractionBtnClickedStatus':
        case 'MultiplicationBtnClickedStatus':
        case 'DivisionBtnClickedStatus':
                Hide_navbar();
              gameApp = new Main(pStatus_str,statusTerminal,window.userid);
    
        break ;

        case "backToMainMenu":
               
               if (gameApp) {
                   gameApp.Destroy();
               }
            menu.showMainMenu();
            Show_navbar();


        break;
 
    }



}

function Hide_navbar()
{
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'none';
    }
    
 
}
function Show_navbar()
{
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'block';
    }
}
