class Bestiole
{
    constructor(y,x)
    {
        this.y = y;
        this.x = x;
        this.miam = 0;
        this.faim = 0;
        this.vivant = true;
        this.dying = false;

        this.directions =
        [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    MAJ()
    {
        this.directions =
        [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    tri()
    {

        this.MAJ();

        var vide = []; 
        var herbe = []

        for (var i in this.directions)
        {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if(x >= 0 && y >= 0 && x < taille && y < taille)
            {
                if(matrice[y][x] == 0)
                {
                    vide.push(this.directions[i]);
                }
                else if(matrice[y][x] == 1)
                {
                    herbe.push(this.directions[i]);
                }
            }
        }

        if(herbe.length === 0)
            return vide;
        else
            return herbe;

    }

    bouger()
    {
        this.faim++;

        matrice[this.y][this.x] = 0;

        //-------deplacement-------\\

        var tri = this.tri();

        if (tri && tri.length)
        {
            var newXY = random(tri);

            this.x = newXY[0];
            this.y = newXY[1];

            for (var i in herbes)
            {
                if(this.x == herbes[i].x && this.y == herbes[i].y)
                {
                    herbes.splice(i,1);
                    this.miam++;
                    this.faim = 0;
                    //console.log("mangé")
                    break;
                }
            }
        }

        matrice[this.y][this.x] = 2;

        //-------Clonage------\\

        if(this.miam >= clone)
        {
            this.miam = 0;

            var NewClone = this.tri();

            if (NewClone && NewClone.length)
            {
                var newXY = random(NewClone);

                Naissance(newXY[0],newXY[1]);

                for (var i in herbes)
                {
                    if(newXY[0] == herbes[i].x && newXY[1] == herbes[i].y)
                    {
                        herbes.splice(i,1);
                        break;
                    }
                }
            }
            
        }

        //-------Mort-------\\
        
        if(this.faim >= (affame/2))
        {
            this.dying = true
        }

        if(this.faim >= affame)
        {
            this.vivant = false;
        }
        console.log("bestiole, faim = " + this.faim);
        //console.log("faim = " + this.faim);
        //console.log("vivant = " + this.vivant);


    }
}


class Herbe
{
    constructor(y,x)
    {
        this.y = y;
        this.x = x;
        
        this.directions =
        [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    pousser()
    {
        var vide = []; 

        for (var i = 0; i < this.directions.length; i ++)
        {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if(x >= 0 && y >= 0 && x < taille && y < taille)
            {
                if(matrice[y][x] != 2 && matrice[y][x] != 1)
                {
                    vide.push(this.directions[i])
                }
            }
        }

        if (vide && vide.length)
        {
            var newXY = random(vide);

            Growing(newXY[1],newXY[0]);
        }
    }
}
