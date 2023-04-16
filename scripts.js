const container = document.querySelector('.sketchContainer');
const clearButton = document.querySelector('.clearAll');
const newGridButton = document.querySelector('.newGrid');
let containerGridSize = 0;

//Changes background color of square to black for hover event
function changeColor (e) {
  e.target.style.background = 'black';
}

/* Calculates height of each individual square, and then loops until the grid size passed, with each iteration making a new
row that has an individual loop creating squares which have event listeners attached for whenever the mouse passes over.
*/
function createGrid (gridSize) {
  containerGridSize = gridSize;
  const gridHeight = container.clientHeight;
  const gridSquareHeight = (gridHeight / gridSize) / 16;
  console.log(gridSquareHeight);
  
  for(let i = 0; i < gridSize; i++) {
    const newRow = document.createElement("div");
    newRow.classList.add("sketchRow");
    container.appendChild(newRow);
  
    for(let j = 0; j < gridSize; j++) {
      const newSquare = document.createElement("div");
      newSquare.classList.add("sketchSquare");
      newSquare.style.height = gridSquareHeight + "rem";
      newRow.appendChild(newSquare);
      newSquare.addEventListener('mouseover', changeColor);
    }
  }
}

//Loops through each row and removes event listeners and then squares for each row, before removing the event itself.
function clearGrid() {
  const gridRows = container.querySelectorAll('.sketchRow');
  
  gridRows.forEach(row => {
    const squares = row.querySelectorAll('.sketchSquare');
    squares.forEach(square => {
      square.removeEventListener('mouseover', changeColor);
      square.remove();
    })
    row.remove();
  });
}

createGrid(16);

//Whenever the Clear Grid button is clicked, the grid is cleared and a new one is made with the same size as before.
clearButton.addEventListener('click', () => {
  clearGrid();
  createGrid(containerGridSize);
});

/* Do-while loop which first time prompts the user for an integer between 1 to 100. If that's true, the grid is cleared and
a new one is made with the size the user gave. If the user response isn't valid, they are re-prompted to enter an integer 
until they input the correct response.
*/
function createNewGrid() {
  let gridCreated = false;
  
  do {
    let userSize = prompt('Please enter an integer from 1 to 100');
    if(userSize > 0 && userSize < 101) {
      let newGridSize = Math.floor(userSize);
      gridCreated = true;
      clearGrid();
      createGrid(newGridSize);
    }
  } while(gridCreated == false);
}

//Calls createNewGrid whenever the Create New Grid button is clicked
newGridButton.addEventListener('click', createNewGrid);