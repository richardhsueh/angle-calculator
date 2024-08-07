import React from "react";
import "./App.css";

function App() {
  const [diameter, setDiameter] = React.useState(20);
  const [numOfSections, setNumOfSections] = React.useState(5);
  const [displacement, setDisplacement] = React.useState();
  const [clipPath, setClipPath] = React.useState();
  const [lineClipPath, setLineClipPath] = React.useState();

  function calculateDisplacement(radius, angle) {
    // Convert angle from degrees to radians
    const angleInRadians = angle * (Math.PI / 180);

    // Calculate displacement
    const displacement = 2 * radius * Math.sin(angleInRadians / 2);

    return displacement;
  }

  function calculateRadius(diameter) {
    return diameter / 2;
  }

  function calculateAngle(numOfSections) {
    // no decimal places
    return 360 / numOfSections;
  }

  React.useEffect(() => {
    if (diameter && numOfSections) {
      const radius = calculateRadius(diameter);
      const angle = calculateAngle(numOfSections);
      const displacement = calculateDisplacement(radius, angle);
      setDisplacement(displacement.toFixed(2));
    }
  }, [diameter, numOfSections]);

  React.useEffect(() => {
    if (numOfSections) {
      const angle = calculateAngle(numOfSections);
      let x1, y1;
      let shape = `polygon(`;
      for (let i = 0; i < numOfSections; i++) {
        x1 = 50 + 50 * Math.cos(angle + (2 * i * Math.PI) / numOfSections);
        y1 = 50 + 50 * Math.sin(angle + (2 * i * Math.PI) / numOfSections);

        shape += `${+x1.toFixed(2)}% ${+y1.toFixed(2)}%,`;
      }
      shape = shape.slice(0, -1);
      shape += `)`;
      setClipPath(shape);
    }
  }, [numOfSections]);

  React.useEffect(() => {
    if (numOfSections) {
      const angle = calculateAngle(numOfSections);

      let line = `polygon(`;
	  	let x1,y1;
	    let borderWidth = 6;
	  	for(let i=0;i<numOfSections;i++) {
	  		x1 = 50 + 50*Math.cos(angle + (2 * i * Math.PI)/numOfSections);
	  		y1 = 50 + 50*Math.sin(angle + (2 * i * Math.PI)/numOfSections);
        if (i === 0 || i === 1) {
          line+=`${+x1.toFixed(2)}% ${+y1.toFixed(2)}%,`;
        }
	  	}

      for(let i=(numOfSections- 1);i>=0;i--) {
        x1 = `calc(${+(50 + 50*Math.cos(angle + (2 * i * Math.PI)/numOfSections)).toFixed(2)}% - ${+(borderWidth*Math.cos(angle + (2 * i * Math.PI)/numOfSections)).toFixed(2)}px)`;
        y1 = `calc(${+(50 + 50*Math.sin(angle + (2 * i * Math.PI)/numOfSections)).toFixed(2)}% - ${+(borderWidth*Math.sin(angle + (2 * i * Math.PI)/numOfSections)).toFixed(2)}px)`;
        if (i === 0 || i === 1) {
          line+=`${x1} ${y1},`;
        }
      }

      line = line.slice(0, -1);
      line+=`)`;
      setLineClipPath(line);
    }

  }, [numOfSections]);
  return (
    <div className="App">
      <header className="App-header">
        <div className="frame">
          <div className="box" style={{ clipPath }}></div>
          <div className="circle"></div>
          <div className="line" style={{ clipPath: lineClipPath }}></div>
        </div>
        <div className="inputGroup">
          <label>Diameter(cm): </label>
          <input
            type="number"
            onChange={(e) => {
              setDiameter(e.target.value);
            }}
            value={diameter}
          />
        </div>
        <div className="inputGroup">
          <label>No. of sides: </label>
          <input
            type="number"
            onChange={(e) => {
              setNumOfSections(e.target.value);
            }}
            value={numOfSections}
            max={100}
          />
        </div>

        <div>Distance between angle: </div>
        <span style={{fontWeight: 'bold', color: '#1446A0', fontSize: "45px"}}>{displacement} cm</span>
      </header>
    </div>
  );
}

export default App;
