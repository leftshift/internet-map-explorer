import React, { useState } from 'react';
import { SlippyMap } from './SlippyMap';
import { LabeledSlider } from './Slider';

export function App() {
  const [hoveredSubnet, setHoveredSubnet] = useState('0.0.0.0/24');
  const [subnetHighlightSize, setSubnetHighlightSize] = useState(8);

  return (
  <div id="root">
    <div className="split">
      <SlippyMap 
        mapHref="https://www.caida.org/archive/arin-heatmaps/map.eqchi04-2008-iptraffic-cidr24-label.png"
        subnetHighlightSize={subnetHighlightSize}
        onSubnetHover={setHoveredSubnet}
      />
    </div>
    <div className="split">
      <p>controls</p>
      <p>{hoveredSubnet}</p>
      <LabeledSlider
        id="subnetHighlightSize"
        min={0} max={24} step={2}
        value={subnetHighlightSize} onNewValue={setSubnetHighlightSize}
      />
    </div>
  </div>
  )
}
