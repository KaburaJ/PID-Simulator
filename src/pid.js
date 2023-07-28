import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const PidSimulator = () => {
  const [ki, setKi] = useState(0);
  const [kp, setKp] = useState(0);
  const [kd, setKd] = useState(0);
  const [setpoint, setSetpoint] = useState(0);
  const [time, setTime] = useState(Array.from({ length: 100 }, (_, i) => i));
  const [processVariable, setProcessVariable] = useState(Array.from({ length: 100 }, () => 0));
  const [errorData, setErrorData] = useState(Array.from({ length: 100 }, () => 0));
  const [derivativeData, setDerivativeData] = useState(Array.from({ length: 100 }, () => 0));
  const [robotPosition, setRobotPosition] = useState(Array.from({ length: 100 }, () => 0));
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  useEffect(() => {
    let interval;

    const pdController = () => {
      // Calculate error, proportional, and derivative terms (as before)
      const error = setpoint - processVariable[processVariable.length - 1];
      const proportional = kp * error;
      const derivative = kd * (error - (processVariable[processVariable.length - 2] || 0));

      // Calculate integral term
      const integral = ki * error;

      // Calculate PID output
      const pidOutput = proportional + derivative + integral;

      // Update process variable, data arrays (as before)
      setProcessVariable(prevProcessVariable => [...prevProcessVariable.slice(1), pidOutput]);
      setErrorData(prevErrorData => [...prevErrorData.slice(1), error]);
      setDerivativeData(prevDerivativeData => [...prevDerivativeData.slice(1), derivative]);

      // Calculate robot position based on the PID output and error
      const centerPosition = 50; // Assuming the center of the line is at position 50
      const newPosition = centerPosition + pidOutput; // Adjust position based on PID output

      // Check if the robot is within the track boundaries
      const trackWidth = 20; // Adjust this value according to your track dimensions
      const trackMinPosition = centerPosition - trackWidth / 2;
      const trackMaxPosition = centerPosition + trackWidth / 2;
      const constrainedPosition = Math.min(Math.max(newPosition, trackMinPosition), trackMaxPosition);

      setRobotPosition(prevRobotPosition => [...prevRobotPosition.slice(1), constrainedPosition]);
    };


    const startSimulation = () => {
      setIsSimulationRunning(true);

      const simulate = () => {
        pdController();

        if (isSimulationRunning) {
          requestAnimationFrame(simulate);
        }
      };

      requestAnimationFrame(simulate);
    };


    const stopSimulation = () => {
      setIsSimulationRunning(false);
      clearInterval(interval);
    };

    if (isSimulationRunning) {
      startSimulation();
      setTimeout(stopSimulation, 60000); // Stop simulation after one minute
    }

    return () => clearInterval(interval);
  }, [kp, kd, ki, setpoint, isSimulationRunning]);

  // Update KP, KD values
  const handleKpChange = value => {
    setKp(value);
  };

  const handleKdChange = value => {
    setKd(value);
  };

  const handleKiChange = value => {
    setKi(value);
  };

  const handleStartSimulation = () => {
    if (!isSimulationRunning) {
      setProcessVariable(Array.from({ length: 100 }, () => 0)); // Reset process variable
      setIsSimulationRunning(true);
    }
  };

  const handleStopSimulation = () => {
    setIsSimulationRunning(false);
  };

  return (
    <div className='pid'>
      <h2>PID Simulator</h2>
      <div>
        <label>Kp:</label>
        <InputRange minValue={0} maxValue={100} step={0.01} value={kp} onChange={handleKpChange} />
      </div>
      <div>
        <label>Ki:</label>
        <InputRange minValue={0} maxValue={100} step={0.01} value={ki} onChange={handleKiChange} />
      </div>
      <div>
        <label>Kd:</label>
        <InputRange minValue={0} maxValue={100} step={0.01} value={kd} onChange={handleKdChange} />
      </div>
      <div>
        <label>Setpoint:</label>
        <InputRange
          minValue={0}
          maxValue={100}
          step={0.01}
          value={setpoint}
          onChange={value => setSetpoint(value)}
        />
      </div>
      <div>
        <button onClick={handleStartSimulation} disabled={isSimulationRunning}>
          Start Simulation
        </button>
        <button onClick={handleStopSimulation} disabled={!isSimulationRunning}>
          Stop Simulation
        </button>
      </div>
      <div>
      <Plot
  data={[
    {
      x: time,
      y: errorData,
      type: 'scatter',
      mode: 'lines',
      name: 'Error',
      line: { shape: 'spline' },
    },
    {
      x: time,
      y: derivativeData,
      type: 'scatter',
      mode: 'lines',
      name: 'Derivative',
      line: { shape: 'spline' },
    },
    {
      x: time,
      y: processVariable.map((_, i) => kp * errorData[i]), // Calculate proportional values
      type: 'scatter',
      mode: 'lines',
      name: 'Proportional',
      line: { shape: 'spline' },
    },
  ]}
  layout={{
    width: 800,
    height: 300,
    title: 'PD Output',
    xaxis: {
      range: [0, time[time.length - 1]],
      title: 'Time',
      tickmode: 'linear',
      dtick: 5,
    },
    yaxis: {
      title: 'Value',
    },
  }}
/>
        <Plot
          data={[
            {
              x: time,
              y: robotPosition,
              type: 'scatter',
              mode: 'lines',
              name: 'Robot Position',
              line: { shape: 'spline' },
            },
          ]}
          layout={{
            width: 800,
            height: 300,
            title: 'Robot Movement',
            xaxis: {
              range: [0, time[time.length - 1]],
              title: 'Time',
              tickmode: 'linear',
              dtick: 5,
            },
            yaxis: {
              title: 'Position',
              tickmode: 'linear',
              dtick: 10,
              showticklabels: false, // Hide y-axis labels
            },
          }}
        />
      </div>
    </div>
  );
};

export default PidSimulator;
