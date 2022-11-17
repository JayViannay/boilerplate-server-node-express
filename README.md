## Template server API Rest
    
    []: # Language: Javascript ES13
    []: # Environnement d'éxecution : Node.js V18.12
    []: # Framework : Express.js
    []: # Architecture - Design Pattern : M(V)C

### Installation

- Créer une nouvelle base de données depuis le fichier data.sql
  
- Cloner le template du serveur sur votre machine puis à la racine du projet : 
    - Créer un nouveau fichier `.env` en copiant/collant le fichier `.env.example` puis remplissez le avec les bonnes informations de votre environnement local.
    - Depuis votre terminal, **toujours à la racine du serveur**, éxécuter les commandes suivantes pour installer les dépendances et lancer le serveur :
        ```bash
        npm install
        npm run dev
        ```
- Le serveur se lance en local et affiche les informations de connexion dans le terminal
    - Pour l'arrêter, il suffit de taper dans votre terminal :
        ```bash
        ctrl + c
        ```

- Des entrées sont disponibles sur l'entité User :
    - GET http://localhost:5050/api/users
    - GET http://localhost:5050/api/users/:id
    - POST http://localhost:5050/api/users
    - PUT http://localhost:5050/api/users
    - DELETE http://localhost:5050/api/users/:id



#### MVC Rappel :
Les models gèrent les échanges avec la base de données. Ils contiennent généralement au moins 4 méthodes essentielles à l'administration d'une entité en base de données : Create, Read (All, One), Update, Delete, puis d'autres méthodes peuvent s'ajouter ou évoluer en fonction du métier.
<br>
Les controlleurs gèrent les requêtes et les réponses, ils sont l'intermédiaire entre la demande du client et la base de données. Selon la demande du client, il demandera à un model de créer un nouvel objet en base de données, ou d'en retrouver un, d'en editer un, etc ... puis il retourne une réponse au client.

### Détails :
L'entrée de l'application se trouve dans le dossier `src` : `app.js`.
Ce fichier contient la configuration de notre serveur, vous trouverez facilement a quoi servent toutes les librairies installées sur le projet en faisant quelques recherches sur internet.

Le routing du serveur se trouve dans le dossier `routes`: `index.js`. <br>
Ce fichier permet de diriger les requêtes qui arriveront sur le serveur vers le bon controller. <br>
Parcourir les fichiers UserController et UserModel pour comprendre leur fonctionnement.
