import { useEffect, useRef } from "react";
import { gsap } from 'gsap';

interface Props {
  name: string;
  status?: boolean;
  value?: number | string;
  onToggle: () => void;
  onRemove: () => void;
}

const DeviceWidget = (props: Props) => {
  const buttonRef = useRef(null);
  const widgetRef = useRef(null)
  useEffect(() => {
    if (!widgetRef.current) return;
    gsap.to(widgetRef.current, {
      outlineColor: props.status ? '#b3873d' : '#0e6961',
      outlineWidth: props.status ? '1px' : '1px',
      boxShadow: props.status
        ? 'inset 10px 10px 50px #b3873d'
        : 'inset 0px 0px 0px transparent',
      duration: 1,
      ease: 'power2.inOut',
    });
  }, [props.status]);
  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.2,
        paused: true,
        ease: 'power1.inOut',
      });
    }
    gsap.fromTo(
      widgetRef.current,
      { opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }
    );
  }, []);
  return (
    <div 
      className='outline-1 outline-[#0e6961] rounded-lg p-2.5 bg-[#1A1A2E] relative will-change-transform w-56 h-32'
      ref={widgetRef}
      onMouseEnter={() => gsap.to(buttonRef.current, { scale: 1.1 })}
      onMouseLeave={() => gsap.to(buttonRef.current, { scale: 1 })}
    >
      <h3 className='text-lg'>{props.name}</h3>
      {props.status !== undefined ? (
        <p>
          Status: {props.status ? 
            <span className='text-[#faad28]'>On</span> : 
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

export default DeviceWidget;