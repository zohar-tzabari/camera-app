import React, { useRef, useState, useEffect } from 'react';

function App() {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    async function getCameras() {
      // Get a list of available media devices
      const deviceList = await navigator.mediaDevices.enumerateDevices();

      // Filter the list to only include videoinput devices (cameras)
      const cameras = deviceList.filter(device => device.kind === 'videoinput');

      // Set the state with the list of cameras
      setDevices(cameras);
    }

    getCameras();
  }, []);

  const startVideo = async () => {
    try {
      // Get the stream from the selected camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: deviceId,
        },
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {devices.length > 1 && (
        <>
          <label htmlFor="camera-select">Camera:</label>
          <select id="camera-select" onChange={e => setDeviceId(e.target.value)}>
            {devices.map(device => (
              <option value={device.deviceId}>{device.label}</option>
            ))}
          </select>
        </>
      )}
      <button onClick={startVideo}>Start Video</button>
      <video ref={videoRef} autoPlay />
    </div>
  );
}

export default App;
