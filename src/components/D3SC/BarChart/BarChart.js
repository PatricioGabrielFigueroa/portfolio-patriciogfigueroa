import './BarChart.css';
import * as d3 from 'd3';
import { m } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

function BarChart({ expandedCard }) {

  const contRef = useRef(null);

  useEffect(() => {

    const dataset = [847, 351, 270, 191, 426, 118, 951, 738, 624, 815, 467, 292, 139, 756, 983, 111, 658, 520, 873, 642,
      219, 985, 137, 749, 562, 431, 298, 169, 946, 813, 675, 538, 391, 254, 127, 964, 821, 688, 555, 422,
      295, 178, 959, 836, 703, 570, 437, 304, 181, 958, 835, 702, 569, 436, 303, 180, 957, 834, 701, 568,
      435, 302, 179, 956, 833, 700, 567, 434, 301, 178, 955, 832, 699, 566, 433, 300, 177, 954, 831, 698,
      565, 432, 299, 176, 953, 830, 697, 564, 431, 298, 175, 952, 829, 696, 563, 430, 297, 174, 951, 828,
      695, 562, 429, 296, 173, 950, 827, 694, 561, 428, 295, 172, 949, 826, 693, 560, 427, 294, 171, 948,
      825, 692, 559, 426, 293, 170];

    const mHeight = expandedCard === 3 ? 400 : 230;
    const mWidth = expandedCard === 3 ? 800 : 200;
    const space = 40;

    const mainSvg = d3.select(contRef.current).append('svg').attr('width', mWidth).attr('height', mHeight)

    const xScale = d3.scaleBand()
    .domain(dataset.map((d, i) => i))
    .range([space, mWidth - space])
    .padding(0.5)

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d, i) => d)])
    .range([mHeight - space, space])

    // MAIN RECTS
    mainSvg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('width', xScale.bandwidth())
    .attr('height', d => mHeight - space - yScale(d))
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => yScale(d))
    .attr('class', 'bar')
    .append('title')
    .text(d => d)
    
    
    const yAxis = d3.axisLeft(yScale)
    
  mainSvg.append('g')
    .attr('transform', `translate(${space - 10}, 0)`)
    .call(yAxis)

  mainSvg.selectAll('.tick text')
  .style('font-size', expandedCard === 3 ? '10px' : '4px')
    // MAIN RECTS

    // Transform Translate SVG

    mainSvg.attr('transform', 'translate(10, 0)')

    // CLEANUP
    return () => {
      d3.select(contRef.current).select('svg').remove();
    }

  }, [contRef, expandedCard])


  return (
    <div>
    <div ref={contRef}></div>
    </div>
  )
}

export default BarChart; 


