import { useRef, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHighScore } from '@store/game';
import { getGameStateWithRandomChar, msToSeconds } from '@utils/function';
import { GameTemplate } from '@components/templates';

export default function GameContainer() {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState(() =>
    getGameStateWithRandomChar(1),
  );
  const highScore = useSelector((store) => store.game.highScore);

  const timerRef = useRef(null);
  const gameStatus = useRef(false);

  const memoHighScoreSec = useMemo(() => msToSeconds(highScore), [highScore]);

  const onGameStart = () => {
    gameStatus.current = true;
    timerRef.current = setInterval(() => {
      setTime((t) => t + 10);
    }, 10);
  };

  const onGameStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    gameStatus.current = false;
  };

  const onKeyPress = (key) => {
    if (gameState.round <= 20 && gameState.round > 0) {
      if (gameState.round === 1 && gameStatus.current === false) {
        gameStatus.current = true;
        onGameStart();
      }
      if (gameState.round < 20) {
        if (key?.toUpperCase() === gameState.char.toUpperCase()) {
          setGameState((gs) => getGameStateWithRandomChar(gs.round + 1));
        } else {
          setTime((t) => t + 500);
        }
      }
      //  win or loose
      else if (key?.toUpperCase() === gameState.char.toUpperCase()) {
        if (time < highScore || highScore === 0) {
          setGameState({ round: 0, char: 'Success' });
          dispatch(setHighScore(time));
        } else setGameState({ round: 0, char: 'Failed' });
        onGameStop();
      } else {
        setTime((t) => t + 500);
      }
    }
  };

  const onGameReset = () => {
    onGameStop();
    setGameState(getGameStateWithRandomChar(1));
    setTime(0);
  };

  useEffect(() => () => onGameStop(), []);

  return (
    <GameTemplate
      mainText={gameState.char}
      time={time}
      highScore={memoHighScoreSec}
      onGameReset={onGameReset}
      onKeyPress={onKeyPress}
    />
  );
}
