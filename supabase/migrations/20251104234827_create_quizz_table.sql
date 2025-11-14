/*
  # Create quizz table

  1. New Tables
    - `quizz`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `score` (integer)
      - `total_questions` (integer)
      - `answers` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quizz` table
    - Allow anyone to insert quiz results
*/

CREATE TABLE IF NOT EXISTS quizz (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  answers text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quizz ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert quiz results"
  ON quizz
  FOR INSERT
  TO public
  WITH CHECK (true);
