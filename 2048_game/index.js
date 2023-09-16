import Grid from "./Grid.js"
import Tile from "./Tile.js"

const gameBoard=document.getElementById('game-board')


const grid= new Grid(gameBoard)


grid.randomEmptyCells().tile= new Tile(gameBoard)
grid.randomEmptyCells().tile= new Tile(gameBoard)

//move

setUpInput()

function setUpInput(){
    window.addEventListener('keydown',handleInput,{once:true})
}

async function handleInput(e){
    switch(e.key){
        case 'ArrowUp':
            await moveUp()
            break;
        case 'ArrowDown':
            await moveDown()
            break;
        case 'ArrowLeft':
            await moveLeft()
            break;
        case 'ArrowRight':
            await moveRight()
            break;
        default:
            await setUpInput();
            break;
    }

    grid.cells.forEach(cell=>cell.mergeTiles())
    const newTile=new Tile(gameBoard)
    grid.randomEmptyCells().tile=newTile
    setUpInput()
}

function moveUp(){
    // console.log(grid.cellsByColumn);
    slideTiles(grid.cellsByColumn);
}
function moveDown(){
    // console.log(grid.cellsByColumn);
    slideTiles(grid.cellsByColumn.map(columns=>[...columns].reverse()));
}
function moveLeft(){
    // console.log(grid.cellsByColumn);
    slideTiles(grid.cellsByRow);
}
function moveRight(){
    // console.log(grid.cellsByColumn);
    slideTiles(grid.cellsByRow.map(row=>[...row].reverse()));
}


function slideTiles(cells){
    return Promise.all(
    cells.flatMap(group => {
        const promises=[]
        for(let i=0;i<group.length;i++){
            const cell=group[i]
            if(cell.tile==null) continue;
            let lastValidCell
            for(let j=i-1;j>=0;j--){
                const moveToCell=group[j]
                if(!moveToCell.canAccept(cell.tile)) break;
                    lastValidCell=moveToCell;
            }
            if(lastValidCell!=null){
                promises.push(cell.tile.waitForTransition())
                if(lastValidCell.tile!=null){
                    lastValidCell.mergeTile=cell.tile;
                }else{
                    lastValidCell.tile=cell.tile
                }
                cell.tile=null
            }
        }
        return promises
    }));
}
