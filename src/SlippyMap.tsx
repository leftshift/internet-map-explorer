import React, { useState, useRef, useEffect } from 'react';
import * as d3_z from 'd3-zoom';
import * as d3_s from 'd3-selection';
import * as hilbertCurve from 'hilbert-curve';

interface SlippyMapProps {
  mapHref: string;
}

export function SlippyMap(props: SlippyMapProps) {
  const width = 4096;
  const height = 4096;

  const [transform, setTransform] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);

  function onZoom(event: any) {
    setTransform(event.transform);
  }

  const zoom = d3_z.zoom<SVGSVGElement, unknown>()
      .extent([[0,0], [4096,4096]])
      .scaleExtent([1,100])
      .on('zoom', (event) => onZoom(event));

  useEffect(() => {
    d3_s.select<SVGSVGElement, unknown>(svgRef.current!).call(zoom);
  }, []);

  return(
    <svg
      viewBox={`0, 0, ${width}, ${height}`}
      ref={svgRef}
    >
      <g transform={transform}>
        <image href={props.mapHref} />
      </g>
    </svg>
  )
}
