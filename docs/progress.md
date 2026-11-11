# Progression persistante des étudiants

La progression n’est plus limitée au navigateur. Elle est enregistrée dans Cloudflare KV sous une clé isolée par étudiant : `student:AZI-001`.

## Configurer KV

Créer le namespace une seule fois :

```powershell
npx wrangler kv namespace create AZICODE_PROGRESS
```

Copier l’identifiant retourné dans `wrangler.jsonc` à la place de `REPLACE_WITH_KV_NAMESPACE_ID`.

Le Worker expose deux routes protégées :

- `GET /api/progress` charge la progression de l’étudiant connecté ;
- `PUT /api/progress` enregistre uniquement un objet de booléens pour cet étudiant.

Le navigateur ne peut jamais choisir l’identifiant KV : le Worker le dérive de la session signée et de l’étudiant courant.

## Fonctionnement

Après connexion, React charge la progression serveur. Chaque validation d’étape met à jour l’état React puis l’envoie avec un court délai de regroupement. Le sommaire calcule ensuite le pourcentage par chapitre à partir des étapes terminées.

Ainsi, si Salma termine aujourd’hui les étapes du HTML, puis se reconnecte demain depuis un autre navigateur avec sa clé, le Worker recharge `student:AZI-001` et elle retrouve son avancement.

La progression est séparée de la session : se déconnecter ne supprime pas l’avancement. Désactiver l’étudiant bloque toutefois l’accès aux données.
