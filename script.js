document.getElementById("generate").addEventListener("click", generateGrid);
// const colorPicker = document.getElementById("colorPicker");

let defaultRGB = "rgb(66, 0, 66)";
let defaultHEX = "#420042";

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
    // const breakLine = document.createElement("div");
    // breakLine.classList.add("newLine");
  }

  // function updateJsonDisplay() {
  //   const cells = document.getElementsByClassName("cell");
  //   const json = {};
  //   Array.from(cells).forEach((cell, index) => {
  //     const cellColor = cell.style.backgroundColor;
  //     if (cellColor) {
  //       if (!json[cellColor]) {
  //         json[cellColor] = [index];
  //       } else {
  //         json[cellColor].push(index);
  //       }
  //     }
  //   });
  //   jsonDisplay.innerText = JSON.stringify(json, null, 2);
  // }
}
function updateJsonDisplay() {
  const cells = document.getElementsByClassName("cell");
  const json = {};

  // Iterate over each cell
  Array.from(cells).forEach((cell, index) => {
    const cellColor = cell.style.backgroundColor;

    // Check if cell has a background color
    if (cellColor) {
      if (cellColor != "rgb(66, 0, 66)") {
        // If color not in dictionary, initialize list with index, otherwise add index to list
        json[cellColor] = json[cellColor]
          ? [...json[cellColor], index]
          : [index];
      }
    }
  });
  // Convert JSON object to string with pretty formatting
  // const jsonString = JSON.stringify(json, null, 2);
  const jsonString = JSON.stringify(
    json,
    (key, value) => {
      if (Array.isArray(value)) {
        return "[" + value.join(", ") + "]"; // Join array values with a comma and space
      }
      return value; // Return other types of values unchanged
    },
    2
  );

  console.log(jsonString);
  // Update jsonDisplay element with the string representation of the JSON
  // jsonDisplay.innerText = jsonString;

  // Create a button to copy the JSON string to clipboard
  // const copyButton = document.createElement("button");
  const copyButton = document.getElementById("getText");

  if (!document.getElementById("textArea")) {
    //First time
    copyButton.innerText = "Copy";
    const tempTextArea = document.createElement("textarea");
    tempTextArea.setAttribute("id", "textArea");
    tempTextArea.value = jsonString;
    document.getElementById("jsonDisplay").appendChild(tempTextArea);
  } else {
    const tempTextArea = document.getElementById("textArea");
    tempTextArea.value = jsonString;
  }
  // tempTextArea.value = jsonString;
  // document.getElementById("jsonDisplay").appendChild(tempTextArea);

  // Add click event listener to copy button
  // Create a temporary textarea element to hold the JSON string
  // const tempTextArea = document.createElement("textarea");
  // tempTextArea.value = jsonString;

  // Append the textarea to the document body and select its contents
  // document.body.appendChild(tempTextArea);
  // tempTextArea.select();

  // Execute the copy command
  // document.execCommand("Copy");

  // Remove the temporary textarea
  // document.body.removeChild(tempTextArea);

  // Optionally, provide visual feedback that the copy operation was successful
  // setTimeout(() => {
  //   copyButton.innerText = "Copy";
  // }, 1000);

  // Add the copy button to the document
  // jsonDisplay.appendChild(copyButton);
}
const copyButton = document.getElementById("getText");

copyButton.addEventListener("click", () => {
  if (document.getElementById("textArea"))
    navigator.clipboard
      .writeText(document.getElementById("textArea").value)
      .then(() => {
        console.log("Text copied to clipboard");
        copyButton.innerText = "Copied!";
      })
      .catch((error) => {
        console.error("Error in copying text: ", error);
      });
});

function colorChange(e) {
  thisDiv = e.target.id;
  console.log(thisDiv);
  thisDiv = document.getElementById(thisDiv);
  if (
    thisDiv.style.backgroundColor == defaultHEX ||
    thisDiv.style.backgroundColor == defaultRGB
  ) {
    console.log(thisDiv.style.backgroundColor + "change");
    thisDiv.style.backgroundColor =
      document.getElementById("colorPicker").value;
    //   document.getElementById("colorPicker").color;
  } else {
    console.log(thisDiv.style.backgroundColor + "backToNormal");
    thisDiv.style.backgroundColor = defaultRGB;
  }
  const copyButton = document.getElementById("getText");
  if (copyButton.innerText == "Copy" || copyButton.innerText == "Copied!") {
    copyButton.innerText = "Update";
  }
}
document.getElementById("getText").addEventListener("click", getText);
let num = 0;
function getText() {
  // console.log("here");
  // if (num == 0) {
  //   num++;
  updateJsonDisplay();
  // }
}
