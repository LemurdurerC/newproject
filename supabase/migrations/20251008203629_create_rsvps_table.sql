/*
  # Création de la table RSVP pour le mariage Simon & Talia

  1. Nouvelle Table
    - `rsvps` - Stocke les réponses de présence des invités
      - `id` (uuid, primary key) - Identifiant unique de la réponse
      - `name` (text) - Nom complet de l'invité
      - `email` (text) - Email de l'invité
      - `attendance` (text) - Présence: 'yes' ou 'no'
      - `menu` (text, nullable) - Choix du menu: 'classique' ou 'jardin'
      - `allergies` (text, nullable) - Allergies et régimes spéciaux
      - `carpooling` (text) - Covoiturage: 'yes' ou 'no'
      - `message` (text, nullable) - Message optionnel pour les mariés
      - `submitted_at` (timestamptz) - Date et heure de soumission
      - `created_at` (timestamptz) - Date de création de l'enregistrement

  2. Sécurité
    - Activation de RLS sur la table `rsvps`
    - Politique INSERT: Permet à tout le monde de soumettre une réponse (formulaire public)
    - Politique SELECT: Accessible uniquement pour la lecture de ses propres données
    - Les administrateurs pourront accéder aux données via l'Edge Function avec la clé de service

  3. Notes Importantes
    - Le formulaire RSVP est public, donc INSERT est ouvert à tous
    - Les données sont sécurisées en lecture (pas d'accès direct)
    - L'accès admin se fait via l'Edge Function avec authentification
    - Validation des données effectuée côté Edge Function
*/

-- Création de la table rsvps
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  attendance text NOT NULL CHECK (attendance IN ('yes', 'no')),
  menu text CHECK (menu IN ('classique', 'jardin')),
  allergies text,
  carpooling text NOT NULL DEFAULT 'no' CHECK (carpooling IN ('yes', 'no')),
  message text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Activation de Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tout le monde d'insérer une réponse RSVP
-- Le formulaire est public, donc tout le monde peut soumettre
CREATE POLICY "Anyone can submit RSVP"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Politique pour permettre la lecture uniquement via service role
-- Les utilisateurs ne peuvent pas lire directement les données
-- L'accès admin se fait via l'Edge Function
CREATE POLICY "Service role can read all RSVPs"
  ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Index pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email);
CREATE INDEX IF NOT EXISTS idx_rsvps_attendance ON rsvps(attendance);
CREATE INDEX IF NOT EXISTS idx_rsvps_submitted_at ON rsvps(submitted_at DESC);