document.getElementById("generate").addEventListener("click", generateGrid);
let lock = 0;
let defaultRGB = hexToRGB("#000000");
let defaultHEX = "#000000";

function generateGrid() {
  const numberInput = document.getElementById("number").value;
  let colorPicker = document.getElementById("colorPicker");

  const color = colorPicker.value;
  const gridContainer = document.getElementById("gridContainer");
  const jsonDisplay = document.getElementById("jsonDisplay");

  gridContainer.innerHTML = "";
  jsonDisplay.innerText = "";

  if (!Number.isInteger(parseInt(numberInput))) {
    alert("Please enter a valid square number.");
    return;
  }
  // console.log(color);
  const cells_per_row = parseInt(numberInput);
  const cellSize = 100 / cells_per_row;

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const rect = gridContainer.getBoundingClientRect();
  const distanceFromTop = rect.top;
  // console.log("distance from top" + distanceFromTop);
  let lowerDimension;
  if (screenWidth < screenHeight) {
    lowerDimension = (screenWidth - distanceFromTop) / cells_per_row;
  } else {
    lowerDimension = "height";
    lowerDimension = (screenHeight - 3 * distanceFromTop) / cells_per_row;
  }
  // console.log(
  //   "screenHight: " + screenHeight + " - screenWidth: " + screenWidth
  // );
  // console.log("lower: " + lowerDimension);
  for (let i = 0; i < cells_per_row; i++) {
    const breakLine = document.createElement("div");
    breakLine.classList.add("newLine");
    gridContainer.appendChild(breakLine);
    for (let j = 0; j < cells_per_row; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = i * cells_per_row + j;
      cell.style.width = `${lowerDimension}px`;
      cell.style.height = `${lowerDimension}px`;
      cell.style.backgroundColor = defaultRGB;
      cell.addEventListener("click", (e) => colorChange(e));
      breakLine.appendChild(cell);
    }
  }
}
function colorChange(e) {
  thisDiv = e.target.id;
  // console.log(thisDiv);
  thisDiv = document.getElementById(thisDiv);
  let newColor = document.getElementById("colorPicker").value;

  if (newColor[0] == "#") {
    newColor = hexToRGB(newColor);
  }
  // console.log(newColor);
  if (thisDiv.style.backgroundColor == newColor) {
    // console.log(thisDiv.style.backgroundColor + "change");
    thisDiv.style.backgroundColor = defaultRGB;
  } else {
    // console.log(thisDiv.style.backgroundColor + "backToNormal");
    thisDiv.style.backgroundColor = newColor;
  }
  const copyButton = document.getElementById("getText");
  if (copyButton.innerText == "Copy" || copyButton.innerText == "Copy this") {
    copyButton.innerText = "Update";
  }
  if (lock == 0) {
    lock = 1;
  }
}
/////////////////////////////////////////////
const copyButton = document.getElementById("getText");
document.getElementById("getText").addEventListener("click", updateJsonDisplay);

function updateJsonDisplay() {
  if (lock == 0) {
    return;
  }
  const cells = document.getElementsByClassName("cell");
  const json = {};

  // Iterate over each cell
  Array.from(cells).forEach((cell, index) => {
    const cellColor = cell.style.backgroundColor;

    // Check if cell has a background color
    if (cellColor) {
      if (cellColor != defaultRGB) {
        // If color not in dictionary, initialize list with index, otherwise add index to list
        json[cellColor] = json[cellColor]
          ? [...json[cellColor], index]
          : [index];
      }
    }
  });
  const jsonString = JSON.stringify(
    json,
    (key, value) => {
      if (Array.isArray(value)) {
        return "[" + value.join(", ") + "]";
      }
      return value;
    },
    2
  );

  // console.log(jsonString);
  if (!document.getElementById("textArea")) {
    //First time
    const tempTextArea = document.createElement("textarea");
    tempTextArea.setAttribute("id", "textArea");
    tempTextArea.value = jsonString;
    document.getElementById("jsonDisplay").appendChild(tempTextArea);
  } else {
    const tempTextArea = document.getElementById("textArea");
    tempTextArea.value = jsonString;
  }
  copyButton.innerText = "Copy";
  lock = 0;
}

copyButton.addEventListener("click", () => {
  if (document.getElementById("textArea") && copyButton.innerText == "Copy")
    navigator.clipboard
      .writeText(document.getElementById("textArea").value)
      .then(() => {
        // if (copyButton.innerText == "Copy") {
        // }
        console.log("Text copied to clipboard");
        copyButton.innerText = "Copy this";
      })
      .catch((error) => {
        console.error("Error in copying text: ", error);
      });
});

function hexToRGB(hex) {
  // Remove the '#' symbol if present
  hex = hex.replace("#", "");

  // Convert the hex value to decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}
