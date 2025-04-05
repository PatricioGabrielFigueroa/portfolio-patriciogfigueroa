import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './SmoothZoomCircle.css';
import axios from 'axios';

function SmoothZoomCircle() {

    const [ dataCircles, setDataCircles ] = useState(null);

    useEffect(() => {
        
        const mainGet = async() => {
            try {
                const result = await axios.get('http://localhost:3001/')
                console.log('Succesful GET: ', result)
                setDataCircles(result.data.Result)
            }
            catch(error) {
                console.log('Error w/GET: ', error)
            }
        }

        mainGet();
        
    }, [])
    const divRef = useRef(null);

    // Sample data for circles with skills directly included
    // const data = [
    //     [50, 50, 10, 'HTML'],
    //     [100, 100, 15, 'CSS'],
    //     [200, 200, 20, 'JavaScript'],
    //     [300, 150, 25, 'React'],
    //     [150, 250, 30, 'MySQL'],
    //     [250, 300, 35, 'D3'],
    //     [400, 100, 40, 'Node.js'],
    //     [20, 370, 36, 'Express.js']
    // ];

    const width = 400;
    const height = 400;

    // useEffect for D3
    useEffect(() => {

        if (dataCircles === null || undefined) return; // Check if there is no data fetched yet

        const svg = d3.select(divRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('border', '0.5px red solid');

        const g = svg.append('g'); // MAIN G

        const databind = g.selectAll('g').data(dataCircles); // DATABIND
        const enter = databind.enter().append('g'); // ENTER

        enter.append('circle')
            .attr('cx', d => d.X)
            .attr('cy', d => d.Y)
            .attr('r', d => d.R)
            .attr('fill', (d, i) => {
                const color = d3.interpolateRainbow(i / dataCircles.length);
                d.fillColor = color; // Store the original color in the data
                return color;
            })
            .on('mouseenter', function(event, d) {
                // On hover, increase the radius and change the fill color
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.R * 1.2) // Increase the radius by 20%
                    .attr('fill', '#FCA61F') // Temporary color change for hover effect
                    .attr('cursor', 'pointer')
            })
            .on('mouseleave', function(event, d) {
                // On mouse leave, revert to the original color and size
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.R) // Revert to the original radius
                    .attr('fill', d.fillColor); // Revert to the original color stored in data
            });


        enter.append('text')
            .text(d => d.skills)
            .attr('x', d => d.X)
            .attr('y', d => d.Y)
            .attr('text-anchor', 'middle') // Center the text horizontally
            .attr('alignment-baseline', 'middle') // Center the text vertically
            .attr('fill', 'black')
            .attr('class', 'circle-text')

        // Sort the data by radius in ascending order (smallest to largest)
        const sortedData = [...dataCircles].sort((a, b) => a[2] - b[2]);

        // Define a function for zoom transition
        let currentTransform = [width / 2, height / 2, height];
        let currentIndex = 0; // Start with the smallest circle

        // Smooth zoom transition to the next circle in sorted order
        function transition() {
            // Pick the current circle from sortedData based on currentIndex
            const d = sortedData[currentIndex];
            const targetTransform = [d.X, d.Y, d.R * 2 + 1];
            const i = d3.interpolateZoom(currentTransform, targetTransform);

                g.transition()
                .delay(250)
                .duration(i.duration)
                .attrTween('transform', () => (t) => {
                    const [x, y, r] = i(t);
                    return `
                        translate(${width / 2}, ${height / 2})
                        scale(${height / (r + 40)})
                        translate(${-x}, ${-y})
                    `;
                })
                .on('end', () => {
                    currentTransform = targetTransform;
                    // Increment the index to move to the next circle
                    currentIndex = (currentIndex + 1) % sortedData.length; // Loop back to the smallest circle when reaching the end
                    // Continue the transition to the next circle
                    transition();
                });
        }

        // Start the first transition
        transition();

        // Cleanup on component unmount
        return () => {
            svg.remove();
        };

    }, [dataCircles]); // Empty dependency array to run only on mount and unmount

    // Functions - onClick - onChange //

    return (
        <div ref={divRef}></div> // This div will hold the SVG
    );
}

export default SmoothZoomCircle;