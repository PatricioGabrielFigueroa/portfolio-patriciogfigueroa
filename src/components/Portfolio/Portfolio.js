import React, { useState } from 'react';
import './Portfolio.css';

// Projects for the Cards
import Globe from '../D3SC/Globe/Globe';
import Scatterplot from '../D3SC/Scatterplot/Scatterplot';
import AreaLineChart from '../D3SC/AreaLineChart/AreaLineChart';
import BarChart from '../D3SC/BarChart/BarChart';
import WolfGame from '../Phaser/WolfGame';
import Treemap from '../D3SC/Treemap/Treemap';

function Portfolio({id}) {
  // State to manage which card is expanded
  const [ expandedCard, setExpandedCard ] = useState(null);

  const handleClose = (e) => {
    e.stopPropagation(); 
    setExpandedCard(null); 
  };

  return (
    <div className="p-container" id={id}>

        <h1 className='portfolio-title'>My Projects</h1>

      <div className="portfolio">

        {/* First card */}
        <div
          className={`portcard-o ${expandedCard === 0 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(0)}
        >
          <div className="portcard-i">
            <p className="porttext">D3 Earth Globe w/Tooltip and Drag Functionality</p>
            <Globe expandedCard={expandedCard} />
            {expandedCard === 0 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Second Card*/}
        <div
          className={`portcard-o ${expandedCard === 1 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(1)}
        >
          <div className="portcard-i">
            <p className="porttext">D3 Doping in Cycling w/Tooltip</p>
            <Scatterplot expandedCard={expandedCard}/>
            {expandedCard === 1 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Third Card*/}
        <div
          className={`portcard-o ${expandedCard === 2 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(2)}
        >
          <div className="portcard-i">
            <p className="porttext">D3 Area & Line Chart</p>
            <AreaLineChart expandedCard={expandedCard}/>
            {expandedCard === 2 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

          {/*Fourth Card*/}
          <div
          className={`portcard-o ${expandedCard === 3 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(3)}
          >
          <div className="portcard-i">
            <p className="porttext">D3 Bar Chart</p>
            <BarChart expandedCard={expandedCard} />
            {expandedCard === 3 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Fifth Card*/}
        <div
          className={`portcard-o ${expandedCard === 4 ? 'expanded' : ''}`}
          onClick={() => {
            setExpandedCard(4);

          }}
        >
          <div className="portcard-i">
            <p className="porttext">Phaser&React Demonstration</p>
            <WolfGame expandedCard={expandedCard}/>
            {expandedCard === 4 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Sixth Card*/}
        <div
          className={`portcard-o ${expandedCard === 5 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(5)}
        >
          <div className="portcard-i">
            <p className="porttext">Treemap D3 - Video Game, Movies, Kickstarters</p>
            <Treemap expandedCard={expandedCard}/>
            {expandedCard === 5 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Seventh Card*/}
        <div
          className={`portcard-o ${expandedCard === 6 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(6)}
        >
          <div className="portcard-i">
            <p className="porttext">Cooming Soon...</p>
            {expandedCard === 6 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Eighth Card*/}
        <div
          className={`portcard-o ${expandedCard === 7 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(7)}
        >
          <div className="portcard-i">
            <p className="porttext">Cooming Soon...</p>
            {expandedCard === 7 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Ninth Card*/}
        <div
          className={`portcard-o ${expandedCard === 8 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(8)}
        >
          <div className="portcard-i">
            <p className="porttext">Cooming Soon...</p>
            {expandedCard === 8 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

        {/*Tenth Card*/}
        <div
          className={`portcard-o ${expandedCard === 9 ? 'expanded' : ''}`}
          onClick={() => setExpandedCard(9)}
        >
          <div className="portcard-i">
            <p className="porttext">Cooming Soon...</p>
            {expandedCard === 9 && (
              <button className="close-btn" onClick={(e) => handleClose(e)}>
                X
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Portfolio;
