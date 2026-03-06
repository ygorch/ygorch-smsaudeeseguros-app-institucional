-- Add pj_checkbox_text column to solutions
ALTER TABLE solutions ADD COLUMN IF NOT EXISTS pj_checkbox_text TEXT DEFAULT 'Tenho CNPJ';
