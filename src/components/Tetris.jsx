import React, {useState} from 'react';
import { createStage, checkCollision } from '../gameHelpers';

// componentes de estilo
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// hooks personalizados
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval'
import { useGameStatus } from '../hooks/useGameStatus';

//components

import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
 

  console.log('re-render')

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000)
    resetPlayer();
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const drop = () => {
    // Incrementa el nivel cuando un jugador limpia 10 filas
    if(rows > (level + 1) * 10) {
      setLevel(prev => prev +1)

      // incrementar velocidad
      setDropTime(1000/(level + 1) + 200)
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })){
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game Over
      if(player.pos.y < 1){
        console.log('Game Over!!!')
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const keyUp = ({keyCode}) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log('intervalo activado')
        setDropTime(1000/(level + 1) + 200)
      }
    }
  }

  const dropPlayer = () => {
    console.log('intervalo detenido')
    setDropTime(null)
    drop();
  }

  const move = ({ keyCode }) => {
    if(!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1)
      } else if (keyCode === 39) {
        movePlayer(1)
      } else if (keyCode === 40) {
        dropPlayer()
      } else if (keyCode === 38) {
        playerRotate(stage, 1)
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime)

  return (
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)} onKeyUp ={keyUp}>
          <StyledTetris>
            <Stage stage = {stage}/>
            <aside>
              {
                gameOver ? (
                  <>
                  <Display gameOver={gameOver} text='Juego Terminado'/>
                  <StartButton text ='¿Jugar otra vez?' callback={startGame}/>
                  </>
                  
                ) : (
                    <div>
                        <Display text ={`Puntos: ${score}`}/>
                        <Display text ={`Filas: ${rows}`}/>
                        <Display text ={`Nivel: ${level}`}/>
                        <StartButton text='Jugar' callback={startGame}/>
                    </div>

                )
              }
                
            </aside>
          </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris