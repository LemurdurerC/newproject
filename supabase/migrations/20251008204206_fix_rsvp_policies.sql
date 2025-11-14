/*
  # Correction des politiques RLS pour la table rsvps

  1. Changements
    - Suppression de l'ancienne politique SELECT restrictive
    - Ajout d'une politique permettant l'accès via service role key
    - L'Edge Function utilise la service role key pour contourner RLS

  2. Sécurité
    - Les utilisateurs anonymes ne peuvent toujours pas lire directement
    - L'accès admin se fait uniquement via l'Edge Function
    - L'Edge Function valide le mot de passe admin
*/

-- Supprimer l'ancienne politique SELECT
DROP POLICY IF EXISTS "Service role can read all RSVPs" ON rsvps;

-- La service role key contourne automatiquement RLS
-- Pas besoin de politique SELECT car l'Edge Function utilise la service role key
-- Les utilisateurs anonymes ne pourront pas lire les données directement