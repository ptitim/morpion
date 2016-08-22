function include(fileName){
  document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
}
include("difIa.js");

const PLAYER = 1;
const IA = 2;

const FA = "facile";
const MO = "moyen";
const DIF = "difficile";


//click du joueur
function playerPlay(event){
  var elementHTML = event.target;

  setCase(PLAYER, elementHTML);//mise a jour du plateau avec la valuer du jouer
  if(genereVerif()){
    return;
  }else if (nul.indexOf(0) == -1) {
    setTimeout(reset, 500);
  }
  choixIa();
  if(genereVerif()){
    return;
  }else if (nul.indexOf(0) == -1) {
    setTimeout(reset, 500);
  }
}

function setCase(who ,ele){

  if(ele){ //verifies is the html element exist
    ele.removeEventListener("click",playerPlay);//remove the click
    plateauIa = majTab(plateauIa, ele);//delete where the player has played
    nul[indexnul] = who;//list of plays (player and ai)
    indexnul++;//index of plays
    ele.value = who;
    var child = ele.children;//tab of element html (contain cross and cicle)
    var index = who -1;//select the cross for the player and the circle for the ai
    child[index].classList.remove('forme');//display's it
    elementJouer.push(child[index]);
    return child;
  }
  return null;
}

//supprime l'element HTML dans le tableau
function majTab(tab, ele){
  for (var i = 0; i < tab.length; i++) {
    if(tab.indexOf(ele) != -1){
      var index = tab.indexOf(ele);
      tab.splice(index, 1);
    }
  }
  return tab;
}

function choixIa(){
    if(difficulter == FA){
        setCase(IA,easy(plateauIa));
        return true;
    }else if (difficulter == MO) {
        setCase(IA,medium(plateauIa,tabIa));
        return true;
    }else if (difficulter == DIF) {
        setCase(IA,hard(plateauIa,tabIa));
        return true;
    }
    return false;
}

function choixDifficulter(e){
    var bouton = document.getElementsByTagName('input');
    for (var i = 0; i < bouton.length; i++) {
          bouton[i].disabled = false;
    }
    e.disabled = true;
    difficulter = e.value
    return e.value;
}
//verification des ligne rempli
function genereVerif(){

  if(verif(ligne1) || verif(ligne2) || verif(ligne3) || verif(colonne1) || verif(colonne2) || verif(colonne3)
  || verif(diag1) || verif(diag2)){
    var e = document.getElementById('name');
    if(gagnant == PLAYER){
      e.innerHTML = "YOU";
      afgScore();
      setTimeout(reset, 500);
      return true;
    }else if(gagnant == IA) {
      e.innerHTML = "THE RANDOM THING";
      afgIa();
      setTimeout(reset, 500);
      return true;
    }
  }
  return false;
}

function afgScore(){
  var e = document.getElementById('afgScore');
  score++;
  e.innerHTML = score;
}
function afgIa(){
  var e = document.getElementById('afgIa');
  scoreIa++;
  e.innerHTML = scoreIa;
}

function verif(tab){
  if(tab[0].value == tab[1].value && tab[1].value == tab[2].value && tab[0].value){
    gagnant = tab[0].value;
    console.log(gagnant);
    return true;
  }else{
    return false;
  }
}

function reset(){
  gagnant = 0;
  for (var i = 0; i < elementJouer.length; i++) {
    elementJouer[i].classList = 'forme';
  }
  plateauIa = initTab();
  plateau = initTab();
  elementJouer = [];
  setTimeout(function(){document.getElementById('name').innerHTML =""},1000);
  ligne1 = [plateau[0][0],plateau[0][1],plateau[0][2]];
  ligne2 = [plateau[1][0],plateau[1][1],plateau[1][2]];
  ligne3 = [plateau[2][0],plateau[2][1],plateau[2][2]];

  colonne1 = [plateau[0][0],plateau[1][0],plateau[2][0]];
  colonne2 = [plateau[0][1],plateau[1][1],plateau[2][1]];
  colonne3 = [plateau[0][2],plateau[1][2],plateau[2][2]];

  diag1 = [plateau[0][0], plateau[1][1], plateau[2][2]];
  diag2 = [plateau[2][0], plateau[1][1], plateau[0][2]];
  return true;
}

var difficulter = FA;
var nul = []; //contient les valeur jouez, permet le reset si toute les case on eter jouer
var indexnul = 0;//index pour le tableau nul
var elementJouer = [];//tableau des element html jouez
var score = 0;
var scoreIa = 0;
var gagnant = 0;//identifiant du gagnant (1 = player)(2 = IA) (0= personne);
var plateauIa;
var plateau = initTab();

//generation des ligne pour la verification et pour l'"ia"
var ligne1 = [plateau[0][0],plateau[0][1],plateau[0][2]];
var ligne2 = [plateau[1][0],plateau[1][1],plateau[1][2]];
var ligne3 = [plateau[2][0],plateau[2][1],plateau[2][2]];

var colonne1 = [plateau[0][0],plateau[1][0],plateau[2][0]];
var colonne2 = [plateau[0][1],plateau[1][1],plateau[2][1]];
var colonne3 = [plateau[0][2],plateau[1][2],plateau[2][2]];

var diag1 = [plateau[0][0], plateau[1][1], plateau[2][2]];
var diag2 = [plateau[0][2], plateau[1][1], plateau[2][0]];

var tabIa =[ligne1,ligne2,ligne3,colonne1,colonne2,colonne3,diag1,diag2];

function initBouton(){
      var bout = document.getElementsByTagName('input');
      for (var i = 0; i < bout.length; i++) {
        bout[i].disabled = false;
      }
      bout[0].disabled = true;
      difficulter = FA;
};
initBouton();

function initTab(){
  var tab = [];
  var tableHTML = document.getElementsByClassName('case');
  var index = 0;
  nul = [];
  indexnul = 0;
  plateauIa = [];
  elementJouer = [];

  for (var i = 0; i < tableHTML.length/3; i++) {
    tab.push([]);
    for (var j = 0; j < 3; j++) {
      if(tableHTML[index] != undefined){
        tab[i][j] = tableHTML[index];
        plateauIa.push(tableHTML[index]);
        index++;
        tab[i][j].value = 0;
        nul.push(0);
        tab[i][j].addEventListener("click",playerPlay);
      }
    }
  }
  return tab;
}
