# The Legal AI Assistant to analyze your Legal Documents
![architecture.png](frontend/public/LegalAI.jpg)

# to run

- activate python environment
source .venv/bin/activate

uvicorn backend.main:app --reload --port 5000

# POSTGRESQL
sudo apt install postgresql postgresql-contrib

sudo service postgresql status

sudo -u postgres psql

CREATE USER your_app_user WITH PASSWORD 'your_strong_password';

CREATE DATABASE clausemate_db OWNER your_app_user;

psql -U clausemate_user -d clausemate_db -h localhost

// to cancel database enter psql
TRUNCATE TABLE documents CASCADE;

# SQLAlchemy Documentation

Declare Models
Create an Engine
Emit CREATE TABLE DDL
Create Objects and Persist
Simple SELECT
SELECT with JOIN
Make Changes