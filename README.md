# TC-3202 [Smart Brawl]

![Project Banner](https://via.placeholder.com/1200x400.png?text=Project+Banner+Placeholder)

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Objectives](#objectives)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage Instructions](#usage-instructions)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [Project Timeline](#project-timeline)
- [Changelog](#changelog)
- [Acknowledgments](#acknowledgments)
- [License](#license)

---

## Introduction
Smart Brawl is an AI-driven system designed to analyze **Brawl Stars** gameplay data to predict winrates and optimize strategies. By leveraging **machine learning models** such as **CNN and NLP**, the system provides real-time insights based on player choices, map details, character builds, and rotation strategies. This project aims to enhance player decision-making and performance through data-driven analysis.

## Project Overview
Smart Brawl is a game analytics system focused on **Brawl Stars**. It helps players optimize their gameplay by predicting match outcomes based on selected parameters. The system targets:
- **Casual & Competitive Players**: Improve their game strategies.
- **Esports Teams & Coaches**: Analyze team performance.
- **Game Analysts & Content Creators**: Gain meta insights.

By using **real-time AI-driven predictions**, the system assists players in adapting to the game’s evolving meta and improving their win rates.

## Objectives
- Develop an AI-based system that predicts winrates based on **character selection, build, rotation, and map**.
- Implement a **recommendation engine** to suggest the best strategies.
- Build a dynamic **frontend (React.js)** for user interaction.
- Deploy a scalable **backend (FastAPI + Firebase/Supabase)** for handling real-time data.
- Host the system on **AWS, Google Cloud, or Heroku** for efficient processing.

## Features
- **Winrate Prediction**: AI-based probability calculation for match outcomes.
- **Strategy Recommendations**: Suggested character builds and team compositions.
- **Historical Match Insights**: Past match data analysis for performance tracking.
- **Real-time Processing**: AI adapts to new strategies and gameplay updates.
- **User-friendly Interface**: Interactive UI with visualized analytics.

## Technologies Used
- **Programming Languages**: Python, JavaScript
- **Frontend**: React.js
- **Backend**: FastAPI
- **Database**: Firebase/Supabase
- **Machine Learning**: CNN, NLP models
- **Deployment**: AWS, Google Cloud, Heroku

## Setup and Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo-url.git
   ```
2. **Install dependencies:**
   - Using `npm` (for frontend):
   ```bash
   npm install
   ```
   - Using `pip` (for backend):
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
4. **Run the project:**
   - Start the frontend:
   ```bash
   npm start
   ```
   - Run the backend:
   ```bash
   uvicorn main:app --reload
   ```

## Usage Instructions
1. **Enter match details**: Select characters, build, and map.
2. **Receive AI predictions**: The system calculates winrate probabilities.
3. **View recommendations**: Get suggested lineup adjustments and strategies.
4. **Apply insights in-game**: Use AI-generated recommendations to improve performance.

## Project Structure
```bash
.
├── 📂 frontend/ (React.js UI)
├── 📂 backend/ (FastAPI services)
├── 📂 models/ (Machine learning models)
├── 📂 data/ (Game match data)
├── 📂 tests/ (Unit and integration tests)
├── .env.example
├── package.json
└── README.md
```

## Contributors
- **[Kinn Hervy Ordonez, Jesslee Torzar, Edgardo Jr. D. Gaela]**: Lead Developer, Backend Developer
- **[Charls Andrei Tubelliza, Karl Lenin Reyes]**: Frontend Developer, UI/UX Designer
- **Gerald Villaran**: Course Instructor

## Project Timeline
- **Week 1-2**: Research and data collection.
- **Week 3-5**: AI model development.
- **Week 6-10**: UI/Backend integration.
- **Week 11-12**: Testing and optimization.
- **Week 13-14**: Deployment and documentation.

## Changelog
### [Version 1.0.0] - 2024-09-07
- Initial AI model implementation.
- Basic winrate prediction.
- Frontend setup with match input fields.

### [Version 1.1.0] - 2024-09-14
- Improved UI design.
- Enhanced AI recommendations.
- Bug fixes and performance improvements.

### [Version 1.2.0] - 2024-09-21
- Added historical match tracking.
- Implemented strategy suggestion module.
- Optimized backend for faster processing.

## Acknowledgments
We extend our gratitude to our mentors and the open-source community for contributing resources that made this project possible.

## License
This project is licensed under [MIT License](LICENSE).

