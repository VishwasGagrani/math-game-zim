import 'bootstrap/dist/css/bootstrap.min.css';
 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
 

export default class MenuController {
    constructor(pstatusterminal ) {
        this.statusTerminal = pstatusterminal; // status string to determine which training to load
        this.mainMenu = document.getElementById('mainMenu_Id');
     //   this.backToMainMenu = document.getElementById('backToMainMenu');
    
        this.init();
    }

    init() {
        // Ensure only the main menu is visible initially
        this.showMainMenu();

            const menuButtons = {
                additionTraining: 'AdditionBtnClickedStatus',
                subtractionTraining: 'SubtractionBtnClickedStatus',
                multiplicationTraining: 'MultiplicationBtnClickedStatus',
                divisionTraining: 'DivisionBtnClickedStatus',
            };
    
            for (const [buttonId, status] of Object.entries(menuButtons)) 
            {
                const button = document.getElementById(buttonId);
                if (button) {
                    button.addEventListener('click', () => {
                        this.statusTerminal(status);
                        this.hideMainMenu();
                    });
                } 
            }
        
        // Attach event listener to the "Back to Main Menu" button
      //  this.backToMainMenu.addEventListener('click', () => this.showMainMenu());
    }

    showMainMenu() {

        this.mainMenu.style.display = 'block';
        //this.backToMainMenu.style.display = 'none';
        
        const canvasElements = document.querySelectorAll('canvas');
        canvasElements.forEach(canvas => canvas.parentNode.removeChild(canvas));

    }

    hideMainMenu() {
       // this.canvas = document.getElementById('myCanvas');

        this.mainMenu.style.display = 'none';
     //   this.backToMainMenu.style.display = 'block';
      //  this.canvas.style.display = 'block';
    }
}