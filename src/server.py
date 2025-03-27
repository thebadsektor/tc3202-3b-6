from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel
import os

# Get the absolute path of the model file
model_path = os.path.join(os.path.dirname(__file__), "brawlstars_model.pkl")

# Load the trained ML model
try:
    model = joblib.load(model_path)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")

# Define FastAPI app
app = FastAPI()

# Define input format
class MatchInput(BaseModel):
    ally_team: list  # List of three ally brawlers
    enemy_team: list  # List of three enemy brawlers
    mode: str  # Selected game mode
    map_name: str  # Selected map name

# Function to preprocess user input (Convert brawlers & mode to numerical)
def preprocess_input(data):
    # Simulating feature encoding (Modify based on your training data)
    all_brawlers = ["Shelly", "Colt", "Brock", "Dynamike", "El Primo", "Bull", "Piper", "Crow"]
    all_modes = ["Bounty", "Gem Grab", "Brawl Ball"]
    all_maps = ["Hideout", "New Horizons", "Layer Cake"]

    # Encode brawlers as numbers
    ally_brawlers_encoded = [all_brawlers.index(b) if b in all_brawlers else -1 for b in data.ally_team]
    enemy_brawlers_encoded = [all_brawlers.index(b) if b in all_brawlers else -1 for b in data.enemy_team]

    # Encode mode & map
    mode_encoded = all_modes.index(data.mode) if data.mode in all_modes else -1
    map_encoded = all_maps.index(data.map_name) if data.map_name in all_maps else -1

    # Combine into final feature array
    features = np.array(ally_brawlers_encoded + enemy_brawlers_encoded + [mode_encoded, map_encoded]).reshape(1, -1)
    
    return features

# API Endpoint for Predictions
@app.post("/predict")
def predict_match(data: MatchInput):
    features = preprocess_input(data)
    
    try:
        prediction = model.predict(features)
        win_probability = model.predict_proba(features)[0][1]  # Get probability of winning

        return {
            "win_prediction": int(prediction[0]),  # 1 = Win, 0 = Loss
            "win_probability": round(win_probability * 100, 2)  # Convert to percentage
        }
    
    except Exception as e:
        return {"error": str(e)}

# Run API (Only needed for local testing)
# uvicorn server:app --host 0.0.0.0 --port 8000 --reload
