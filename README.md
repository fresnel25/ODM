# ODM - Gestion des Ordres de Mission

ODM est une application web permettant de gérer les ordres de mission au sein d’une organisation.
Elle permet notamment la création, le suivi, la validation et le traitement des missions des agents.

Le projet est composé de deux parties principales :

* `ODM_Backend` : API REST développée avec Spring Boot
* `ODM_Frontend` : interface utilisateur développée avec React
* `docker-compose.yml` : orchestration des services avec Docker
* `uploads/` : dossier utilisé pour les fichiers générés ou envoyés par l'application

---

## Fonctionnalités principales

L’application permet notamment de gérer :

* l’authentification des utilisateurs
* les utilisateurs
* les équipes
* les projets
* les motifs de mission
* les ordres de mission
* les moyens de transport
* la validation des missions
* le traitement administratif des missions
* la génération de documents PDF
* l’envoi de notifications par mail

---

## Rôles utilisateurs

L’application peut gérer plusieurs rôles, par exemple :

* utilisateur simple
* responsable / chef d’équipe
* secrétaire
* administrateur

Les accès aux différentes pages et actions peuvent varier selon le rôle de l’utilisateur connecté.

---

## Uploads et fichiers générés

Le dossier `uploads/` sert à stocker les fichiers générés ou envoyés par l’application.

Avec Docker, ce dossier est monté dans le conteneur backend :

```yaml
volumes:
  - ./uploads:/app/uploads
```

Ce dossier est ignoré par Git afin d’éviter d’envoyer des fichiers sensibles ou générés automatiquement.

---

## Technologies utilisées

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* MapStruct
* Lombok

### Frontend

* React
* Vite
* Tailwind CSS
* DaisyUI
* Axios
* React Router
* React Toastify
* Lucide React

### Environnement

* Docker
* Docker Compose
* MySQL 8
* phpMyAdmin

---

## Prérequis

Avant de lancer le projet, il faut avoir installé :

* Docker
* Docker Compose
* Git

Pour un lancement sans Docker, il faut aussi :

* Java 21
* Maven
* Node.js
* MySQL

---

## Installation du projet

Cloner le projet :

```bash
git clone https://github.com/fresnel25/ODM.git
cd NOM_DU_PROJET
```

Créer le fichier `.env` à partir du fichier d’exemple :

```bash
cp .env.example .env
```

Modifier ensuite les valeurs du fichier `.env` selon votre environnement.


---

## Lancement avec Docker

À la racine du projet, lancer :

```bash
docker compose up --build -d
```

Les services seront disponibles aux adresses suivantes :

| Service    | URL                   |
| ---------- | --------------------- |
| Frontend   | http://localhost:5173 |
| Backend    | http://localhost:8080 |
| phpMyAdmin | http://localhost:8082 |
| MySQL      | localhost:3308        |

---

## Configuration Docker

Le backend utilise le profil Spring Boot `docker`.

Dans `docker-compose.yml` :

```yaml
environment:
  SPRING_PROFILES_ACTIVE: docker
```

Le fichier utilisé par Spring Boot est donc :

```txt
ODM_Backend/src/main/resources/application-docker.properties
```

Ce fichier ne contient pas directement les informations sensibles.
Les valeurs sensibles sont lues depuis le fichier `.env`.

---

## Lancement du backend sans Docker

Se placer dans le dossier backend :

```bash
cd ODM_Backend
```

Lancer l’application :

```bash
./mvnw spring-boot:run
```

Ou avec Maven installé localement :

```bash
mvn spring-boot:run
```

Par défaut, l’API sera disponible sur :

```txt
http://localhost:8080
```

---

## Lancement du frontend sans Docker

Se placer dans le dossier frontend :

```bash
cd ODM_Frontend
```

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

L’application sera disponible sur :

```txt
http://localhost:5173
```

---

## Base de données

Le projet utilise MySQL.

Avec Docker, la base est créée automatiquement grâce au service `db` dans `docker-compose.yml`.

Nom de la base par défaut :

```txt
mydb
```

Les données MySQL sont stockées dans un volume Docker :

```txt
db_data
```

Pour supprimer complètement les données locales :

```bash
docker compose down -v
```

Attention : cette commande supprime aussi le volume de la base de données.

---
## Commandes utiles

Lancer le projet :

```bash
docker compose up --build
```

Arrêter le projet :

```bash
docker compose down
```

Arrêter le projet et supprimer les volumes :

```bash
docker compose down -v
```

Voir les logs :

```bash
docker compose logs -f
```

Voir les logs du backend uniquement :

```bash
docker compose logs -f backend
```

Reconstruire uniquement le backend :

```bash
docker compose build backend
docker compose up backend
```

Reconstruire uniquement le frontend :

```bash
docker compose build frontend
docker compose up frontend
```

---


## Auteur

Projet développé dans le cadre d’un stage au LIFAT - Université de Tours.

Développeur :

```txt
Junior Fresnel NGALEU
```
