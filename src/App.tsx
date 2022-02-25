import React, { useState } from 'react';
import { SlippyMap } from './SlippyMap';

export function App() {
  return (
  <div id="root">
    <div className="split">
      <SlippyMap 
        mapHref="https://www.caida.org/archive/arin-heatmaps/map.eqchi04-2008-iptraffic-cidr24-label.png"
      />
    </div>
    <div className="split">
      <p>controls</p>
    </div>
  </div>
  )
}
