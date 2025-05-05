from flask import Flask, request, jsonify
import os
import pandas as pd
import numpy as np
import joblib
import pickle
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

# --- Paths ---
DATA_FOLDER = os.path.dirname(__file__)

# --- Load model and data ---
model = joblib.load(os.path.join(DATA_FOLDER, "BuhayNgaNaman.pkl"))
counter_matrix = pd.read_csv(os.path.join(DATA_FOLDER, "CounterBrawler.csv"), index_col=0)

with open(os.path.join(DATA_FOLDER, "AllMapBrawlerWinrate (1).pkl"), "rb") as f:
    all_map_brawler_winrate = pickle.load(f)

with open(os.path.join(DATA_FOLDER, "MapBestTeam.pkl"), "rb") as f:
    flat_map_best_team = pickle.load(f)

# --- Static map list ---
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

# --- Helper Functions ---
def get_win_rate(brawler, brawler_winrate_data):
    brawler_lower = brawler.lower()
    brawler_winrate_data['Brawler_lower'] = brawler_winrate_data['Brawler'].str.lower()
    match = brawler_winrate_data[brawler_winrate_data['Brawler_lower'] == brawler_lower]
    if not match.empty:
        return match['Win Rate'].values[0]
    return 0

def get_counter(brawler, opponent, matrix):
    try:
        return matrix.loc[brawler.lower(), opponent.lower()]
    except KeyError:
        return 0

def simulate_match_with_model(team1, team2, map_name):
    # Copy filtered data to prevent SettingWithCopyWarning
    map_filtered_winrate = all_map_brawler_winrate[all_map_brawler_winrate['Map'] == map_name].copy()

    if map_filtered_winrate.empty:
        return "Map not found in dataset.", 0

    features = []
    for brawler1 in team1:
        for brawler2 in team2:
            team1_winrate = get_win_rate(brawler1, map_filtered_winrate)
            team2_winrate = get_win_rate(brawler2, map_filtered_winrate)
            counter_score = get_counter(brawler1, brawler2, counter_matrix)
            reverse_counter_score = get_counter(brawler2, brawler1, counter_matrix)

            features.append([
                team1_winrate, team2_winrate, counter_score,
                team2_winrate, team1_winrate, reverse_counter_score
            ])

    features = np.array(features)
    predictions = model.predict(features)
    team1_win_count = np.sum(predictions)
    win_percentage = team1_win_count / len(predictions) * 100

    if team1_win_count > len(predictions) / 2:
        return "Team 1 Wins!", round(win_percentage, 2)
    else:
        return "Team 2 Wins!", round(100 - win_percentage, 2)

def get_best_teams_for_map(map_name):
    return flat_map_best_team.get(map_name, [])

# --- API Routes ---
@api.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    team1 = data.get('team1', [])
    team2 = data.get('team2', [])
    map_name = data.get('map')

    if not team1 or not team2 or len(team1) != 3 or len(team2) != 3 or not map_name:
        return jsonify({'error': 'Invalid team data or map name'}), 400

    result, win_percentage = simulate_match_with_model(team1, team2, map_name)
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

@api.route('/best_teams', methods=['GET'])
def best_teams():
    map_name = request.args.get('map')
    if not map_name:
        return jsonify({'error': 'Map name is required'}), 400

    best_teams = get_best_teams_for_map(map_name)
    if not best_teams:
        return jsonify({'message': f'No best teams found for map "{map_name}"'}), 404

    return jsonify({
        'map': map_name,
        'best_teams': best_teams
    })

# --- Run App ---
if __name__ == '__main__':
    api.run(debug=True)
