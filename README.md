# Express Payments API 🚀

Une API de paiement basée sur **Node.js, Express et Paystack** pour gérer les transactions financières de manière sécurisée et efficace.

## 📌 Fonctionnalités
- 🔹 Initialisation des paiements via Paystack
- 🔹 Vérification de l’état des transactions
- 🔹 Gestion des erreurs et des réponses API
- 🔹 Couverture des tests unitaires et d’intégration avec Jest

---

## 🛠️ Installation et Configuration

### 1⃣ Prérequis
- [Node.js](https://nodejs.org/) installé (v14+ recommandé)
- [Docker](https://www.docker.com/) (si vous utilisez MongoDB en conteneur)

### 2⃣ Cloner le projet
```sh
git clone https://github.com/boko-marc/express-payments-api.git
cd express-payments-api
```

### 3⃣ Installer les dépendances
```sh
npm install
```

### 4⃣ Configuration de l'environnement

Créer un fichier `.env` à la racine du projet en utilisant  `.env.example`:
```ini
PORT=3000
PAYSTACK_SECRET_KEY=your_paystack_secret_key
MONGO_HOST=localhost  
MONGO_PORT=27017     
MONGO_DB_NAME=your_db_name
```
💡 **Remarque** : Si vous utilisez Docker, le `MONGO_HOST` doit correspondre au **nom du service MongoDB** défini dans `docker-compose.yml`.
Utilisez la documentation de PayStack   **https://paystack.com/docs/api/** afin de créer un compte et récupérer **PAYSTACK_SECRET_KEY**

---

## 🚀 Lancer l'API

### 1⃣ Démarrer l'application en mode développement
```sh
npm start
```

### 2⃣ Démarrer avec Docker
```sh
docker-compose up --build -d
```

---

## 💼 Utilisation de l'API

### ➔ 1. Initialiser un paiement
**Endpoint :** `POST /api/payments/initialize`  
**Body JSON :**
```json
{
  "amount": 50,
  "email": "user@example.com",
  "currency": "NGN"
}
```
**Réponse :**
```json
{
  
    "authorization_url": "https://checkout.paystack.com/abc123",
    "transaction_id": "67b1b380d4909d1aff22a4f1"
  
}
```

---

### ➔ 2. Vérifier un paiement
**Endpoint :** `GET /api/payments/verify?transaction_id=67b1b380d4909d1aff22a4f1`  
**Exemple :**

**Réponse :**
```json
{
  
    "status": "success",
    "transaction_id": "67b1b380d4909d1aff22a4f1"
  
}
```

---

## ✅ Tests

### 1⃣ Exécuter les tests unitaires 
```sh
npm test
```



---

## 📌 Contributions & Contact

👨‍💻 **Auteur** : [BOKO Marc](https://github.com/boko-marc)  
📧 **Contact** : marcboko.uriel@gmail.com 

📢 **Suggestions et améliorations bienvenues !** Ouvrez une issue ou faites une pull request.

---

## 💜 Licence
MIT © 2025 Express Payments API

