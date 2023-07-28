import React from 'react';
import './App.css'
import PidSimulator from './pid';

const App = () => {
  return (
    <div className='App'>
      <h1>PID Simulator</h1>
      <p>
        Welcome to the PID Simulator! Here, you can visualize how a PID controller behaves in a simulated system.
        The PID controller uses three terms, Proportional, Integral, and Derivative, to control the system's behavior
        and achieve a desired goal.
      </p>
      <p>
        You can adjust the values of the PID parameters (Kp, Ki, Kd) and the desired goal to see how the system responds.
        The simulation displays two plots: "PD Output" and "Robot Movement".
      </p>
      <h2>PD Output</h2>
      <p>
        The "PD Output" plot shows the behavior of the PID controller over time. It includes the following curves:
        - The "Error" curve represents the difference between the desired goal and the system's current state.
          A smaller error means the system is closer to the desired goal.
        - The "Derivative" curve represents how fast the error is changing.
          It helps predict the system's future behavior.
        - The "Proportional" curve represents the immediate response of the controller to the current error.
          It adjusts the output based on the current error value.
      </p>
      <h2>Robot Movement</h2>
      <p>
        The "Robot Movement" plot shows the simulated movement of a robot controlled by the PID controller.
        The "Robot Position" curve represents the robot's position over time.
        The controller adjusts the robot's position using the PID output to keep it within predefined boundaries.
        By observing this plot, you can see how the PID controller influences the robot's movement
        and how it tries to maintain the desired position.<br></br>
        - If the "Robot Position" curve oscillates around the desired position, it means the controller is continuously adjusting the robot's position to reach and maintain the desired goal.<br></br>
        - If the curve settles around the desired position without significant oscillations, it indicates that the controller has successfully achieved the desired goal and minimized deviations.<br></br>
        - If the curve exhibits large oscillations or instability, it suggests that the PID controller may require further tuning of the parameters (Kp, Ki, Kd) to improve its performance.<br></br>
      </p>
      <PidSimulator />
    </div>
  );
};

export default App;
