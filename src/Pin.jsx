import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";

const Pin = ({ delta, scale }) => {
  const oldScale = useRef(1);
  const oldPosition = useRef({});
  const [isGrowing, setIsGrowing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pinRef = useRef(null);

  useEffect(() => {
    console.log(scale, oldScale.current, oldScale.current >= scale);
    setIsGrowing(oldScale.current > scale);
    oldScale.current = scale;
  }, [scale]);

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

  const correctPosition = useCallback(() => {
    setPosition((position) => ({
      x: position.x + delta.x * scale,
      y: position.y + delta.y * scale,
    }));
  }, [delta, scale]);

  useEffect(() => {
    correctPosition();
  }, [delta, correctPosition]);

  useEffect(() => {
    console.log("fui chamado");
    setPosition((position) => ({
      x: oldPosition.current.x * scale,
      y: oldPosition.current.y * scale,
    }));
  }, [scale]);

  useEffect(() => {
    oldPosition.current = position;
  }, [position]);

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="tooltip"
      ref={pinRef}
    >
      something
    </div>
  );
};

export default Pin;
