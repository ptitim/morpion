
//prend en parametre un tableau d'element html renvoie un element au hasard
function easy(plateau){
    var x = Math.floor(Math.random()*plateau.length);
    var e = plateau[x];
    console.log("ia joue au hasard");
    return e;
};


//prend un tableau d'element html, renvoie un element html pour empecher le joueuer de gagner (aleatoire sinon);
//prend un tableau representant les ligne gagnante
function medium (plateau, tab){
  var intel = false; //pour le cas ou l'ia joue par rapport aujouer sinon joue au hasard
  for (var i = 0; i < tab.length; i++) {
    var compteur = 0;
    for (var j = 0; j < tab[j].length; j++) {
      if(tab[i][j].value == PLAYER){
          compteur++;
      }
      if(tabIa[i][j].value == 0){
          var e = tab[i][j];
      }
    }
    if(compteur == 2){
      intel = true;
      if(e){
          console.log("ia joue contre le joueur medium");
          return e;
      }
    }
  }
  if(!intel){
    var x = Math.floor(Math.random()*plateau.length);
    var e = plateau[x];
    console.log("ia joue au hasard medium");
    return e;
  }
};

//prend un tableau d'element html, renvoie un element html pour empecher le joueuer de gagner
//ou de gagner elle si possible (aleatoire sinon);
//prend un tableau representant les ligne gagnante
function hard(plateau, tab){
  var intel = false;
  //verifie si elle peu gagner
  for (var i = 0; i < tab.length; i++) {
    var compteur = 0;
    for (var j = 0; j < tab[j].length; j++) {
      if(tab[i][j].value == IA){
          compteur++;
      }
      if(tabIa[i][j].value == 0){
          var e = tab[i][j];
      }
    }
    if(compteur == 2){
      intel = true;
      if(e){
          console.log("ia joue pour gagnez");
          return e;
      }
    }
  }
  for (var i = 0; i < tab.length; i++) {
    var compteur = 0;
    for (var j = 0; j < tab[j].length; j++) {
      if(tab[i][j].value == PLAYER){
          compteur++;
      }
      if(tabIa[i][j].value == 0){
          var e = tab[i][j];
      }
    }
    if(compteur == 2){
      intel = true;
      if(e){
          console.log("ia joue contre le joueur difficile");
          return e;
      }
    }
  }
  if(!intel){
    var x = Math.floor(Math.random()*plateau.length);
    var e = plateau[x];
    console.log("ia joue au hasard difficile");
    return e;
  }

}