import { useCallback, useRef, useState } from "react";
import * as React from "react";
import { HexColorPicker } from "react-colorful";
import "./ColorPicker.css"
import useClickOutside from "./useClickOutside";

export const ColorPicker = ({ color = "#000", onChange, className }) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className={`picker ${className}`}>
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
