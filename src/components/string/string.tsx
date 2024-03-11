import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import style from "./string.module.css"
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export interface ICharState {
  char: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chars, setChars] = useState<ICharState[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoading) {
      const newText = e.target.value;
      setInputText(newText);
      setChars(newText.split('').map(char => ({ char, state: ElementStates.Default })));
    }
  };

  const reverseString = () => {
    setIsLoading(true);
    let newChars = chars.map(char => ({ ...char, state: ElementStates.Default })); 
  
    const startSwap = (start: number, end: number) => {
      [newChars[start], newChars[end]] = [{ ...newChars[end], state: ElementStates.Modified }, { ...newChars[start], state: ElementStates.Modified }];
    };
  
    const animateSwap = (start: number, end: number) => {
      if (start >= end) {
        if (start === end) {
          newChars[start].state = ElementStates.Modified
        }
        setChars([...newChars]);
        setIsLoading(false);
        return;
      }
  
      newChars[start].state = ElementStates.Changing;
      newChars[end].state = ElementStates.Changing;
      setChars([...newChars]);
  
      setTimeout(() => {
        startSwap(start, end);
        setChars([...newChars]);
  
        setTimeout(() => {
          animateSwap(start + 1, end - 1);
        }, 1000);
      }, 1000);
    };
  
    animateSwap(0, newChars.length - 1);
  };
  return (
    <SolutionLayout title="Строка">
      <div className={style.string_container}>
        <div className={style.input_display}>
        <div className={style.input_container}>
        <Input type="text" 
            maxLength={11} 
            isLimitText={true}
            value={inputText}
            onChange={handleInputChange}
            />
     </div>
     <Button text="Развернуть" type="button" disabled={inputText === ''} onClick={reverseString} isLoader={isLoading}></Button>
     </div>
     <div className={style.text_display}>
      {chars.map((item, index) => (
        <Circle key={index} letter={item.char} state={item.state} />
      ))}
     </div>
     </div>
    </SolutionLayout>
  );
};
