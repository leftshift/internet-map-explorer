import React, { ChangeEvent } from 'react';

interface SliderProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onNewValue: (newValue: number) => void;
}

export function LabeledSlider(props: SliderProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    props.onNewValue(parseInt(event.target.value));
  }

  return (
    <div>
      <label htmlFor={props.id}>Grid size: <code>{props.value}</code></label>
      <input
        id={props.id}
        type='range' step={props.step}
        min={props.min} max={props.max} value={props.value}
        onChange={handleChange}
      />
    </div>
  )
}
