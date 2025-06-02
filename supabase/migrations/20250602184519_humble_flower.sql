/*
  # Create vehicles table

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `registration_number` (text, unique)
      - `make` (text)
      - `model` (text)
      - `type` (text)
      - `year` (integer)
      - `status` (text)
      - `fuel_level` (integer)
      - `fuel_efficiency` (decimal)
      - `mileage` (integer)
      - `location` (text)
      - `assigned_driver` (text)
      - `last_serviced` (timestamptz)
      - `next_service` (timestamptz)
      - `last_inspection` (date)
      - `image` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `vehicles` table
    - Add policies for authenticated users to read and modify vehicles
*/

CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number text UNIQUE NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  type text,
  year integer,
  status text DEFAULT 'active',
  fuel_level integer DEFAULT 100,
  fuel_efficiency decimal(5,2),
  mileage integer DEFAULT 0,
  location text,
  assigned_driver text,
  last_serviced timestamptz,
  next_service timestamptz,
  last_inspection date,
  image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all vehicles
CREATE POLICY "Users can read all vehicles"
  ON vehicles
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert vehicles
CREATE POLICY "Users can insert vehicles"
  ON vehicles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their vehicles
CREATE POLICY "Users can update vehicles"
  ON vehicles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();