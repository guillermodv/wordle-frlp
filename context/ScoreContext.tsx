import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScoreContext = createContext(null);

export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const storedScores = await AsyncStorage.getItem('wordle_scores');
      if (storedScores) {
        setScores(JSON.parse(storedScores));
      }
    } catch (error) {
      console.error('Error loading scores:', error);
    }
  };

  const addScore = async (username, score) => {
    try {
      const newScore = { username, score, timestamp: Date.now() };
      const updatedScores = [...scores, newScore];
      await AsyncStorage.setItem('wordle_scores', JSON.stringify(updatedScores));
      setScores(updatedScores);
    } catch (error) {
      console.error('Error adding score:', error);
    }
  };

  return (
    <ScoreContext.Provider value={{ scores, loadScores, addScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
