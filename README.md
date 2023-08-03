# PID Simulator Application



![alt](https://github.com/KaburaJ/PID-Simulator/blob/main/pid/pid2.PNG)<br><br>
## Overview
This repository contains a control-based simulation application that aims at exploring the intricacies of PID control. Given the proportional and Derivative values, the application can simulate the value itself on one graph as well as the expected line following robot movement on another. Though not fully accurate, it is my version one of something I have wanted to implement ever since I interacted with line following robots. I hope to broaden it to accomodate the Integral input value in future but currently, I am focusing on the `P` and `D` values alone.

## Features
The PID Simulator application offers the following features:

Proportional (P) and Derivative (D) Control: Users can input the Proportional (P) and Derivative (D) values to observe the controller's behavior.

PID Output Plot: The application displays a plot showing the behavior of the PID controller over time. The plot includes the "Error," "Derivative," and "Proportional" curves.

Robot Movement Plot: The application shows a simulated movement of a robot controlled by the PID controller. The "Robot Position" curve represents the robot's position over time.

Adjustable Setpoint: Users can set the desired goal (setpoint) and observe how the system responds.

## Screenshots
![alt](https://github.com/KaburaJ/PID-Simulator/blob/main/pid/pid5.PNG)<br><br><br><br>
![alt](https://github.com/KaburaJ/PID-Simulator/blob/main/pid/pid4.PNG)

## Usage
The application can be accessed [here](https://kaburaj.github.io/PID-Simulator/)

## Installation
To run the application locally, follow these steps:

1. Clone the repository:
```git clone https://github.com/KaburaJ/PID-Simulator.git```
2. Navigate to the project directory: `cd PID-Simulator`
3. Install the dependencies:
```npm install```
4. Start the development server:
```npm start```
5. Open your web browser and visit `http://localhost:3000` to access the application.

## Contributing
Contributions to the PID Simulator application are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.
