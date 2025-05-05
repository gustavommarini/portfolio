import { useState, useEffect } from 'react';

export const useTypewriter = (
  text: string | string[],
  delay: number = 180,
  infinite: boolean = true
) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const stringArray =
    Object.prototype.toString.call(text) === '[object Array]' ? text : [text];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (
      currentTextIndex < stringArray.length &&
      currentIndex <= stringArray[currentTextIndex].length
    ) {
      timeout = setTimeout(() => {
        setCurrentText(
          (prevText) => prevText + stringArray[currentTextIndex][currentIndex]
        );
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      setCurrentIndex(0);
      setCurrentText(' ');
      setCurrentTextIndex((prevIndex) =>
        prevIndex + 1 < stringArray.length ? prevIndex + 1 : 0
      );
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return currentText;
};
