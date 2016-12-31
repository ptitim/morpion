const DEUXJOUEUR = 0;
const FACILE = 1;
const MOYEN = 2;
const DIFFICILE = 3;
const EXTREME = 4;
const PLAYER = 0;
const IA = 1;
const DIFINIT = DEUXJOUEUR;

const ROND = "rond";
const CROIX = "croix";

class VueGrille{
    constructor(player, ia){
        this.player = player;
        this.ia = ia;
        this.tabHtml = [];
        this.grille = document.createElement('table');
        for(let i = 0; i < 3; i++){
            let ligne = document.createElement('tr');
            for(let j = 0; j < 3; j++){
                let cases = document.createElement('td');

                let casePlayer = document.createElement('div');
                casePlayer.className = "forme player";
                casePlayer.dataset.forme = CROIX;

                let caseIa = document.createElement('div');
                caseIa.className = "forme ia";
                caseIa.dataset.forme = ROND;

                cases.appendChild(caseIa);
                cases.appendChild(casePlayer);
                this.tabHtml.push(cases);
                cases.addEventListener('click', this.playerPlay.bind(this));
                ligne.appendChild(cases);
                // 
            }
            this.grille.appendChild(ligne);
        }
        document.getElementById('plateau').appendChild(this.grille);
    }

    getBoard(){
        return this.grille;
    }

    playerPlay(event){
        this.player.play(this.setCase, event.target);
    }
    setCase(forme, eleHtml){
        if(eleHtml){
            eleHtml.removeEventListener('click', this.playerPlay);
            for(let i =0; i < eleHtml.children.length ; i++){
                eleHtml.children[i].dataset.forme == forme ? eleHtml.children[i].classList.remove('forme'): null;
            }
        }else{
        }
    }

}

class Ia{
    constructor(dif){
        this.difficulty = dif;
    }

}

class Player{
    constructor(name = "Player"){
        this.name = name;
    }
    play(caller, ele){
        caller(ele)

    }
}

class Game{
    constructor(){
        this.difficulty = DEUXJOUEUR;
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
            this.buttons[i].dataset.dif == DIFINIT ? this.buttons[i].disabled  = true : this.buttons[i].disabled = false;      
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