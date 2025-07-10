import { useEffect, useRef, forwardRef } from "react";
import { gsap } from 'gsap';

interface Props {
  name: string;
  status?: boolean;
  value?: number | string;
  onToggle: () => void;
  onRemove: () => void;
}

const DeviceWidget = (props: Props, ref) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.2,
      paused: true,
      ease: 'power1.inOut',
    });
  }, []);
  return (
    <div 
      className='border-1 border-[#0e6961] rounded-lg p-2.5 bg-[#1A1A2E] relative will-change-transform max-w-54' 
      ref={ref}
      onMouseEnter={() => gsap.to(buttonRef.current, { scale: 1.1 })}
      onMouseLeave={() => gsap.to(buttonRef.current, { scale: 1 })}
    >
      <h3 className='text-lg'>{props.name}</h3>
      {props.status !== undefined ? (
        <p>
          Status: {props.status ? 
            <span className='text-green-900'>On</span> : 
            <span className='text-red-900'>Off</span> 
          }
        </p>
      ) : (
        <p>Value: {props.value}°C</p>
      )}
      <div className="flex gap-1.5 mt-3">
        {props.status !== undefined && 
          <button 
            className='base-button' 
            onClick={props.onToggle}
            ref={buttonRef}
          >
            Toggle
          </button>
        }
        <button 
          className='base-button' 
          onClick={props.onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
export default forwardRef(DeviceWidget);