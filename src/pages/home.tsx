import { ReactNode, useEffect, useState } from 'react';
import DeviceWidget from '../components/device-widgets/device-widgets';
import { Device } from '../types/device';
import { useQuery } from '@tanstack/react-query';
import { gsap } from 'gsap';

const Home = () => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [widgetRefs, setWidgetRefs] = useState<ReactNode[]>([])
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
  const addToRefs = (el: ReactNode) => {
    if (el && !widgetRefs.includes(el)) {
      setWidgetRefs((prev) => [...prev, el]);
    }
  };
  useEffect(() => {
    const validRefs = widgetRefs.filter((ref) => ref instanceof Element);
    if (validRefs.length > 0) {
      gsap.timeline().to(validRefs, {
        x: -36,
        duration: 0.5,
        stagger: {
          each: 0.06,
          from: 'start',
        },
        ease: 'power2.out',
      });
    }
  }, [widgetRefs]);
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
      Whereas recognition of the inherent dignity
      <h1 className='text-2xl pb-3'>Smart Home Control Panel</h1>
      <div className='flex flex-col gap-4.5 ml-9'>
        {devices.map(device => (
          <DeviceWidget
            key={device.id}
            name={device.name}
            status={device.status}
            value={device.value}
            onToggle={() => toggleDevice(device.id)}
            onRemove={() => removeDevice(device.id)}
            ref={addToRefs}
          />
        ))}
      </div>
    </div>
  );
}
export default Home;