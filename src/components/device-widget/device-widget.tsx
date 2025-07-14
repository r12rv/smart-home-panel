import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  name: string;
  status?: boolean;
  value?: number | string;
  onToggle: () => void;
  onRemove: () => void;
}

const DeviceWidget = (props: Props) => {
  const buttonRef = useRef(null);
  const widgetRef = useRef(null);
  useEffect(() => {
    if (!widgetRef.current) return;
    gsap.to(widgetRef.current, {
      boxShadow: props.status
        ? 'inset 25px 25px 100px #8dd5ae'
        : 'inset 0px 0px 0px transparent',
      duration: 1,
      ease: 'power2.inOut',
    });
  }, [props.status]);
  return (
    <div
      className="card w-96 bg-base-100 card-xs shadow-sm"
      ref={widgetRef}
    >
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <div className="font-s">
          {props.status !== undefined ? (
            <p>
              Status:{" "}
              {props.status ? (
                <span className="text-[#faad28]">On</span>
              ) : (
                <span className="text-red-900">Off</span>
              )}
            </p>
          ) : (
            <p>Value: {props.value}°C</p>
          )}
        </div>
        <div className="justify-end card-actions">
          {props.status !== undefined && (
            <button
              className="btn btn-primary"
              onClick={props.onToggle}
              ref={buttonRef}
            >
              Toggle
            </button>
          )}
          <button className="btn btn-primary" onClick={props.onRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceWidget;
