import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { THEME_DARK } from "../../consts/themes";
import { useThemeContext } from "../../providers/theme-provider";
import { LocalDevice } from "../../types/device";

interface Props {
  device: LocalDevice;
  onToggle: () => void;
  onRemove: () => void;
}

const DeviceWidget = (props: Props) => {
  const { theme } = useThemeContext();
  const device = props.device;
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!widgetRef.current) return;
    const highlightColor = theme === THEME_DARK ? "#304137" : "#8dd5ae";
    const insetColor = theme === THEME_DARK ? "#1b1717" : "transparent";
    gsap.to(widgetRef.current, {
      boxShadow: device.status
        ? `inset 25px 25px 100px ${highlightColor}`
        : `inset 0px 0px 0px ${insetColor}`,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [device.status]);
  useEffect(() => {
    if (!widgetRef.current) return;
    const highlightColor = theme === THEME_DARK ? "#304137" : "#8dd5ae";
    const insetColor = theme === THEME_DARK ? "#1b1717" : "transparent";
    gsap.set(widgetRef.current, {
      boxShadow: device.status
        ? `inset 25px 25px 100px ${highlightColor}`
        : `inset 0px 0px 0px ${insetColor}`,
    });
  }, [theme]);

  return (
    <div
      className="card w-96 h-30 bg-base-100 card-xs shadow-sm px-1"
      ref={widgetRef}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{device.name}</h2>
          <span>{device.room}</span>
        </div>
        <div className="font-s">
          {device.value && <p>Value: {device.value}°C</p>}
        </div>
        <div className="justify-end mt-auto card-actions">
          {device.status !== undefined && (
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
