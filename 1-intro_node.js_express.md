# Création d'un prémier projet node.js avec le framework express

#### Package.js
On commence par créer un dossier vide.
Dans le dossier vide en question, on construit un package.json qui contiendra les informations et dépendances du projet:

        npm init
        
Notre package.js est en place. Pour installer des dépendances (qui sont listées et documentées sur liste site https://www.npmjs.com/) on utilise la commande:

    npm install <nom de la dependance> --save
        ou encore
    npm install <nom de la dependance> --save-dev : pour les dependances en utilisées uniquement en période de développement.
    
    Exemples: npm install express --save 
                et
            npm install mocha --save-dev (pour les tests unitaires)
                ou
            npm install -g mocha (installer en global pour tous les projets futurs)

Pour installer plusieurs dépendances à la fois, on les sépare par des espaces:

    Exemple: npm install body-parser request morgan --save

Un dossier nommé node_modules contenant les dépendances est automatiquement créé.

Maintenant, nous allons créer notre serveur (un fichier nommer server.js qui contient le code ci-dessous):
    
    // On obtient le framework express
    var express = require('express');
    
    // On construit initialise notre application
    var app = express();
    
    // On ecoute sur le port 5000
    app.set('port', 5000);

    // La page d'acceuil
    app.get('/',function(req,res,next){
        res.status(200);
        res.send("Bienvenue ...");
    });

    // On lance le server
    app.listen(app.get('port'),function(){
        console.log('App is running on port :' + app.get('port'));
    });

    // On rend l'application disponible
    module.exports = app;

Ensuite, on lance l'application avec la commande:
    
    node server.js
    
Notre application roule sur http://localhost:5000/

                                                                Gabriel Y Gamy
