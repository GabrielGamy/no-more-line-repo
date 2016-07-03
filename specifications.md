## Description:
Application de reservation pour restaurants, boutiques (vetements, salon de coiffure/couture, garage, atelier de reparation), evenements spéciaux et autres encore ...

## Fonctionnalités à prendre en charge

### Fonctionnalités principales:

### Client:
  - Peut creer son compte 
  - Peut modifier son compte
  - Peut supprimer son compte 
  - Peut voir les differents types de reservations possibles par categories
  - Peut voir pour chaque categorie, la liste des compagnies 
  - Peut voir l'option d'annulation de la compagnie ou celle par defaut si la compagnie n'a rien fournit
  - Peut voir le menu de la compagnie
  - Peut voir les heures d'ouvertures de la compagnie
  - Peut voir la localisation (google map) de la compagnie
  - Peut aller sur le site web de la compagnie
  - Peut faire une reservation
  - Peut annuler une reservation avant un certains delais sans frais
  - Peut voir l'etat de sa reservation (en cours, annulee ou reservee)
  - Peut voir la liste de ses reservations courante
  - Peut voir la liste de ses archives
  - Peut ajouter/supprimer une compagnie dans ses favoris (l'ajout se fait aussi automatiquement apres une reservation effectuee)
  - Peut conserver la liste de ses favoris
  - Peut rechercher par mots cles
  - Peut filtrer la recherche
  - Peut évaluer la qualité du service reçu par une compagnie lors de sa presence

### Compagnie:
  - Peut creer son compte 
  - Peut modifier son compte 
  - Peut supprimer son compte
  - Peut annuler, réfuser ou accepter une reservation
  - Peut voir la liste des ses reservations en cours, annulées et archivées
  - Peut obtenir son url personnalisée de reservation
  - Peut envoyer des alertes de promotion aux clients ayant effectués au moins une reservation chez eux (le client peut se desinscrire aux alertes)
  - Peut ajouter au maximum cinq photos
  - Si la compagnie est un restaurant:
    - Elle devra fournir son menu et devra eter capable d'ajouter des nouveaux menus sur son espace selon le format mis en place (pdf ou image ou formulaire de modifications).
    - Elle doit aussi spécifier sa catégorie de cuisine: 
```     
Exemple : Cuisine Italienne, Cuisine Haitienne, Africaine ou Francaise.
```
### Fonctionnalités complémentaires:

- Le site doit detecter par defaut la localisation du client pour lui afficher les compagnies de sa ville.
  On demande au client au debut s'il accepte d'etre localisé pour un meilleur service.
  S'il refuse, on lui affiche tout simplement la liste des compagnies de montréal.

- Une sorte de tutoriel guidée peut s'afficher pour montrer au client comment utiliser le site
  seulement à la premiere connexion sur un appareil.

- Le menu doit contenir une zone réservée pour effectuer des filtres.
  Ces filtres concernent les pays, les villes, les types de restaurants et donnent aussi la possibilité de rechercher par mot clé un endroit.
  Une barre de recherche et une option de filtre avancée pour résumer.

- L'email est l'identifiant unique pour un client et le nom de la compagnie est son identifiant unique.
- Un client peut créer un compte à partir de son compte Facebook, Tweeter ou Google plus

- Proposer une option d'annulation par defaut qui peut etre redefinit par la compagnie (Cancellation Policy)
  - Par exemple le client peut annuler sa reservation deux heures avant l'heure effective sinon, on lui charge une somme de 5$
    qui sera versée à la compagnie.
  - Par contre, si la reservation a lieu, on lui charge 0.5 cent versée au site web.

- Une compagnie qui désire s'inscrire sur le site devra s'acquiter de certains frais.
  
- Un restaurant doit fournir sa catégorie d'étoiles (Pour avoir un traitement different envers les clients qui veulent y faire une réservation)
  
- Afficher pour chacune des compagnies, un diagramme qui montre la fréquence de fréquentation (par exemple dans le restaurant),
  au cours des heures d'ouvertures pour tous les jours de la semaine. Au mieux, on peut utiliser google comme le montre l'url :
  - www.google.ca/search?q=cacao+70&oq=cacao+70&aqs=chrome..69i57.7565j0j7&sourceid=chrome&ie=UTF-8#q=cacao%2070&tbs=lf:1,lf_ui:3&rflfq=1&rlha=0&tbm=lcl&rlfi=hd:;si:15541204531682658560
   
#### Inspirations design web:
  1. https://www.inpi.fr/fr
  2. https://www.tangerine.ca/fr/index.html
  3. http://mongodb-tools.com/
  4. https://www.freshmint.com/fr
