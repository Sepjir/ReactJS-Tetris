import { useState, useEffect, useCallback, useMemo } from "react";

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0)
    const [rows, setRows] = useState(0)
    const [level, setlevel] = useState(0)


    let linePoints = useMemo(() => {}, []);
    linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        // Si hay puntos
        if(rowsCleared > 0) {
            // Así es como se calcula el puntaje en tetris

            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1))
            setRows(prev => prev + rowsCleared)

        }
    }, [level,linePoints, rowsCleared])

    useEffect(() => {
        calcScore()

    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setlevel]
}