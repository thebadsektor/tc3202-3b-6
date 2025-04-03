import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pydantic import BaseModel
from typing import List, Dict

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
    ally_team: List[str]  # Example: ["Piper", "Brock", "Tick"]
    enemy_team: List[str]  # Example: ["Leon", "Crow", "Mortis"]
    game_mode: str  # Example: "Bounty"

# Convert brawler names to numerical IDs
# Encode Brawlers
brawler_encoding = {
    "GENE": 1, "LILY": 2, "BROCK": 3, "KENJI": 4, "BUZZ": 5, "OLLIE": 6, "PIPER": 7, "MORTIS": 8, 
    "DYNAMIKE": 9, "COLETTE": 10, "RICO": 11, "PENNY": 12, "BULL": 13, "TARA": 14, "STU": 15, 
    "JACKY": 16, "MR. P": 17, "SHELLY": 18, "EDGAR": 19, "JUJU": 20, "GROM": 21, "SURGE": 22, 
    "LOU": 23, "BIBI": 24, "NITA": 25, "BO": 26, "FANG": 27, "ASH": 28, "BEA": 29, "JANET": 30, 
    "MAX": 31, "HANK": 32, "FINX": 33, "MELODIE": 34, "SHADE": 35, "TICK": 36, "FRANK": 37, 
    "LEON": 38, "SPIKE": 39, "EL PRIMO": 40, "DARRYL": 41, "SANDY": 42, "POCO": 43, "GRAY": 44, 
    "R-T": 45, "MANDY": 46, "SPROUT": 47, "SQUEAK": 48, "KIT": 49, "JESSIE": 50, "COLT": 51, 
    "MAISIE": 52, "EMZ": 53, "MEEPLE": 54, "BELLE": 55, "BARLEY": 56, "CORDELIUS": 57, 
    "CHESTER": 58, "BERRY": 59, "CHARLIE": 60, "ANGELO": 61, "PEARL": 62, "GUS": 63, "WILLOW": 64, 
    "BUSTER": 65, "BYRON": 66, "CLANCY": 67, "NANI": 68, "OTIS": 69, "DRACO": 70, "GALE": 71, 
    "AMBER": 72, "LARRY & LAWRIE": 73, "EVE": 74, "LOLA": 75
}

# Encode Game Modes
game_mode_encoding = {
    "bounty": 0,
    "brawlBall": 1,
    "gemGrab": 2,
    "heist": 3,
    "hotZone": 4,
    "knockout": 5,
    "wipeout": 6,
    "gemGrab": 7,
}

expected_features = 7

def convert_to_features(ally_team, enemy_team, game_mode):
    """Convert input into numerical features."""
    # Encode brawlers
    ally_encoded = [brawler_encoding.get(brawler.upper(), 0) for brawler in ally_team]
    enemy_encoded = [brawler_encoding.get(brawler.upper(), 0) for brawler in enemy_team]

    # Encode game mode
    game_mode_encoded = game_mode_encoding.get(game_mode, 0)

    # Combine into a feature vector
    features = ally_encoded + enemy_encoded + [game_mode_encoded]

    # Ensure the feature vector has the expected length
    while len(features) < expected_features:
        features.append(0)

    return features

@app.post("/predict")
def predict_match(data: MatchInput):
    """Predict the match outcome based on teams and game mode."""
    print("Received data:", data.dict())  # Debugging log

    try:
        ally_team = data.ally_team
        enemy_team = data.enemy_team
        game_mode = data.game_mode

        # Convert to features
        features = convert_to_features(ally_team, enemy_team, game_mode)
        print("Extracted features:", features)  # Debugging log

        if len(features) != expected_features:
            return {"error": f"Expected {expected_features} features, but got {len(features)}"}

        # Make predictions
        prediction = model.predict([features])
        probability = model.predict_proba([features])[0][1] * 100  # Assuming class 1 is "Win"

        return {"win_prediction": bool(prediction[0]), "win_probability": round(probability, 2)}

    except Exception as e:
        return {"error": str(e)}

# Run the API (For local testing)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
