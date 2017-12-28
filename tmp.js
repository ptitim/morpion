// représente le joueur physique
const Player1 = "Player1";
// Player2 un joueur physique ou l'ia'
const Player2 = "Player2";

/* Gestion des elements HTML de la grille de jeu */
class VueGrille {
    /*@type {HtmlElement}*/
    grille = new HTMLElement;

    constructor() {
        this.initGrille();
    }

    reset() {
        document.body.removeChild(this.grille);
        this.initGrille();
    }

    initGrille() {
        this.grille = document.createElement('table');
        for (let i = 0; i < 3; i++) {
            let ligne = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                let cases = document.createElement('td');

                let casePlayer = document.createElement('div');
                casePlayer.className = "forme";

                // let caseIa = document.createElement('div');
                // caseIa.className = "forme ia";
                // cases.addEventListener('click');

                cases.appendChild(casePlayer);
                // cases.appendChild(caseIa);
                ligne.appendChild(cases);
            }
            grille.appendChild(ligne);
        }
        document.body.appendChild(this.grille);
    }

    /* affiche la forme en fonction du joueur qui a joué */
    // @param player : string "Player1" | "Player2"
    // @param played : HtmlElement played
    setCase(player, played) {

        // supprime tous les event listener, la case ne doit plu changer une fois jouer
        played.removeEventListener();
        if (player == Player1) {
            played.className = "player";
        }
        else if (player == Player2) {
            played.className = "ia";
        }


    }
}

class Ia {
    EASY = "easy";
    NORMAL = "normal";
    HARD = "hard";
    UNBEATABLE = "unbeatable";

    difficulty = EASY;
    // contient les cases jouable par l'ia
    plateauIa = [];

    // contient toutes les cases du tableau
    plateau = [];
    constructor(plateau) {
        this.plateauIa = this.plateau = plateau;
    }

    // return the element choosen by the ai
    play() {
        switch (this.difficulty) {
            case this.EASY:
                return easy();
            case this.NORMAL:
                return this.medium();
            case this.HARD:
                return this.hard();
            case this.UNBEATABLE:
                return this.unbeatable();
            default:
                return this.easy();
        }
    }

    setDifficulty(newDifficulty) {
        this.difficulty = newDifficulty;
    }

    easy() {
        return this.randomPlay();
    }

    medium(){
        var e = this.playerCanWin();
        if(e != undefined)
            return e;
        else
            return randomPlay();
    }

    hard(){

    }

    unbeatable(){

    }
    // retourne la premiere case ou le joueur peut gagner, false sinon
    playerCanWin() {
        for (var i = 0; i < tab.length; i++) {
            var compteur = 0;
            var e = undefined;
            for (var j = 0; j < tab[j].length; j++) {
                if (tab[i][j].value == PLAYER) {
                    compteur++;
                }
                if (tab[i][j].value == 0) {
                    e = tab[i][j];
                }
            }
            if (compteur == 2) {
                if (e) {
                    return e;
                }
            }
            return false;
        }
    }

    aiCanWin() {

    }

    randomPlay() {
        var x = Math.floor(Math.random() * this.plateauIa.length);
        return this.plateauIa[x];
    }

}

class Player {
    constructor() {

    }
}

class Game {

}