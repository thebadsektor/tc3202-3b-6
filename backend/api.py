import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

# Get the absolute path to the project root
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, 'brawlstars_model.pkl')

# Load the trained model
model = joblib.load(model_path)

# Define FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],  # Allows React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input format
class MatchInput(BaseModel):
    ally_team: list[str]  # Example: ["Piper", "Brock", "Tick"]
    enemy_team: list[str]  # Example: ["Leon", "Crow", "Mortis"]
    game_mode: str  # Example: "Bounty"
    map_name: str  # Example: "Hideout"

# Convert brawler names to numerical IDs (Replace this with actual encoding logic)
brawler_encoding = {
    "Piper": 1, "Brock": 2, "Tick": 3,
    "Leon": 4, "Crow": 5, "Mortis": 6
}

# Ensure model input has the correct number of features
expected_features = 11

@app.post("/predict")
def predict_match(data: MatchInput):
    try:
        # Convert brawler names to numeric values
        ally_team_ids = [brawler_encoding.get(b, 0) for b in data.ally_team]
        enemy_team_ids = [brawler_encoding.get(b, 0) for b in data.enemy_team]

        # Convert game mode and map (Example encoding)
        mode_encoding = {"Bounty": 1, "Gem Grab": 2, "Brawl Ball": 3}
        map_encoding = {"Hideout": 1, "Cavern Churn": 2}

        mode_id = mode_encoding.get(data.game_mode, 0)
        map_id = map_encoding.get(data.map_name, 0)

        # Prepare input for the model (Ensure correct feature count)
        match_features = np.array([ally_team_ids + enemy_team_ids + [mode_id, map_id]])

        # Add missing features if necessary
        if match_features.shape[1] < expected_features:
            missing_count = expected_features - match_features.shape[1]
            match_features = np.hstack((match_features, np.zeros((1, missing_count))))  # Pad with zeros

        # Ensure correct shape for prediction
        match_features = match_features.reshape(1, -1)

        # Make prediction
        win_prediction = model.predict(match_features)[0]
        win_probability = model.predict_proba(match_features)[0][1]  # Probability of winning

        return {"win_prediction": int(win_prediction), "win_probability": round(win_probability * 100, 2)}

    except Exception as e:
        return {"error": str(e)}

# Run the API (For local testing)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
