import './Scatterplot.css';
import * as d3 from 'd3';
import { useEffect, useState, useRef } from 'react';

function Scatterplot({ expandedCard }) {

  const [ dat, setDat ] = useState();
  const svgRef = useRef();
  const [ fetched, setFetched ] = useState(false);

  useEffect(() => {
    // Fetching data
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(response => response.json())
    .then(data => {
      setFetched(true);
      setDat(data);
    })
    .catch(error => {
      console.log(`Beware! An error occurred! Information about: ${error}`) 
    })

    if (dat && fetched) { 
    console.log(dat);

    const h = expandedCard === 1 ? 500 : 300;
    const w = expandedCard === 1 ? 900 : 280;
    const paddi = expandedCard === 1 ? 100 : 70;
    
    // ADJUSTING TIME "36:50" - FOR SCALING

    const parsedTimeValues = dat.map(d => {
      var parsedTime = d3.timeParse("%M:%S");
      return {...d, Time: parsedTime(d.Time).getTime()};
    });

    // ADJUSTING TIME "36:50" - FOR SCALING

    const xScale = d3.scaleLinear()
    .domain([d3.min(dat, d => d.Year), d3.max(dat, d => d.Year)])
    .range([paddi, w - paddi]);

    const yScale = d3.scaleLinear() //scaleLinear() also works  
    .domain([d3.min(parsedTimeValues, d => d.Time), d3.max(parsedTimeValues, d => d.Time)])
    .range([paddi, h - paddi]);

    const svg = d3.select(svgRef.current).append('svg')
    .attr('height', h)
    .attr('width', w)
    .attr('transform', 'translate(8, -50)')

      svg.selectAll('circle')
      .data(dat)
      .enter()
      .append('circle')
      .attr('fill', 'lightblue')
      .classed('spcircles', true)
      .attr('r', expandedCard === 1 ? 6 : 3)
      .attr('cx', d => xScale(d.Year))
      .attr('cy', d => {
        const parseTime = d3.timeParse("%M:%S");
        var finalValue = parseTime(d.Time).getTime();
        console.log(finalValue);
        return yScale(finalValue);
      })
      .append('title')
      .text(d => {
        return `Name: ${d.Name}, Nationality: ${d.Nationality}
        Time: ${d.Time}, Year: ${d.Year}
        Doping: ${d.Doping !== "" ? d.Doping : "No alleged doping"}`
      })

      const xAxis = d3.axisBottom(xScale);
      
      svg.append('g')
      .attr('transform', 'translate(0, ' + (h - paddi) + ')')
      .call(xAxis)
      .selectAll('text')
      .style('font-size', expandedCard === 1 ? '10px' : '5px')
      .attr('fill', 'white')
      
      var parsingForScale = d3.timeFormat("%M:%S");

      const yAxis = d3.axisLeft(yScale)
      .tickFormat(parsingForScale)
      .ticks(15) // Keep the tick interval for spacing

      // const yAxis = d3.axisLeft(yScale)
      // .tickFormat(parsingForScale)
      // .ticks(30)
      // .tickValues(yScale.domain().filter(function(d, i) {
      //   return i % (15 * 1000) === 0; // 15 seconds in milliseconds
      // }))   --> An useful way but it displays only one value "36:50"

      svg.append('g')
      .attr('transform', 'translate(' + (paddi - 10) + ', 0)')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', expandedCard === 1 ? '10px' : '5px')
      .attr('fill', 'white')

      svg.selectAll('.domain')
      .style('stroke', 'white')

      svg.selectAll('.tick')
      .style('color', 'white')
      
      console.log(dat[0].Time)
  }





    // Fetching data

    return () => {
      // Cleanup function
      d3.select(svgRef.current).select('svg').remove();
    }
  }, [fetched, expandedCard])

  return (
    <div className="App">
      <div ref={svgRef}></div> 
    </div>
  );
}

export default Scatterplot;
