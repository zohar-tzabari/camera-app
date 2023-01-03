import React, { useRef, useState, useEffect } from 'react';

function CameraSelector() {
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

  useEffect(() => {
    async function getStream() {
      // Get the stream from the selected camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: deviceId,
        },
      });

      // Set the stream as the srcObject of the video element
      videoRef.current.srcObject = stream;
    }

    if (deviceId) {
      getStream();
    }
  }, [deviceId]);

  return (
    <>
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
      <video ref={videoRef} autoPlay />
    </>
  );
} export default CameraSelector;