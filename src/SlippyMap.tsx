import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import * as d3_z from 'd3-zoom';
import * as d3_s from 'd3-selection';
import { HilbertAlgorithm } from 'hilbert-curve-ts';

import { Grid } from './Grid';

interface SlippyMapProps {
  mapHref: string;
  subnetHighlightSize: number;
  onSubnetHover: (subnet: string) => void;
}

export function SlippyMap(props: SlippyMapProps) {
  const width = 4096;
  const height = 4096;

  const hilbertAlgorithm = new HilbertAlgorithm(16);

  const [transform, setTransform] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  function onZoom(event: any) {
    setTransform(event.transform);
  }

  function translateToAbsolutePoint(svg: SVGSVGElement, element: SVGGElement, x: number, y: number) {
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;

    return pt.matrixTransform(element.getScreenCTM()!.inverse());
  }

  function intToIp(addrInt: number) {
    return `${addrInt>>>24}.${addrInt>>16 & 255}.${addrInt>>8 & 255}.${addrInt & 255}`;
  }

  function coordinateToSubnet(x: number, y: number): string {
    const x_clamped = Math.min(Math.max(x, 0), width);
    const y_clamped = Math.min(Math.max(y, 0), width);
    const addrInt = hilbertAlgorithm.pointToIndex({
      x: Math.floor(x_clamped),
      y: Math.floor(y_clamped)
    });
    return `${intToIp(addrInt*256)}/24`;
  }

  function onMouseMove(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    const pt = translateToAbsolutePoint(svgRef.current!, gRef.current!, x, y);
    const subnet = coordinateToSubnet(pt.x, pt.y);

    props.onSubnetHover(subnet);
  }

  const zoom = d3_z.zoom<SVGSVGElement, unknown>()
      .extent([[0,0], [4096,4096]])
      .scaleExtent([1,100])
      .on('zoom', (event) => onZoom(event));

  useEffect(() => {
    d3_s.select<SVGSVGElement, unknown>(svgRef.current!).call(zoom);
  }, []);

  const divisions = Math.pow(2, props.subnetHighlightSize/2)

  return(
    <svg
      viewBox={`0, 0, ${width}, ${height}`}
      ref={svgRef}
    >
      <g
        transform={transform}
        onMouseMove={onMouseMove}
        ref={gRef}
      >
        <image href={props.mapHref} />
        <Grid
          sideLength={width}
          divisions={divisions}
        />
      </g>
    </svg>
  )
}
