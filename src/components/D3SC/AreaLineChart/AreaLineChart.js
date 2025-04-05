import './AreaLineChart.css';
import * as d3 from 'd3';
import { useState, useEffect, useRef } from 'react';

function AreaLineChart({ expandedCard }) {

  const svgRef = useRef(null);
  const [ dataset, setDataset ] = useState();
  const [ csvSuccess, setCsvSuccess ] = useState(false); 

  useEffect(() => {

    d3.csv('./week_temperature_sf.csv').then(data => {
      setDataset(data);

      data.map((d, i) => {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
      })
      setCsvSuccess(true);
    });

    if (dataset) {

    const height = expandedCard === 2 ? 400 : 200;
    const width = expandedCard === 2 ? 700 : 230;
    const margin = {
        top: 40,
        right: expandedCard === 2 ? 40 : 20,
        bottom: 40,
        left: expandedCard === 2 ? 80 : 60
      };
      
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, d => d.timestamp))
    .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d.temperature))
    .range([innerHeight, 0])
    .nice();
      
    

    // Million and Thousand Format (S)

      // .replace('k', 'X');

    // Million and Thousand Format(E)

    //xAxis and yAxis (S)

    const tickCustomFormat = n => {
      return n + "°";
    }

    const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%d/%m"))
    .tickSize(-innerHeight)
    .tickPadding(10)
    .ticks(7)

    const yAxis = d3.axisLeft(yScale)
    .tickFormat(tickCustomFormat)
    .tickSize(-innerWidth - 2);

    //xAxis and yAxis (E)

    const svg = d3.select(svgRef.current).append('svg')
    .attr('height', height).attr('width', width)
    .style('border', expandedCard === 2 ? '1px solid white' : '0px');
    
    const mainG = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // D3 AREA

        const areaGen = d3.area()
        .x(d => xScale(d.timestamp))
        .y0(innerHeight)
        .y1(d => yScale(d.temperature))
        .curve(d3.curveBasis)

        mainG.append('path')
        .attr('d', areaGen(dataset))
        .attr('fill', 'orange')
        .attr('opacity', '0.5')
        
    
        // D3 AREA

    mainG.append('g')
    .style('color', 'gray')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis)
    .select('.domain')
    .remove();

    // Call axes and remove the unnecessary lines - also adding labels for xAxis(S)

    mainG.append('text')
    .text(`Date`)
    .attr('fill', 'gray')
    .attr('y', expandedCard === 2 ? height - 42 : height - 50)
    .attr('x', innerWidth / 2 - 30)
    .style('font-size', '10px')

    mainG.append('text')
    .text('Temperature')
    .attr('fill', 'gray')
    .attr('transform', `rotate(90)`)
    .attr('y', '60')
    .attr('x', innerHeight / 2)
    .style('font-size', expandedCard === 2 ? '10px' : 0)
    
    
    
    mainG.append('g')
    .style('color', 'gray')
    .attr('transform', `translate(-2, 0)`)
    .call(yAxis)
    .selectAll('.domain') // .selectAll('.domain, .tick line')
    .remove()

    mainG.selectAll('.tick text')
    .style('font-size', expandedCard === 2 ? '10px' : '7px')

    // Call axes and remove the unnecessary lines (E)

    // Adding identificatory labels (S)

    mainG.append('text')
    .text(`Week Temperature (San Francisco)`)
    .style('font-size', expandedCard === 2 ? '20px' : '8px')
    .attr('y', -20)
    .attr('x', expandedCard === 2 ? innerWidth / 4 : innerWidth / 3 - 50)
    .attr('fill', 'white')

    // Adding identificatory labels (E)

    // D3 LINE
    
    const lineGen = d3.line()
    .x(d => xScale(d.timestamp))
    .y(d => yScale(d.temperature))
    .curve(d3.curveBasis);

    mainG.append('path')
    .attr('stroke', 'orange')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', '3')
    .attr('fill', 'none')
    .attr('d', lineGen(dataset));

    // D3 LINE

    if (!expandedCard) {
        mainG.attr('transform', 'translate(45, 45)')
    }


    
    
  };
  

    return () => {
      d3.select(svgRef.current).select('svg').remove();
    }
  }, [csvSuccess, expandedCard]);
  
  return (
    <div className="App">
      <div ref={svgRef}></div>
    </div>
  );
}

export default AreaLineChart;
