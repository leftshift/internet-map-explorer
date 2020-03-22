const height = 4096;
const width = 4096;

const svg = d3.select('body').append('svg')
  .attr("viewBox", [0, 0, width, height]);

const g = svg.append("g");

const image = g.append('svg:image')
  .attr('xlink:href', 'map.png')  // can also add svg file here
//      x: 0,
//      y: 0

svg.call(d3.zoom()
  .extent([[0, 0], [4096, 4096]])
  .scaleExtent([1, 20])
  .on("zoom", zoomed));

const grid = g.append("g");

function zoomed() {
  g.attr("transform", d3.event.transform);
}

function divide(subnet) {
  const increment = width / (Math.pow(2, subnet/2));
  console.log(increment);
  for (var i = 0; i <= width; i += increment) {
    grid.append("line")
      .attr("x1", 0)
      .attr("x2", 4096)
      .attr("y1", i)
      .attr("y2", i)
      .attr("stroke-width", 2)
      .attr("stroke", "white");

    grid.append("line")
      .attr("x1", i)
      .attr("x2", i)
      .attr("y1", 0)
      .attr("y2", 4096)
      .attr("stroke-width", 2)
      .attr("stroke", "white");
  }
}


function getSvgPoint(element, x, y) {
  var pt = svg.node().createSVGPoint();

  pt.x = x;
  pt.y = y;

  return pt.matrixTransform(element.node().getScreenCTM().inverse());
}

function coordinateToSubnet(subnet, x, y) {
  const order = subnet / 2;
  const sub_x = Math.floor(x / (width/Math.pow(2, subnet/2)));
  const sub_y = Math.floor(y / (width/Math.pow(2, subnet/2)));
  console.log(sub_x + ' ' + sub_y);
  console.log(hilbertCurve.pointToIndex({x: sub_x, y: sub_y}, order));
}

svg.node().addEventListener('mousemove', e => {
    const x = e.clientX,
      y = e.clientY,
      svgL = getSvgPoint(image, x, y);
  console.log(svgL);
  console.log(coordinateToSubnet(16, svgL.x, svgL.y));
});



divide(16);
