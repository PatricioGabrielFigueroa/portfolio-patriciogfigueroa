import * as d3 from 'd3';
import * as topojson from 'topojson';
import { useEffect, useRef } from 'react';
import './Globe.css';

function Globe({ expandedCard }) {
  const divRef = useRef(null);

  useEffect(() => {

    const svg = d3.select(divRef.current)
      .append('svg')
      .attr('height', expandedCard === 0 ? '70vh' : '40vh')
      .attr('width', expandedCard === 0 ? '60vw' : '30vw');

    const g = svg.append('g');

    // Define a function to update the projection
    const updateProjection = () => {
      const scale = expandedCard === 0 ? 0.30 * window.innerHeight : 0.13 * window.innerHeight;
      const translateX = expandedCard === 0 ? 0.30 * window.innerWidth : 0.150 * window.innerWidth;
      const translateY = expandedCard === 0 ? 0.32 * window.innerHeight : 0.15 * window.innerHeight;

      return d3.geoOrthographic().scale(scale).translate([translateX, translateY]);
    };

    const projection = updateProjection();
    const pathGenerator = d3.geoPath().projection(projection);

    // Draw the initial sphere
    const sphere = g.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({ type: 'Sphere' }))
      .style('background-color', 'lightskyblue');

    Promise.all([
      d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
      d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
    ]).then(([tsvData, topoData]) => {
      const countryName = tsvData.reduce((acc, d) => {
        acc[d.iso_n3] = d.name;
        return acc;
      }, {});

      const gData = topojson.feature(topoData, topoData.objects.countries);
      const countries = g.selectAll('path.countries').data(gData.features);
      countries.enter().append('path')
        .attr('d', d => pathGenerator(d))
        .attr('class', 'countries')
        .append('title')
        .text(d => countryName[d.id]);

      // Drag functionality
      let rotate = [0, 0]; // Initial rotation
      let lastX, lastY;

      const drag = d3.drag()
        .on('start', (event) => {
          lastX = event.x;
          lastY = event.y;
        })
        .on('drag', (event) => {
          const dx = event.x - lastX;
          const dy = event.y - lastY;

          rotate[0] += dx * 0.5; // Adjust rotation speed
          rotate[1] -= dy * 0.5; // Adjust rotation speed

          projection.rotate(rotate);
          
          // Update all paths including the sphere
          g.selectAll('path.countries').attr('d', pathGenerator);

          lastX = event.x;
          lastY = event.y;
        });

      svg.call(drag);
    });

    // Resize event listener to adjust the projection dynamically
    const handleResize = () => {
      // Update the projection when window is resized
      const updatedProjection = updateProjection();
      pathGenerator.projection(updatedProjection);
      
      // Re-render the globe with updated projection
      g.selectAll('path.countries').attr('d', pathGenerator);
      g.selectAll('path.sphere').attr('d', pathGenerator({ type: 'Sphere' }));
    };

    // Listen for window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      d3.select(divRef.current).select('svg').remove();
    };
  }, [expandedCard]);

  return <div ref={divRef}></div>;
}

export default Globe;
