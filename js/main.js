const height = 4096;
const width = 4096;

const svg = d3.select('svg')
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

const subnetText = d3.select('#subnet');

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
  const sub_x = Math.floor(x);
  const sub_y = Math.floor(y);
  console.log(sub_x + ' ' + sub_y);
  const addr = hilbertCurve.pointToIndex({x: sub_x, y: sub_y}, 16) * 256;
  subnetText.text(ipFromInt(addr) + '/24');
}

function ipFromInt(ipl) {
    return ( (ipl>>>24) +'.' +
            (ipl>>16 & 255) +'.' +
            (ipl>>8 & 255) +'.' +
            (ipl & 255) );
};

svg.node().addEventListener('mousemove', e => {
    const x = e.clientX,
      y = e.clientY,
      svgL = getSvgPoint(image, x, y);
  console.log(svgL);
  console.log(coordinateToSubnet(16, svgL.x, svgL.y));
});

const upload = document.getElementById('file-input');
let currentBlobData = null;

upload.addEventListener('change', function (e) {
      var file = this.files[0];
      if (currentBlobData) {
                URL.revokeObjectURL(currentBlobData);
            }
      currentBlobData = URL.createObjectURL(file);
      image.attr('xlink:href', currentBlobData);
});


divide(16);
