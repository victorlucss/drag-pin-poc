import React, { useCallback, useMemo } from "react";
import { useEffect, useRef, useState } from "react";

const Pin = ({ delta, scale }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pinRef = useRef(null);

  useEffect(() => {
    const image = pinRef.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      e.preventDefault();
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (!isDragging) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;

      prevPosition = { x: e.clientX, y: e.clientY };
      setPosition((position) => ({
        x: position.x + deltaX,
        y: position.y + deltaY,
      }));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    image?.addEventListener("mousedown", handleMouseDown);
    image?.addEventListener("mousemove", handleMouseMove);
    image?.addEventListener("mouseup", handleMouseUp);

    return () => {
      image?.removeEventListener("mousedown", handleMouseDown);
      image?.removeEventListener("mousemove", handleMouseMove);
      image?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pinRef]);

  const correctScale = useCallback(() => {
    console.log(scale);
    setPosition((position) => ({
      x: position.x * 1 - scale,
      y: position.y * 1 - scale,
    }));
  }, [scale]);

  const correctPosition = useCallback(() => {
    console.log(scale);
    setPosition((position) => ({
      x: position.x + delta.x * scale,
      y: position.y + delta.y * scale,
    }));
  }, [delta, scale]);

  useEffect(() => {
    correctPosition();
  }, [delta, correctPosition]);

  useEffect(() => {
    // correctScale();
  }, [correctScale, scale]);

  console.log(position);

  console.log(pinRef && pinRef.current && pinRef.current.left, position.x);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "50px",
        height: "50px",
        background: "red",
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: "grab",
        zIndex: 9,
      }}
      ref={pinRef}
    >
      qualquer coisa
    </div>
  );
};

export default Pin;
