import React, { useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { useState } from "react";
import style from './stack-page.module.css'
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import Stack from "../data-structures/Stack";

interface ICharState {
  char: string;
  state: ElementStates;
};

export const StackPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [update, setUpdate] = useState<number>(0);
  const [chars, setChars] = useState<ICharState[]>([]);
  const stackRef = useRef(new Stack<ICharState>())
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      setInputText(newText);
      setEmptyInput(!newText);
  };


  const hadnleAddChar = () => {
    if (inputText) {
    const newChar = { char: inputText, state: ElementStates.Changing };
    stackRef.current.push(newChar);
    setChars(stackRef.current.getItems())
    setEmptyInput(true);
    setTimeout(() => {
      const itemsCopy = [...stackRef.current.getItems()];
      itemsCopy[itemsCopy.length - 1].state = ElementStates.Default; 
      setChars(itemsCopy);
    }, 500);
    setInputText('');
    
  } else {
    return;
    }
  };


 const handleDeleteChar = () => {
  const itemsCopy = [...stackRef.current.getItems()];
  itemsCopy[itemsCopy.length - 1].state = ElementStates.Changing;
  setChars(itemsCopy);
  setLoading(true)
  setTimeout(() => {
    stackRef.current.pop();
    setChars(stackRef.current.getItems());
    setUpdate(update + 1);
    setLoading(false);
  }, 500);
 };

 const hadnleClearStack = () => {
  stackRef.current.clear();
  setChars([]);
 }

  return (
    <SolutionLayout title="Стек">
      <div className={style.stack_page}>
      <div className={style.stack_container}>
        <div className={style.input_container}>
        <Input type="text" 
            maxLength={4} 
            isLimitText={true}
            value={inputText}
            onChange={inputData}
            />
     <Button text="Добавить" type="button" onClick={hadnleAddChar} disabled={emptyInput} />
     <Button text="Удалить" type="button" isLoader={loading} onClick={handleDeleteChar} disabled={chars.length === 0} />
     </div>
     <div className={style.clear_button}>
     <Button text="Очистить" type="button" onClick={hadnleClearStack} disabled={chars.length === 0 || loading} />
     </div>
     </div>
     <div className={style.text_display}>
      {chars.map((item, index) => (
        <div key={index} className={style.dispalay_stack}>
        {index === chars.length - 1 && <p className={style.top_item}>Top</p> }
        <Circle  letter={item.char} state={item.state} />
        <p  className={style.char_index}>{index}</p>
        </div>
      ))}
     </div>
     </div>
    </SolutionLayout>
  );
};
