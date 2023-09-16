const GridSize=4;
const CellSize=20;
const CellGap=2;


export default class Grid{
#cells
    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size",GridSize);
        gridElement.style.setProperty("--cell-size",`${CellSize}vmin`);
        gridElement.style.setProperty("--cell-gap",`${CellGap}vmin`);
        this.#cells=createCellElements(gridElement).map((cellElement,index)=>{
            return new Cell(cellElement,index%GridSize,Math.floor(index/GridSize))
        });
    }
    get cells(){
        return this.#cells
    }
    get emptyCells(){
        return this.#cells.filter(cell=>this.tile==null)
    }
    randomEmptyCells(){
        const randomIndex=Math.floor(Math.random()*this.emptyCells.length)
        return this.emptyCells[randomIndex]
    }

    get cellsByColumn(){
        // console.log(this.#cells);
        return this.#cells.reduce((cellGrid,cell)=>{
            cellGrid[cell.x]=cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y]=cell;
            return cellGrid
        },[])
    }
    get cellsByRow(){
        // console.log(this.#cells);
        return this.#cells.reduce((cellGrid,cell)=>{
            cellGrid[cell.y]=cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x]=cell;
            return cellGrid
        },[])
    }
 
}
// 
class Cell{
    #cellElement
    #x
    #y
    #tile
    #mergeTile
    constructor(cellElement,x,y){
        this.#cellElement=cellElement;
        this.#x=x;
        this.#y=y;
    }
    get tile(){
        return this.#tile
    }
    set tile(value){
        this.#tile=value;
        if(value==null) return;
        this.#tile.x=this.#x
        this.#tile.y=this.#y
    }
    get x(){
        return this.#x
    }
    get y(){
        return this.#y
    }
    canAccept(tile){
        return (this.tile==null || (this.mergeTile==null && this.tile.value===tile.value) );
    }
    mergeTiles(){
        if(this.tile==null || this.mergeTile==null) return;
        this.tile.value=this.tile.value+this.mergeTile.value;
        this.mergeTile.remove()
        this.mergeTile=null
    }
    get mergeTile(){
        return this.#mergeTile;
    }
    set mergeTile(value){
        this.#mergeTile=value;
        if(value==null) return;
        this.#mergeTile.x=this.#x
        this.#mergeTile.y=this.#y
    }
}


function createCellElements(gridElement) {
    const cells=[];
    for(let i=0;i<GridSize*GridSize;i++){
        const cell=document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        gridElement.append(cell);
    }
   return cells
}