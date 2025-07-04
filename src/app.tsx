import { useState } from 'react';
import DeviceWidget from './components/device-widgets/device-widgets';
import { Device } from './types/device';

function App() {
  const [devices, setDevices] = useState<Array<Device>>([
    { id: 1, name: 'Air Conditioner', status: true},
    { id: 2, name: 'Light', status: false },
    { id: 3, name: 'Thermostat', value: 22 },
  ]);
  const toggleDevice = (id: number) => {
    const newDevices = devices.map(device =>
      device.id === id
        ? { ...device, status: !device.status }
        : device
    );
    setDevices(newDevices)
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  return (
    <div className='m-2 flex flex-col'>
      <h1 className='text-2xl pb-3'>Smart Home Control Panel</h1>
      <div className='flex flex-col gap-2.5'>
        {devices.map(device => (
          <DeviceWidget
            key={device.id}
            name={device.name}
            status={device.status}
            value={device.value}
            onToggle={() => toggleDevice(device.id)}
            onRemove={() => removeDevice(device.id)}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
