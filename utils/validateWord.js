import { DICTIONARY } from '../data/words';

export const validateWord = (word) => DICTIONARY.has(word);
