// --- Légende ---\\
// VIDE     = 0   \\
// HERBE    = 1   \\
// BESTIOLE = 2   \\
// BESTIOLE,      \\
// MOURANTE = 3   \\
// -------------- \\


//----Variable-Setup----\\


var matrice = [];
var toile   = 800;
var taille  = 100;
var nbSpawnBH = 10;
var cote    = toile / taille;
var fellipse = 8.5;

var bestioles = [];
var herbes = [];

var cycleH = 0;
var limiteH = 2;
var clone = 4;
var affame = 3;
var SpawnCountDown = 0;
var spawnValue = 20;


var ok1 = false;
var ok2 = false;
var ok3 = false;
var ok4 = false;


let couleurH = ""; 
let couleurB = "";
let couleurF = "";
let dyingColorB = 0;

var choiseB = "";
var choiseH = "";

var perso = false;
var bordures = "";

var framerate = 0;

//------color-tabs------\\

var colorListFr = ["bleu","bleu clair","bleu fonce","rouge","rouge fonce","jaune","jaune claire","jaune fonce","violet","vert","vert clair","vert fonce","gris","orange","marron","corail","gris fonce","blanc","noir","rose","rose clair","rose fonce"];
var colorListAngl = ["blue","lightblue","darkblue","red","darkred","yellow","lightyellow","darkyellow","purple","green","lightgreen","darkgreen","gray","orange","brown","coral","darkgray","white","black","pink","lightpink","darkpink"];


  // ----------------------   SETUP   ---------------------- \\

function setup() {
  createCanvas(toile + 1, toile + 1);
  // createCanvas(window.innerWidth, window.innerHeight);
  background("#E6E6FA");
  stroke("#a2a2e0");

  var start = prompt("Veux tu personnaliser la simulation ? ( oui, non )");

  if(start == "oui") {
    perso = true
    
    //----Var-Setup-Couleur---\\
    
    couleurH = prompt("De quelle couleur veux tu que l'herbe soit ? (Pas d'accents)");
    colorHerbe();

    if ( ok1 == false) {
      while(ok1 == false)
      {
        couleurH = prompt("La couleur demandée pour l'herbe n'est pas disponible");
        colorHerbe();
        console.log("ok1 = " + ok1);
      }
    }

    couleurB = prompt("De quelle couleur veux tu que les bestioles soient ? (Pas d'accents)");
    colorBestioles();

    if ( ok2 == false) {
      while(ok2 == false) {
        couleurB = prompt("La couleur demandée pour les bestioles n'est pas disponible");
        colorBestioles();
        console.log("ok2 = " + ok2);
      }
    }
    
    couleurF = prompt("De quelle couleur veux tu que le fond soit ? (Pas d'accents)");
    colorFont();

    if ( ok3 == false) {
      while(ok3 == false) {
        couleurF = prompt("La couleur demandée pour le fond n'est pas disponible");
        colorFont();
        console.log("ok3 = " + ok3);
      }
    }
    /*
    dyingColorB = prompt("De quelle couleur veux tu que les bestioles mourantes soient ? (Pas d'accents)");
    colorDyingBestioles();

    if ( ok4 == false)
    {
      while(ok4 == false)
      {
        dyingColorB = prompt("La couleur demandée pour les bestioles n'est pas disponible");
        colorDyingBestioles();
        console.log("ok4 = " + ok4);
      }
    }
    */

    choiseB = prompt("De quelle forme veux tu que les bestioles soit ? ( carre ou rond ), (Pas d'accents)");
    FormeBestioles();

    if (choiseB == 0)
    {
      console.log("pas bon bestioles");
      while(choiseB == 0)
      {
        choiseB = prompt("La forme demandée n'est pas disponible.( carre ou rond ), (Pas d'accents)");
        FormeBestioles();
      }
    }

    choiseH = prompt("De quelle forme veux tu que l'herbes soit ? ( carre ou rond ), (Pas d'accents)");
    FormeHerbes();

    if (choiseH == 0)
    {
      console.log("pas bon herbes");
      while(choiseH == 0)
      {
        choiseH = prompt("La forme demandée n'est pas disponible.( carre ou rond ), (Pas d'accents)");
        FormeHerbes();
      }
    }
  
    console.log(colorListFr);
    console.log(colorListAngl);
    dyingColorB = color(255, 0, 0, 100);
  } else if (start == 2) {

    //---Default---\\
    perso = true;
    couleurH = "green";
    couleurB = color(255, 0, 0);
    couleurF = "white";
    dyingColorB = color(255, 0, 0, 100 );
    choiseH = "rond"
    choiseB = "rond"
    FormeBestioles();
    FormeHerbes();
    console.log("rond")

  } else {

    //---Default---\\
    couleurH = "green";
    couleurB = color(255, 0, 0);
    couleurF = "white";
    dyingColorB = color(255, 0, 0, 100);
    choiseH = "carre"
    choiseB = "carre"
    console.log("carre")

  }

  
  console.log("Maj couleurH : " + couleurH);  
  console.log("Maj couleurB : " + couleurB); 
  console.log("Maj couleurF : " + couleurF); 
  console.log("Maj choiseB : " + choiseB);
  console.log("Maj choiseH : " + choiseH);
  console.log("Maj dyingColorB : " + dyingColorB);

  
  framerate = prompt("Quelle vitesse veux tu que le jeux tourne ? ( 1 : très lent, 10 : lent, 50 : rapide, 100 : très rapide )")
  console.log("frameRate " + framerate);
  bordures = prompt("Veux tu qu'il y ai des bordures ? ( oui, non )")
  console.log(bordures);
  
  //----Bordures----\\
  
  if (bordures == "non") {
    noStroke()
  }
  
  //--Replissage-matrice--\\
  
  for (var y = 0; y < taille; y++) {
    matrice[y] = [];
    for (var x = 0; x < taille; x++) {
      matrice[y][x] = 0;
    }
  }
  
  for (var i = 0; i < nbSpawnBH; i++) {
    Naissance(nbSpawnBH/5 + i, i);  
  }
  for (var i = 0; i < nbSpawnBH; i++) {
    Growing(i,i); 
  }
}

/* ----------------------   DRAW   ---------------------- */

function draw() {
  
  frameRate(framerate);
  
  cycleH++;
  SpawnCountDown++;
  for (var i in bestioles) {
    if(bestioles[i].dying == true) {
      matrice[bestioles[i].y][bestioles[i].x] = 3;
    }
  }

  //----Dessin-matrice----\\

  for (var y = 0; y < matrice.length; y++)
  {
    for (var x = 0; x < matrice[y].length; x++)
    {
      if (matrice[y][x] == 3)
      {
        fill(dyingColorB);

        if ( perso == true)
        {
          if (choiseB == 1)
          {
            rect(x * cote, y * cote, cote, cote);
            //console.log("carre");
          }
          else if (choiseB == 2)
          {
            ellipse(x * cote + fellipse, y * cote + fellipse, cote, cote);
            //console.log("rond");
          }
        }
        else
        {
          rect(x * cote, y * cote, cote, cote);
          //console.log("carre" + " default");
        }
      }
      else if (matrice[y][x] == 2)
      {
        fill(couleurB);

        if ( perso == true)
        {
          if (choiseB == 1)
          {
            rect(x * cote, y * cote, cote, cote);
            //console.log("carre");
          }
          else if (choiseB == 2)
          {
            ellipse(x * cote + fellipse, y * cote + ellipse, cote, cote);
            //console.log("rond");
          }
        }
        else
        {
          rect(x * cote, y * cote, cote, cote);
          //console.log("carre" + " default");
        }
      }
      else if (matrice[y][x] == 1)
      {
        fill(couleurH);

        if ( perso == true)
        {
          if (choiseH == 1)
          {
            rect(x * cote, y * cote, cote, cote);
            //console.log("carre");
          }
            else if (choiseH == 2)
          {
            ellipse(x * cote + fellipse, y * cote + fellipse, cote, cote);
            //console.log("rond");
          }
        }
        else
        {
          rect(x * cote, y * cote, cote, cote);
          //console.log("carre" + " default");
        }
      }
      else if (matrice[y][x] == 0)
      {
        fill(couleurF);
        rect(x * cote, y * cote, cote, cote);
      }
      
    }
  }

  //----eboueurs----\\

  for ( var i in bestioles)
  {
    if(bestioles[i].vivant == false)
    {
      matrice[bestioles[i].y][bestioles[i].x] = 0;
      bestioles.splice(i,1);
      console.log("mort" + i);
    }
  }
  //----cycles----\\

  for (var i in bestioles)
  {
    bestioles[i].bouger();
  }

  if (cycleH >= limiteH)
  {
    cycleH = 0;
    for (var i in herbes)
    {
      herbes[i].pousser();
    }
  }
  if(SpawnCountDown >= spawnValue)
  {
    Naissance(10,10);
    Growing(5,5);
    console.log("Spawn///////////////////////////")
  }
}


//-----FONCTIONS-de-Spawn----\\ 

function Naissance(y,x)
{
  matrice[y][x] = 2;
  bestioles.push(new Bestiole(y,x));
}

function Growing(y,x)
{
  matrice[y][x] = 1;
  herbes.push(new Herbe(y,x));
}

//---Color-functions---\\

function colorHerbe()
{
  for(var i in colorListFr)
  {
    console.log(i);
    if(couleurH == colorListFr[i])
    {
      couleurH = colorListAngl[i];
      console.log("couleurH = " + couleurH);
      ok1 = true;
      break;
    }
  }
  return(couleurH);
}
function colorBestioles()
{
  for(var i in colorListFr)
  {
    console.log(i);
    if(couleurB == colorListFr[i])
    {
      couleurB = colorListAngl[i];
      console.log("couleurB = " + couleurB);
      ok2 = true;
      break;
    }
  }
  return(couleurB);
}
function colorDyingBestioles()
{
  for(var i in colorListFr)
  {
    console.log(i);
    if(dyingColorB == colorListFr[i])
    {
      dyingColorB = colorListAngl[i];
      console.log("dyingColorB = " + dyingColorB);
      ok4 = true;
      break;
    }
  }
  return(couleurB);
}
function colorFont()
{
  for(var i in colorListFr)
  {
    console.log(i);
    if(couleurF == colorListFr[i])
    {
      couleurF = colorListAngl[i];
      console.log("couleurF = " + couleurF);
      ok3 = true;
      break;
    }
  }
  return(couleurF);
}

//---Shape-Functions---\\

function FormeBestioles()
{
  if ( choiseB == "carre")
  {
    choiseB = 1;
    console.log("choiseB = carre");
  }
  else if ( choiseB == "rond")
  {
    choiseB = 2;
    console.log("choiseB = rond");
  }
  else
  {
    choiseB = 0;
  }
  return(choiseB);
}
function FormeHerbes()
{
  if ( choiseH == "carre")
  {
    choiseH = 1;
    console.log("choiseH = carre");
  }
  else if ( choiseH == "rond")
  {
    choiseH = 2;
    console.log("choiseH = rond");
  }
  else
  {
    choiseH = 0;
  }
  return(choiseH);
}


/*_______________END_______________\\
\\---------------------------------*/