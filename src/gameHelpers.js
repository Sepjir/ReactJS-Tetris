export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for(let y = 0; y < player.tetromino.length; y += 1) {
        for(let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1. Chequear que estamos en el tetromino
            if(player.tetromino[y][x] !== 0) {
                if(
                // 2. Chequear que nuestro movimiento está en el juego altura (y)
                // No deberíamos tocar el final del area
                !stage[y + player.pos.y + moveY] ||
                // 3. chequear que nuestro movimiento está en el area de ancho (x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                // 4. chequear que en la celda que nos movemos no está vacia
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
}