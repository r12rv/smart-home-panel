import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { THEME_DARK } from "../../consts/themes";
import { useThemeContext } from "../../providers/theme-provider";

interface Props {
  name: string;
  status?: boolean;
  value?: number | string;
  onToggle: () => void;
  onRemove: () => void;
}

const DeviceWidget = (props: Props) => {
  const { theme } = useThemeContext()
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!widgetRef.current) return;
    const highlightColor = theme === THEME_DARK ? "#304137" : "#8dd5ae";
    const insetColor = theme === THEME_DARK ? "#1b1717" : "transparent";
    gsap.to(widgetRef.current, {
      boxShadow: props.status
        ? `inset 25px 25px 100px ${highlightColor}`
        : `inset 0px 0px 0px ${insetColor}`,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [props.status]);
  useEffect(() => {
    if (!widgetRef.current) return;
    const highlightColor = theme === THEME_DARK ? "#304137" : "#8dd5ae";
    const insetColor = theme === THEME_DARK ? "#1b1717" : "transparent";
    gsap.set(widgetRef.current, {
      boxShadow: props.status
        ? `inset 25px 25px 100px ${highlightColor}`
        : `inset 0px 0px 0px ${insetColor}`,
    });
  }, [theme]);

  return (
    <div className="card w-96 bg-base-100 card-xs shadow-sm" ref={widgetRef}>
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
