# 🎬 keed.ai — Landing Page & Backend

Waitlist landing page pour keed.ai, SaaS de vidéos immobilières IA.

## 📁 Structure

```
keed-landing/
├── frontend/
│   ├── index.html          # Landing page (Arcads-style)
│   └── merci.html          # Post-payment thank you
├── backend/
│   ├── server.js           # Express + Supabase + Stripe
│   ├── package.json        # Dependencies
│   ├── .env                # Your API keys (already configured!)
│   └── supabase-migration.sql  # Run this in Supabase SQL Editor
├── MARKETING_STRATEGY.md   # Plan marketing complet
└── README.md               # Ce fichier
```

## 🚀 Setup complet

### Étape 1 : Créer la table Supabase

1. Va sur https://supabase.com/dashboard
2. Sélectionne ton projet
3. Clique "SQL Editor" dans la sidebar
4. Clique "New Query"
5. Copie/colle le contenu de `backend/supabase-migration.sql`
6. Clique "Run"

### Étape 2 : Lancer le backend

```bash
cd /Users/raphaellassalle/Desktop/keed-landing/backend
npm install
npm start
```

Ouvre http://localhost:3000

### Étape 3 : Tester le flow

1. Remplis le formulaire waitlist
2. Clique "Confirmer avec 1€"
3. Tu seras redirigé vers Stripe Checkout (mode test)
4. Utilise la carte test: `4242 4242 4242 4242`

## 📊 Voir les inscriptions

### Option 1 : Supabase Dashboard

1. Va sur https://supabase.com/dashboard
2. Clique "Table Editor"
3. Sélectionne la table `waitlist`

### Option 2 : API (avec clé admin)

```bash
curl http://localhost:3000/api/waitlist \
  -H "x-api-key: keed-admin-secret-change-me"
```

### Option 3 : Export CSV

```bash
curl http://localhost:3000/api/waitlist/export \
  -H "x-api-key: keed-admin-secret-change-me" \
  -o waitlist.csv
```

## 🔧 Configuration Stripe Webhook (pour production)

Quand tu déploies en production, configure le webhook:

1. Va sur https://dashboard.stripe.com/webhooks
2. Clique "Add endpoint"
3. URL: `https://ton-domaine.com/api/webhook/stripe`
4. Events: sélectionne `checkout.session.completed`
5. Copie le webhook secret dans ton `.env`

## 🌐 Déploiement

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/waitlist` | Ajouter un signup |
| GET | `/api/waitlist` | Lister tous (protégé) |
| GET | `/api/waitlist/count` | Nombre de signups |
| GET | `/api/waitlist/export` | Export CSV (protégé) |
| POST | `/api/waitlist/mark-paid` | Marquer comme payé |

### Exemple de requête

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean@agence.fr",
    "agencyName": "Immobilier Prestige"
  }'
```

## 🌐 Déploiement

### Vercel (recommandé pour le frontend)

```bash
cd frontend
vercel
```

### Railway / Render (pour le backend)

1. Push sur GitHub
2. Connecte le repo à Railway/Render
3. Configure les variables d'environnement
4. Deploy

### Variables d'environnement production

```
PORT=3000
NODE_ENV=production
ADMIN_API_KEY=ton-secret-ultra-long
STRIPE_SECRET_KEY=sk_live_xxx
```

## 📧 Webhook Stripe (optionnel)

Pour marquer automatiquement les paiements :

1. Stripe Dashboard → Webhooks → Add endpoint
2. URL : `https://ton-domaine.com/api/stripe/webhook`
3. Events : `checkout.session.completed`

## 🎨 Personnalisation

### Changer les images

Les images viennent d'Unsplash. Pour utiliser tes propres vidéos/images :

1. Remplace les `<img src="...">` dans `index.html`
2. Ou utilise des `<video>` pour des vraies vidéos

### Changer les couleurs

Dans `index.html`, modifie les CSS variables :

```css
:root {
    --bg-color: #faf9f7;      /* Fond */
    --text-primary: #1a1a1a;   /* Texte principal */
    --accent: #1a1a1a;         /* Boutons */
}
```

## 📈 Analytics recommandés

```html
<!-- Plausible (privacy-friendly) -->
<script defer data-domain="keed.ai" src="https://plausible.io/js/script.js"></script>
```

## ✅ Checklist avant lancement

- [ ] Vidéo démo créée
- [ ] Landing page déployée
- [ ] Stripe configuré
- [ ] Analytics installés
- [ ] Premier post LinkedIn prêt
- [ ] Email automation configurée

---

**Questions ?** Tu sais où me trouver.

🚀 Go build.
