class Player {
  constructor(name,color, rows, cols) {
    this.name = name;
    this.color = color;
    this.regionMatrix = this.initializeRegionMatrix(rows, cols);
  }

  initializeRegionMatrix(rows, cols) {
    // Create a 2D array to represent the region matrix
    const matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
      matrix[i] = new Array(cols).fill(null);
    }
    return matrix;
  }

  getColor(){
    return this.color;
  }

  getName(){
    return this.name;
  }

  getRows() {
    return this.regionMatrix.length;
  }
  getCols() {
    return this.regionMatrix[0].length;
  }


  setRegion(row, col, regionName) {
    // Set the region at the specified row and column
    if (
      row >= 0 &&
      row < this.regionMatrix.length &&
      col >= 0 &&
      col < this.regionMatrix[0].length
    ) {
      this.regionMatrix[row][col] = regionName;
    } else {
      console.error("Invalid row or column index.");
    }
  }

  getRegion(row, col) {
    // Get the region at the specified row and column
    if (
      row >= 0 &&
      row < this.regionMatrix.length &&
      col >= 0 &&
      col < this.regionMatrix[0].length
    ) {
      return this.regionMatrix[row][col];
    } else {
      console.error("Invalid row or column index.");
      return null;
    }
  }
}
export default Player;
