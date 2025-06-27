import { useState } from 'react';
import DeviceWidget from './components/device-widgets/device-widgets';


function App() {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Light', status: false },
    { id: 2, name: 'Thermostat', value: 22 },
  ]);
  const toggleDevice = (id: number) => {
    const newDevices = devices.map(device =>
      device.id === id
        ? { ...device, status: !device.status }
        : device
    );
    setDevices(newDevices)
  };

  return (
    <div>
      <h1>Smart Home Control Panel</h1>
      {devices.map(device => (
        <DeviceWidget
          key={device.id}
          name={device.name}
          status={device.status}
          value={device.value}
          onToggle={() => toggleDevice(device.id)}
        />
      ))}
    </div>
  );
}
export default App;
