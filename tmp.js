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
        generateBoard();
    }
    generateBoard(){
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
            }
            this.grille.appendChild(ligne);
        }
        var plateauHtml = document.getElementById('plateau');
        if(plateauHtml)
            plateauHtml.parentNode.removeChild(plateauHtml);
        plateauHtml.appendChild(this.grille);
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
    easy(){
        var x = Math.floor(Math.random()*plateau.length);
        var e = plateau[x];
        return e;
    }
    medium(){
        var intel = false; //pour le cas ou l'ia joue par rapport aujouer sinon joue au hasard
        for (var i = 0; i < this.tab.length; i++) {
            var compteur = 0;
            var e = undefined;
            for (var j = 0; j < this.tab[j].length; j++) {
            if(this.tab[i][j].value == PLAYER){
                compteur++;
            }
            if(this.tab[i][j].value == 0){
                e = this.tab[i][j];
            }
            }
            if(compteur == 2){
            intel = true;
            if(e){
                return e;
            }
            }
        }
        if(!intel){
            var x = Math.floor(Math.random()*plateau.length);
            var e = plateau[x];
            return e;
        }
    }
    hard(){
        var intel = false;
        //verifie si elle peu gagner
        for (var i = 0; i < this.tab.length; i++) {
            var compteur = 0;
            var e = undefined;
            for (var j = 0; j < this.tab[j].length; j++) {
            if(this.tab[i][j].value == IA){
                compteur++;
            }
            if(this.tabIa[i][j].value == 0){
                e = this.tab[i][j];
            }
            }
            if(compteur == 2){
            if(e && e.value != PLAYER){
                intel = true;
                return e;
            }
            }
        }
        for (var i = 0; i < this.tab.length; i++) {
            var compteur = 0;
            var e = undefined;
            for (var j = 0; j < this.tab[j].length; j++) {
            if(this.tab[i][j].value == PLAYER){
                compteur++;
            }
            if(this.tabIa[i][j].value == 0){
                e = this.tab[i][j];
            }
            }
            if(compteur == 2){
            intel = true;
            if(e){
                return e;
            }
            }
        }
        //test de toute les case a coter de celle jouer pour en trouver une non jouer
        //si aucune posibiliter, l'ia joue au hasard
        for (var i = 0; i < this.tab.length; i++) {
            for (var j = 0; j < this.tab[i].length; j++) {
            if(this.tab[i][j].value == IA){
                if (this.tab[i][j+1]) {
                    if (this.tab[i][j+1] == 0) {
                        e = this.tab[i][j+1];
                        return e;
                    }
                }else if (this.tab[i][j-1]) {
                    if (this.tab[i][j-1] == 0) {
                    e = this.tab[i][j-1];
                    return e;
                    }
                }else if (this.tab[i+1][j]) {
                    if (this.tab[i+1][j] == 0) {
                    e = this.tab[i+1][j];
                    return e;
                    }
                }else if (this.tab[i-1][j]) {
                    if (this.tab[i-1][j] == 0) {
                    e = this.tab[i-1][j];
                    return e;
                    }
                }else if (this.tab[i-1][j+1]) {
                    if (this.tab[i-1][j+1] == 0) {
                    e = this.tab[i-1][j+1];
                    return e;
                    }
                }else if (this.tab[i-1][j-1]) {
                    if (this.tab[i-1][j-1] == 0) {
                    e = this.tab[i-1][j-1];
                    return e;
                    }
                }else if (this.tab[i+1][j+1]) {
                    if (this.tab[i+1][j+1] == 0) {
                    e = this.tab[i+1][j+1];
                    return e;
                    }
                }else if (this.tab[i+1][j-1]) {
                    if (this.tab[i+1][j-1] == 0) {
                    e = this.tab[i+1][j-1];
                    return e;
                    }
                }
            }
            }
        }
            var x = Math.floor(Math.random()*plateau.length);
            var e = plateau[x];
            return e;
    }
    extreme(){
            var e;//representent la case jouez
    //gestion du cas central (joueur joue au centre au premier coup)
    if(plateau[1][1].value == PLAYER){
      console.log("bonjour");
        if(plateau[1][1].value == PLAYER && indexnul == 1){//indexnul ici sert a verifier que ces la premiere action de l'ia
            e = plateau[0][0];
            return e;
        }
        if(plateau[1][1].value == PLAYER && indexnul == 3 && plateau[2][2].value == PLAYER){
            e = plateau[0][2];
            return e;
        }
  }else if (indexnul == 1 && plateau[1][1] != PLAYER) {
      e = plateau[1][1];
      return e;
  }
  if(indexnul == 3){
      //-X-   //--X   //-X-
      //X0-   //X0-   //-0-
      //---   //---   //X--
      if((plateau[1][0].value == PLAYER && (plateau[0][1].value == PLAYER || plateau[0][2].value == PLAYER))
       || plateau[2][0].value == PLAYER && plateau[0][1].value == PLAYER){
          e = plateau[0][0];
          return e;
      }
      //-X-   //-X-   //X--
      //-0X   //-0-   //-0X
      //---   //--X   //---
      else if ((plateau[0][1].value == PLAYER && (plateau[2][1].value == PLAYER || plateau[1][2].value == PLAYER))
             || plateau[0][0].value == PLAYER && plateau[1][2].value == PLAYER  ) {
          e = plateau[0][2];
          return e;
      }
      //---   //---   //--X
      //-0X   //-0X   //-0-
      //-X-   //X--   //-X-
      else if ((plateau[1][2].value == PLAYER && (plateau[2][1].value == PLAYER || plateau[2][0].value == PLAYER))
            ||  plateau[2][1].value == PLAYER && plateau[0][2].value == PLAYER) {
          e = plateau[2][2];
          return e;
      }
      //---   //X--  //---
      //X0-   //-0-  //X0-
      //-X-   //-X-  //--X
      else if((plateau[2][1].value == PLAYER && (plateau[0][0].value == PLAYER || plateau[0][1].value == PLAYER))
            || plateau[1][0].value == PLAYER && plateau[2][2].value == PLAYER){
          e = plateau[2][0];
          return e;
      }
      //--X   //X--
      //-0-   //-0-
      //X--   //--X
      else if ((plateau[0][2].value == PLAYER && plateau[2][0].value == PLAYER) || (plateau[0][0].value == PLAYER && plateau[2][2].value == PLAYER)) {
          e = plateau[0][1];
          return e;
      }
  }
  //copie de l'ia difficile a la zeubie
  var intel = false;
  //verifie si elle peu gagner
  for (var i = 0; i < this.tab.length; i++) {
    var compteur = 0;
    var e = undefined;
    for (var j = 0; j < this.tab[j].length; j++) {
      if(this.tab[i][j].value == IA){
          compteur++;
      }
      if(this.tabIa[i][j].value == 0){
          e = this.tab[i][j];
      }
    }
    if(compteur == 2){
      if(e && e.value != PLAYER){
        intel = true;
          return e;
      }
    }
  }
  for (var i = 0; i < this.tab.length; i++) {
    var compteur = 0;
    var e = undefined;
    for (var j = 0; j < this.tab[j].length; j++) {
      if(this.tab[i][j].value == PLAYER){
          compteur++;
      }
      if(this.tabIa[i][j].value == 0){
          e = this.tab[i][j];
      }
    }
    if(compteur == 2){
      intel = true;
      if(e){
          return e;
      }
    }
  }

  //en dernier recours l'ia joue au hasard
  var x = Math.floor(Math.random()*plateauIa.length);
  var e = plateauIa[x];
  return e;
    }
}

class Player{
    constructor(name = "Player"){
        this.name = name;
    }
    play(caller, ele){
        caller(ele);
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