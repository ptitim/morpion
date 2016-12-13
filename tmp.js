class VueGrille{
    constructor(player, ia){
        let grille = document.createElement('table');
        for(let i = 0; i < 3; i++){
            let ligne = document.createElement('tr');
            for(let j = 0; j < 3; j++){
                let cases = document.createElement('td');

                let casePlayer = document.createElement('div');
                casePlayer.className = "forme player";

                let caseIa = document.createElement('div');
                caseIa.className = "forme ia";

                cases.appendChild(casePlayer);
                cases.appendChild(caseIa);
                ligne.appendChild(cases);
            }
            grille.appendChild(ligne);
        }
        document.getElementById('plateau').appendChild(grille);
    }
    getBoard(){
        return this.grille;
    }
}

class Ia{
    constructor(dif){
        this.difficulty = dif;
    }

}

class Player{
    constructor(){

    }
}

class Game{
    constructor(){
        this.difficulty = 0;
        this.boardIa = [];
        this.playerOne = new Player();
        this.ia = new Ia(this.difficulty);
        this.board = new VueGrille(this.player, this.ia);
        this.initButtons();
    }

    reset(){

    }
    initButtons(){
        this.buttons = document.getElementsByTagName('input');
        for(var i = 0; i < 5; i++){
            this.buttons[i].dataset.dif = i;
            this.buttons[i].addEventListener("click",this.disabled);
        }
    }

    disabled(event){
        this.buttons = document.getElementsByTagName('input');
        for(let i = 0; i < 5; i++){
            this.buttons[i].className = "";
        }
        event.target.className = "disabled";
    }
    selectDificulty(event){
        this.ia.difficulty = event.target.dataset.difficulty;
    }

}

var game = new Game();