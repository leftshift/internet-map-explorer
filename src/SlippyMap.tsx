import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
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
    console.log('onZoom');
    setTransform(event.transform);
  }

  const zoom = d3.zoom<SVGSVGElement, unknown>()
      .extent([[0,0], [4096,4096]])
      .scaleExtent([1,100])
      .on('zoom', (event) => onZoom(event));

  useEffect(() => {
    d3.select<SVGSVGElement, unknown>(svgRef.current!).call(zoom);
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
