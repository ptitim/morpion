class VueGrille{
    constructor(){
        let grille = document.createElement('table');
        for(let i = 0; i < 3; i++){
            let ligne = document.createElement('tr');
            for(let j = 0; j < 3; j++){
                let cases = document.createElement('td');

                let casePlayer = document.createElement('div');
                casePlayer.className = "forme player";

                let caseIa = document.createElement('div');
                caseIa.className = "forme ia";
                cases.addEventListener('click');


                cases.appendChild(casePlayer);
                cases.appendChild(caseIa);
                ligne.appendChild(cases);
            }
            grille.appendChild(ligne);
        }
        document.body.appendChild(grille);
    }
}

class Ia{

}

class Player{
    constructor(){

    }
}