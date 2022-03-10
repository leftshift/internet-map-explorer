import React from 'react';

interface GridProps {
  sideLength: number;
  divisions: number;
}

export function Grid(props: GridProps) {
  const increment = props.sideLength / props.divisions;
  let strokeWidth = 4;
  if (props.divisions > 16) {
    strokeWidth = 2;
  } else if (props.divisions > 64) {
    strokeWidth = 1;
  }

  const range = [...Array(props.divisions).keys()];

  return(
    <g>
      {range.map((i) => (
        <line 
          x1={0} x2={props.sideLength}
          y1={i * increment} y2={i * increment}
          strokeWidth={strokeWidth} stroke={"white"}
        />
      ))}
      {range.map((i) => (
        <line 
          x1={i * increment} x2={i * increment}
          y1={0} y2={props.sideLength}
          strokeWidth={strokeWidth} stroke={"white"}
        />
      ))}
    </g>
  )
}
