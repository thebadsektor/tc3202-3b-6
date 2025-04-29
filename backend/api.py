from flask import Flask, request, jsonify
import os
import pandas as pd
import numpy as np
import joblib
import pickle
import llama_cpp
from flask_cors import CORS


api = Flask(__name__)
CORS(api)  # Allow requests from frontend

llama = llama_cpp.Llama(model_path="tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf", n_ctx=4096)

DATA_FOLDER = os.path.dirname(__file__)

# Load model and data
model = joblib.load(os.path.join(DATA_FOLDER, "BuhayNgaNaman.pkl"))
counter_matrix = pd.read_csv(os.path.join(DATA_FOLDER, "CounterBrawler.csv"), index_col=0)

with open(os.path.join(DATA_FOLDER, "AllMapBrawlerWinrate.pkl"), "rb") as f:
    all_map_brawler_winrate = pickle.load(f)

with open(os.path.join(DATA_FOLDER, "Flat_MapBestTeam.pkl"), "rb") as f:
    flat_map_best_team = pickle.load(f)

# Static map data
map_data_dict = {
    "Bounty": ["BraceForImpact", "DrySeason", "Hideout", "LayerCake", "NoExcuses", "ShootingStar"],
    "Gem Grab": ["CrystalArcade", "DeathcapTrap", "DoubleSwoosh", "ForestClearing", "GemFort",
                 "HardRockMine", "LastStop", "LilygearLake", "LocalRestaurants", "OpenSpace",
                 "RusticArcade", "Undermine"],
    "Heist": ["BridgeTooFar", "HotPotato", "KaboomCanyon", "PitStop", "PlainText"],
    "Brawl Ball": ["BackyardBowl", "BeachBall", "BelowZero", "CenterStage", "CoolBox", "PinballDreams",
                   "PinholePunt", "PricelessCactus", "RooftopRunners", "SecondTry", "SneakyFields",
                   "StarrGarden", "SunnySoccer", "SuperBeach", "SuperCenter", "Trickey", "TripleDribble"],
    "Knockout": ["Belle'sRock", "CloseQuarters", "DeepEnd", "FlaringPhoenix", "FlowingSprings",
                 "FourLevels", "GoldarmGulch", "HealthyMiddleGround", "HFor...", "MossyCrossing",
                 "NewHorizons", "NewPerspective", "OutInTheOpen"],
    "Hot Zone": ["Bejeweled", "DuelingBeetles", "FishingBed", "OpenBusiness", "OpenZone", "ParallelPlays",
                 "RingOfFire"]
}

# --- Helper functions ---
def get_win_rate(brawler, brawler_winrate_data):
    brawler_lower = brawler.lower()
    brawler_winrate_data['Brawler_lower'] = brawler_winrate_data['Brawler'].str.lower()
    if brawler_lower in brawler_winrate_data['Brawler_lower'].values:
        return brawler_winrate_data[brawler_winrate_data['Brawler_lower'] == brawler_lower]['Win Rate'].values[0]
    else:
        return 0

def get_counter(brawler, opponent, counter_matrix):
    brawler_lower = brawler.lower()
    opponent_lower = opponent.lower()
    if brawler_lower in counter_matrix.index and opponent_lower in counter_matrix.columns:
        return counter_matrix.loc[brawler_lower, opponent_lower]
    else:
        return 0

def simulate_match_with_model(team1, team2):
    features = []
    for brawler1 in team1:
        for brawler2 in team2:
            team1_winrate = get_win_rate(brawler1, all_map_brawler_winrate)
            team2_winrate = get_win_rate(brawler2, all_map_brawler_winrate)
            counter_score = get_counter(brawler1, brawler2, counter_matrix)
            reverse_counter_score = get_counter(brawler2, brawler1, counter_matrix)
            features.append([team1_winrate, team2_winrate, counter_score, team2_winrate, team1_winrate, reverse_counter_score])
    features = np.array(features)
    predictions = model.predict(features)
    team1_win_count = sum(predictions)
    win_percentage = team1_win_count / len(predictions) * 100

    if team1_win_count > len(predictions) / 2:
        return "Team 1 Wins!", round(win_percentage, 2)
    else:
        return "Team 2 Wins!", round(100 - win_percentage, 2)

# --- API Endpoints ---
@api.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    team1 = data.get('team1', [])
    team2 = data.get('team2', [])
    
    if not team1 or not team2 or len(team1) != 3 or len(team2) != 3:
        return jsonify({'error': 'Invalid team data'}), 400
    
    result, win_percentage = simulate_match_with_model(team1, team2)
    return jsonify({
        'result': result,
        'win_percentage': win_percentage
    })

@api.route('/brawlers', methods=['GET'])
def get_brawlers():
    brawlers = sorted(all_map_brawler_winrate['Brawler'].unique().tolist())
    return jsonify({'brawlers': brawlers})


@api.route('/maps', methods=['GET'])
def get_maps():
    return jsonify(map_data_dict)

@api.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_prompt = data.get('prompt')

    if not user_prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    system_prompt = "You are a Brawl Stars expert. Only answer questions related to Brawl Stars. If asked anything else, say 'I only answer Brawl Stars questions.'"
    prompt = f"<s>[INST] {system_prompt} {user_prompt} [/INST]"

    output = llama(prompt, max_tokens=300)
    return jsonify({'response': output['choices'][0]['text']})

# --- Run app ---
if __name__ == '__main__':
    api.run(debug=True)
