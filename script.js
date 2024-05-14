document.getElementById("generate").addEventListener("click", generateGrid);
// const colorPicker = document.getElementById("colorPicker");

function generateGrid() {
  const numberInput = document.getElementById("number").value;
  let colorPicker = document.getElementById("colorPicker");

  const color = colorPicker.value;
  const gridContainer = document.getElementById("gridContainer");
  const jsonDisplay = document.getElementById("jsonDisplay");

  // Clear previous grid
  gridContainer.innerHTML = "";
  jsonDisplay.innerText = "";

  if (!Number.isInteger(Math.sqrt(numberInput))) {
    alert("Please enter a valid square number.");
    return;
  }
  console.log(color);
  const cells_per_row = Math.sqrt(numberInput);
  const cellSize = 100 / cells_per_row;

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const rect = gridContainer.getBoundingClientRect();
  const distanceFromTop = rect.top;
  console.log("distance from top" + distanceFromTop);
  // Determine which is lower
  let lowerDimension;
  if (screenWidth < screenHeight) {
    lowerDimension = (screenWidth - distanceFromTop) / cells_per_row;
  } else {
    lowerDimension = "height";
    lowerDimension = (screenHeight - 3 * distanceFromTop) / cells_per_row;
  }

  console.log(
    "screenHight: " + screenHeight + " - screenWidth: " + screenWidth
  );
  console.log("lower: " + lowerDimension);

  for (let i = 0; i < cells_per_row; i++) {
    for (let j = 0; j < cells_per_row; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = i * cells_per_row + j;
      cell.style.width = `${lowerDimension}px`;
      cell.style.height = `${lowerDimension}px`;
      cell.style.backgroundColor = "rgb(255, 255, 255)";
      cell.addEventListener("click", (e) => colorChange(e));
      gridContainer.appendChild(cell);
    }
    gridContainer.appendChild(document.createElement("br"));
  }

  function updateJsonDisplay() {
    const cells = document.getElementsByClassName("cell");
    const json = {};
    Array.from(cells).forEach((cell, index) => {
      const cellColor = cell.style.backgroundColor;
      if (cellColor) {
        if (!json[cellColor]) {
          json[cellColor] = [index];
        } else {
          json[cellColor].push(index);
        }
      }
    });
    jsonDisplay.innerText = JSON.stringify(json, null, 2);
  }
}

function colorChange(e) {
  thisDiv = e.target.id;
  console.log(thisDiv);
  thisDiv = document.getElementById(thisDiv);
  if (
    thisDiv.style.backgroundColor == "#FFFFFF" ||
    thisDiv.style.backgroundColor == "rgb(255, 255, 255)"
  ) {
    console.log(thisDiv.style.backgroundColor + "change");
    thisDiv.style.backgroundColor =
      document.getElementById("colorPicker").value;
    //   document.getElementById("colorPicker").color;
  } else {
    console.log(thisDiv.style.backgroundColor + "backToNormal");
    thisDiv.style.backgroundColor = "rgb(255, 255, 255)";
  }
}
