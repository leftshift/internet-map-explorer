import React, { useState } from 'react';
import { SlippyMap } from './SlippyMap';

export function App() {
  const [hoveredSubnet, setHoveredSubnet] = useState('0.0.0.0/24');
  function onSubnetHover(subnet: string) {
    setHoveredSubnet(subnet);
  }

  return (
  <div id="root">
    <div className="split">
      <SlippyMap 
        mapHref="https://www.caida.org/archive/arin-heatmaps/map.eqchi04-2008-iptraffic-cidr24-label.png"
        onSubnetHover={onSubnetHover}
      />
    </div>
    <div className="split">
      <p>controls</p>
      <p>{hoveredSubnet}</p>
    </div>
  </div>
  )
}
