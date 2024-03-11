import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './queue-page.module.css'
import { useState, useRef } from "react";
import { ICharState } from "../string/string";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import Queue from "../data-structures/Queue";

const startingQueue = 6;
const emptyCircles = { char: '', state: ElementStates.Default }

export const QueuePage: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [queue, setQueue] = useState<ICharState[]>(Array(startingQueue).fill(emptyCircles));
  const queueRef = useRef(new Queue<ICharState>());
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [emptyQueue, setEmptyQueue] = useState<boolean>(true);

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      setInputText(newText);
      setEmptyInput(!newText);
  };
  const handleAddChar = () => {
    if (queueRef.current.getItems().length < startingQueue) {
      const newChar = { char: inputText, state: ElementStates.Changing };
      queueRef.current.enqueue(newChar);
      setEmptyQueue(false);
      updateQueueState(true); 
      setTimeout(() => {
        updateQueueState(); 
        setInputText('');
        setEmptyInput(true)
      }, 500);
    }
  };
  
  const handleRemoveChar = () => {
    if (queueRef.current.getItems().length > 0) {
      queueRef.current.dequeue();
      updateQueueState(false, true); 
      setTimeout(() => {
        updateQueueState(); 
        setEmptyQueue(queueRef.current.getItems().length === 0);
      }, 500);
    }
  };
  
  const updateQueueState = (highlightAdd = false, highlightRemove = false) => {
    const deletedCount = queueRef.current.getDeletedCount();
    const items = queueRef.current.getItems();
    const newQueueState = Array(startingQueue).fill(emptyCircles).map((_, index) => {
      if (highlightAdd && index - deletedCount === items.length - 1) {
        return { ...items[index - deletedCount], state: ElementStates.Changing };
      } else if (highlightRemove && index === deletedCount - 1) {
        return { ...items[index - deletedCount], state: ElementStates.Changing };
      } else {
        const item = items[index - deletedCount];
        return item ? { ...item, state: ElementStates.Default } : emptyCircles;
      }
    });
    setQueue(newQueueState);
  };
  const handleClearQueue = () => {
    queueRef.current.clear();
    setQueue(Array(startingQueue).fill(emptyCircles));
    setEmptyQueue(true);
  };

  return (
    <SolutionLayout title="Очередь">
<div className={style.stack_page}>
      <div className={style.stack_container}>
        <div className={style.input_container}>
        <Input type="text" 
            maxLength={4} 
            isLimitText={true}
            value={inputText}
            onChange={inputData}
            />
     <Button text="Добавить" type="button" onClick={handleAddChar} disabled={emptyInput} />
     <Button text="Удалить" type="button" onClick={handleRemoveChar} disabled={emptyQueue}/>
     </div>
     <div className={style.clear_button}>
     <Button text="Очистить" type="button" onClick={handleClearQueue} disabled={emptyQueue} />
     </div>
     </div>
     <div className={style.text_display}>
     {queue.map((item, index) => (
          <div key={index}>
      {index === queue.findIndex(item => item.char !== '') && <p className={style.head_label}>Head</p>}
      <Circle letter={item.char} state={item.state} />
      {index === queue.length - 1 - queue.slice().reverse().findIndex(item => item.char !== '') && <p className={style.tail_label}>Tail</p>}
          </div>
        ))}
     </div>
     </div>
    </SolutionLayout>
  );
};
