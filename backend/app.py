from flask import Flask, request, jsonify
import joblib
import pickle
import numpy as np
import os
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_FOLDER = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(DATA_FOLDER, "brawl_model.pkl"))

with open(os.path.join(DATA_FOLDER, "mode_map.pkl"), "rb") as f:
    mode_map = pickle.load(f)

with open(os.path.join(DATA_FOLDER, "brawlers.pkl"), "rb") as f:
    brawlers_list = pickle.load(f)

with open(os.path.join(DATA_FOLDER, "columns.pkl"), "rb") as f:
    model_columns = pickle.load(f)


@app.route('/init', methods=['GET'])
def init_data():
    modes = list(mode_map.keys())
    return jsonify({
        'modes': modes,
        'brawlers': brawlers_list
    })


@app.route('/get_maps', methods=['POST'])
def get_maps():
    selected_mode = request.json.get('mode')
    maps = mode_map.get(selected_mode, [])
    return jsonify({'maps': maps})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.form

    map_input = data.get('map')
    mode_input = data.get('mode')

    team_brawlers = data.getlist('team_brawlers')
    enemy_brawlers = data.getlist('enemy_brawlers')

    features_df = process_input(map_input, mode_input, team_brawlers, enemy_brawlers)

    features_df = features_df.reindex(columns=model_columns, fill_value=0)

    probability = model.predict_proba(features_df)[0][1]
    prediction = f"✅ Your Victory Chance: {probability * 100:.2f}%"

    return jsonify({'prediction': prediction})


def process_input(map_input, mode_input, team_brawlers, enemy_brawlers):
    input_data = {
        'map': map_input,
        'mode': mode_input
    }

    # Encode brawler presence
    for b in brawlers_list:
        input_data[f'team_{b}'] = int(b in team_brawlers)
        input_data[f'enemy_{b}'] = int(b in enemy_brawlers)

    # Custom features: pretend these are used in your model
    input_data['team_avg_winrate'] = len(team_brawlers) / len(brawlers_list)  # dummy logic
    input_data['enemy_avg_winrate'] = len(enemy_brawlers) / len(brawlers_list)  # dummy logic
    input_data['counter_brawler_count'] = sum([1 for b in team_brawlers if b in enemy_brawlers])  # dummy overlap logic

    df = pd.DataFrame([input_data])
    df = pd.get_dummies(df)

    return df


if __name__ == '__main__':
    app.run(debug=True)
