#api.py
from flask import Flask, request, jsonify
import os
import pandas as pd
import numpy as np
import joblib
import pickle
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

DATA_FOLDER = os.path.dirname(__file__)

model = joblib.load(os.path.join(DATA_FOLDER, "BuhayNgaNaman.pkl"))
counter_matrix = pd.read_csv(os.path.join(DATA_FOLDER, "CounterBrawler.csv"), index_col=0)

with open(os.path.join(DATA_FOLDER, "AllMapBrawlerWinrate (1).pkl"), "rb") as f:
    all_map_brawler_winrate = pickle.load(f)

with open(os.path.join(DATA_FOLDER, "MapBestTeam.pkl"), "rb") as f:
    flat_map_best_team = pickle.load(f)

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

brawler_roles = {
    # Tanks
    "bull": "tank", "el primo": "tank", "rosa": "tank", "jacky": "tank", "ash": "tank", 
    "darryl": "tank", "frank": "tank", "sam": "tank",
    
    # Support
    "poco": "support", "pam": "support", "byron": "support", "max": "support", 
    "gene": "support", "sandy": "support", "ruffs": "support",
    
    # Control
    "emz": "control", "gale": "control", "barley": "control", "sprout": "control", 
    "tick": "control", "lou": "control", "amber": "control",
    
    # Assassins
    "mortis": "assassin", "stu": "assassin", "edgar": "assassin", "crow": "assassin", 
    "leon": "assassin", "buzz": "assassin", "fang": "assassin",
    
    # Sharpshooters
    "colt": "sharpshooter", "brock": "sharpshooter", "piper": "sharpshooter", "belle": "sharpshooter", 
    "8-bit": "sharpshooter", "nani": "sharpshooter", "bea": "sharpshooter",
    
    # Throwers
    "dynamike": "thrower", "barley": "thrower", "tick": "thrower", "sprout": "thrower", "grom": "thrower",
    
    # Generalists
    "shelly": "generalist", "bo": "generalist", "tara": "generalist", "surge": "generalist",
    "bibi": "generalist", "lola": "generalist", "gus": "generalist", "bonnie": "generalist",
    "buster": "generalist", "eve": "generalist", "spike": "generalist"
}

map_types = {

    "LayerCake": "open", "ShootingStar": "open", "DrySeason": "open", 
    "OpenSpace": "open", "ForestClearing": "open", "SneakyFields": "open",
    
    "HealthyMiddleGround": "bushy", "HardRockMine": "bushy", "DeathcapTrap": "bushy",
    
    "PinholePunt": "walled", "CenterStage": "walled", "SuperCenter": "walled",
    "LilygearLake": "walled", "RingOfFire": "walled",
    
    "HotPotato": "corridor", "KaboomCanyon": "corridor", "BridgeTooFar": "corridor",
    "CloseQuarters": "corridor"
}

brawler_synergies = {
    ("pam", "8-bit"): "healing + damage boost",
    ("pam", "poco"): "double healing comp",
    ("gene", "tara"): "pull + pull combo",
    ("mortis", "byron"): "aggressive + healing support",
    ("emz", "max"): "area control + speed",
    ("rosa", "poco"): "tank + healing support",
    ("bull", "poco"): "tank + healing support",
    ("el primo", "poco"): "tank + healing support",
    ("darryl", "barley"): "tank + area control",
    ("piper", "brock"): "long-range dominance",
    ("nani", "bo"): "teleport + vision combo",
    ("gale", "bo"): "crowd control + trap",
    ("dynamike", "barley"): "double thrower pressure",
    ("tick", "sprout"): "area denial combo",
    ("sandy", "tara"): "stealth + pull combo",
    ("surge", "max"): "mobility duo",
    ("frank", "emz"): "tank + area control",
    ("ash", "byron"): "rage tank + healing",
    ("ruffs", "piper"): "damage boost + sniper",
    ("tick", "gene"): "area control + pull",
    ("amber", "sandy"): "area control + stealth",
    ("spike", "byron"): "damage + healing",

    # Added based on top winrate data
    ("mandy", "nani"): "sniper + teleport burst",
    ("nani", "piper"): "teleport + sniper range",
    ("dynamike", "mortis"): "thrower distraction + assassin dive",
    ("mortis", "rico"): "mobility + lane control",
    ("colt", "mortis"): "burst + assassin dive",
    ("rico", "stu"): "lane control + high mobility",
    ("bibi", "mortis"): "close-range pressure + flanker",
    ("brock", "mandy"): "long-range pressure + burst",
    ("frank", "mortis"): "tank initiation + assassin follow-up",
    ("rico", "surge"): "lane control + scaling power",
    ("mortis", "stu"): "assassin + dash specialist",
    ("colt", "stu"): "burst damage + speed duelist"
}

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

def analyze_map_advantage(team1, team2, map_name, map_filtered_winrate, winning_team):
    # Get average win rates for both teams on this map
    team1_avg_winrate = sum(get_win_rate(brawler, map_filtered_winrate) for brawler in team1) / 3
    team2_avg_winrate = sum(get_win_rate(brawler, map_filtered_winrate) for brawler in team2) / 3
    
    # Analyze map advantage based on the winning team from prediction model
    diff = abs(team1_avg_winrate - team2_avg_winrate)
    
    # Get map type for additional context
    map_type = map_types.get(map_name, "standard")
    
    # Identify highest win rate brawlers for context
    best_brawlers = []
    if winning_team == "Team 1":
        best_brawler = max(team1, key=lambda b: get_win_rate(b, map_filtered_winrate))
        best_brawlers.append(best_brawler)
    else:
        best_brawler = max(team2, key=lambda b: get_win_rate(b, map_filtered_winrate))
        best_brawlers.append(best_brawler)
    
    if map_type == "open":
        context = "long-range brawlers excel"
    elif map_type == "bushy":
        context = "ambush brawlers excel"
    elif map_type == "walled":
        context = "throwers and wall-breakers excel"
    elif map_type == "corridor":
        context = "area control brawlers excel"
    else:
        context = "balanced map"
        
    reason = f"{winning_team} has brawlers better suited for {map_name} ({context})"
    if len(best_brawlers) > 0:
        reason += f", especially {best_brawlers[0]}"
    
    return {
        "advantage": winning_team,
        "reason": reason,
        "strength": min(100, int(diff * 10))  # Scale the difference for UI display
    }

def analyze_synergy(team1, team2, winning_team):
    # Convert brawler names to lowercase for comparison
    team1_lower = [b.lower() for b in team1]
    team2_lower = [b.lower() for b in team2]
    
    # Find synergies in team1
    team1_synergies = []
    for i in range(len(team1_lower)):
        for j in range(i+1, len(team1_lower)):
            pair = (team1_lower[i], team1_lower[j])
            reverse_pair = (team1_lower[j], team1_lower[i])
            if pair in brawler_synergies:
                team1_synergies.append((team1[i], team1[j], brawler_synergies[pair]))
            elif reverse_pair in brawler_synergies:
                team1_synergies.append((team1[i], team1[j], brawler_synergies[reverse_pair]))
    
    # Find synergies in team2
    team2_synergies = []
    for i in range(len(team2_lower)):
        for j in range(i+1, len(team2_lower)):
            pair = (team2_lower[i], team2_lower[j])
            reverse_pair = (team2_lower[j], team2_lower[i])
            if pair in brawler_synergies:
                team2_synergies.append((team2[i], team2[j], brawler_synergies[pair]))
            elif reverse_pair in brawler_synergies:
                team2_synergies.append((team2[i], team2[j], brawler_synergies[reverse_pair]))
    
    # Determine synergies based on winning team
    team1_synergy_count = len(team1_synergies)
    team2_synergy_count = len(team2_synergies)
    
    # Always attribute better synergy to the winning team
    advantage = winning_team
    
    if advantage == "Team 1" and team1_synergies:
        example = f"{team1_synergies[0][0]} and {team1_synergies[0][1]} ({team1_synergies[0][2]})"
        reason = f"Team 1 has strong synergy between {example}"
    elif advantage == "Team 2" and team2_synergies:
        example = f"{team2_synergies[0][0]} and {team2_synergies[0][1]} ({team2_synergies[0][2]})"
        reason = f"Team 2 has strong synergy between {example}"
    else:
        reason = f"{advantage} has better overall synergy"
    
    return {
        "advantage": advantage,
        "reason": reason,
        "strength": min(100, (max(team1_synergy_count, team2_synergy_count) * 33))  # Scale for UI
    }

def analyze_counters(team1, team2, counter_matrix, winning_team):
    # Identify direct counters between teams
    team1_counters = []  # Team 1 brawlers that counter Team 2 brawlers
    team2_counters = []  # Team 2 brawlers that counter Team 1 brawlers
    
    counter_threshold = 0.55  # Threshold to consider a brawler a counter
    
    for brawler1 in team1:
        for brawler2 in team2:
            counter_score = get_counter(brawler1, brawler2, counter_matrix)
            if counter_score > counter_threshold:
                team1_counters.append((brawler1, brawler2, counter_score))
            
            reverse_counter_score = get_counter(brawler2, brawler1, counter_matrix)
            if reverse_counter_score > counter_threshold:
                team2_counters.append((brawler2, brawler1, reverse_counter_score))
    
    # Use the winning team as the one with counter advantage
    advantage = winning_team
    
    if advantage == "Team 1" and team1_counters:
        strongest_counter = max(team1_counters, key=lambda x: x[2])
        reason = f"Team 1's {strongest_counter[0]} is a direct counter to Team 2's {strongest_counter[1]}"
    elif advantage == "Team 2" and team2_counters:
        strongest_counter = max(team2_counters, key=lambda x: x[2])
        reason = f"Team 2's {strongest_counter[0]} is a direct counter to Team 1's {strongest_counter[1]}"
    else:
        reason = f"{advantage} has more favorable matchups"
    
    # Get the strength based on the number of counters for the winning team
    if advantage == "Team 1":
        strength = min(100, len(team1_counters) * 33)
    else:
        strength = min(100, len(team2_counters) * 33)
    
    return {
        "advantage": advantage,
        "reason": reason,
        "strength": strength
    }

def analyze_team_composition(team1, team2, winning_team):
    team1_roles = [brawler_roles.get(b.lower(), "generalist") for b in team1]
    team2_roles = [brawler_roles.get(b.lower(), "generalist") for b in team2]
    
    team1_role_counts = {role: team1_roles.count(role) for role in set(team1_roles)}
    team2_role_counts = {role: team2_roles.count(role) for role in set(team2_roles)}
    
    def has_balanced_comp(role_counts):
        has_tank = role_counts.get("tank", 0) > 0
        has_support = role_counts.get("support", 0) > 0
        has_damage = (role_counts.get("sharpshooter", 0) + 
                     role_counts.get("control", 0) + 
                     role_counts.get("assassin", 0)) > 0
        return (has_tank or has_support) and has_damage
    
    team1_balanced = has_balanced_comp(team1_role_counts)
    team2_balanced = has_balanced_comp(team2_role_counts)
    
    team1_diversity = len(team1_role_counts)
    team2_diversity = len(team2_role_counts)
    
    # Use the winning team as having the better composition
    advantage = winning_team
    
    if advantage == "Team 1":
        reason = "Team 1 has a more effective composition"
        if "tank" in team1_role_counts:
            reason += " with a tank"
        if "support" in team1_role_counts:
            reason += " with support"
    else:  # Team 2
        reason = "Team 2 has a more effective composition"
        if "tank" in team2_role_counts:
            reason += " with a tank"
        if "support" in team2_role_counts:
            reason += " with support"
    
    return {
        "advantage": advantage,
        "reason": reason,
        "strength": min(100, (max(team1_diversity, team2_diversity) * 33))
    }

def simulate_match_with_model(team1, team2, mode, map_name):
    map_filtered_winrate = all_map_brawler_winrate[all_map_brawler_winrate['Map'] == map_name].copy()

    if map_filtered_winrate.empty:
        return {
            "result": "Map not found in dataset.",
            "win_percentage": 0,
            "insights": {}
        }

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

    # Determine the winning team
    if team1_win_count > len(predictions) / 2:
        result = "Team 1 Wins!"
        result_percentage = round(win_percentage, 2)
        winning_team = "Team 1"
    else:
        result = "Team 2 Wins!"
        result_percentage = round(100 - win_percentage, 2)
        winning_team = "Team 2"

    # Make sure all insights show the winning team as having the advantage
    insights = {
        "map_advantage": analyze_map_advantage(team1, team2, map_name, map_filtered_winrate, winning_team),
        "brawler_synergy": analyze_synergy(team1, team2, winning_team),
        "counter_picks": analyze_counters(team1, team2, counter_matrix, winning_team),
        "team_composition": analyze_team_composition(team1, team2, winning_team)
    }

    return {
        "result": result,
        "win_percentage": result_percentage,
        "insights": insights
    }

def get_best_teams_for_map(map_name):
    return flat_map_best_team.get(map_name, [])

@api.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    team1 = data.get('team1', [])
    team2 = data.get('team2', [])
    mode = data.get('mode', '')
    map_name = data.get('map', '')

    if not team1 or not team2 or len(team1) != 3 or len(team2) != 3 or not map_name:
        return jsonify({'error': 'Invalid team data or map name'}), 400

    result = simulate_match_with_model(team1, team2, mode, map_name)
    return jsonify(result)

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

if __name__ == '__main__':
    api.run(debug=True)