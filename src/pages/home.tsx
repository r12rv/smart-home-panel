import { useEffect, useState } from 'react';
import DeviceWidget from '../components/device-widget/device-widget';
import { Device } from '../types/device';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const { data } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });
  useEffect(() => {
    if (data) {
      setDevices(data.map(device => ({
        ...device,
        status: false,
        value: 22,
      })));
    }
  }, [data]);
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
    <div className='h-full w-full flex-grow p-2 flex flex-col text-white dark-theme'>
      <h1 className='text-2xl pb-3'>Smart Home Control Panel</h1>
      <div className='flex flex-wrap gap-4.5'>
        {devices.map((device) => (
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
export default Home;