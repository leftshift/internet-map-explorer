import React, { useState } from 'react';
import { SlippyMap } from './SlippyMap';

export function App() {
  return (
  <div id="root">
    <div className="split">
      <SlippyMap />
    </div>
    <div className="split">
      <p>controls</p>
    </div>
  </div>
  )
}
