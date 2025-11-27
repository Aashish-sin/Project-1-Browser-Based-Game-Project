# Project-1-Browser-Based-Game-Project

Dino Game : Overcome the Obstacles !

## 📖 Table of Contents

### 🛠️ Development Structure

#### 1. Game State and Control

#### 2. Speed and Difficulty Scaling

#### 3. Collision and Persistence

### 💡 Future Development

#### 1. Core Mechanics

#### 2. User Experience

## 🛠️ Development Structure

This game is built with HTML, CSS and JavaScript focusing on efficiency and direct DOM manipulation. The core logic is structured around state management and time-based checks.

### 1. Game State and Control

`startCon` : A boolean flag used to ensure the game is active before adding in the `slide` animation for the obstacle, accepting the `jump` input for the character or running collision checks thru `checkLose`. Remains `False` untill `startGame` is start button is clicked on.

`scoreCounter` : The main game loop using `setInterval` (running every 1ms) to increment the score and manage speed changes.

`startGame()` : handles setup (setting initial speed, starting the loop, and adding the slide class to the obstacle),

`endGame()` : clears the loop using `.void` and resets the state of both character and obstacle positions to their default values.

### 2. Speed and Difficulty Scaling

The obstacle speed is controlled by the CSS `animationDuration` property, stored in the `currentAnimationDuration` variable.

The `updateScoreAndSpeed()` function checks the score against the `SPEED_THRESHOLD`. When a threshold is crossed, the duration is decreased by `SPEED_DECREMENT`, effectively making the obstacle move faster.

Obstacle appearance is varied by `randomizeObstacleStyle()` , which randomly sets the obstacle's width on each successful pass using `animationiteration`.

### 3. Collision and Persistence

Collision Detection: This is handled by a separate `setInterval` loop `checkLose` that constantly reads the real-time computed CSS positions (top for character, left for obstacle) to detect when the elements overlap in the defined hit area.

High Scores: The browser's `localStorage` is used for simple, persistent storage of the highest score achieved.

## 💡 Future Development

### Core Mechanics

1. Variable Obstacle Design: Expand `randomizeObstacleStyle()` to add gaps or introduce obstacles that require a low-duck mechanic.

2. Non-Linear Speed Scaling: Implement a tiered speed system where the game accelerates more aggressively after milestone scores (e.g., 500, 1000) rather than a continuous small decrease.

### User Experience

1. Dedicated UI Screens: Create a Pause and Game Over screens to improve user experience during play.

2. Sound Effects: Add audio feedback for Jumping, Scoring, and Collision to enhance user engagement.
