import React, { useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { useState } from "react";
import style from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import Stack from "../data-structures/Stack";
import { SHORT_DELAY_IN_MS, delay } from "../../constants/delays";

interface ICharState {
  char: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [update, setUpdate] = useState<number>(0);
  const [chars, setChars] = useState<ICharState[]>([]);
  const stackRef = useRef(new Stack<ICharState>());
  const [emptyInput, setEmptyInput] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<"add" | "delete" | "clear" | null>(
    null
  );

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setEmptyInput(!newText);
  };

  const hadnleAddChar = async () => {
    setIsLoading("add");
    if (inputText) {
      const newChar = { char: inputText, state: ElementStates.Changing };
      stackRef.current.push(newChar);
      setChars(stackRef.current.getItems());
      setEmptyInput(true);
      await delay(SHORT_DELAY_IN_MS);
      const itemsCopy = [...stackRef.current.getItems()];
      itemsCopy[itemsCopy.length - 1].state = ElementStates.Default;
      setChars(itemsCopy);
      setIsLoading(null);
      setInputText("");
    } else {
      return;
    }
  };

  const handleDeleteChar = async () => {
    const itemsCopy = [...stackRef.current.getItems()];
    itemsCopy[itemsCopy.length - 1].state = ElementStates.Changing;
    setChars(itemsCopy);
    setIsLoading("delete");
    await delay(SHORT_DELAY_IN_MS);
    stackRef.current.pop();
    setChars(stackRef.current.getItems());
    setUpdate(update + 1);
    setIsLoading(null);
  };

  const hadnleClearStack = async () => {
    setIsLoading("clear");
    await delay(SHORT_DELAY_IN_MS);
    stackRef.current.clear();
    setChars([]);
    setIsLoading(null);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={style.stack_page}>
        <div className={style.stack_container}>
          <div className={style.input_container}>
            <Input
              data-testid="stack-input"
              type="text"
              maxLength={4}
              isLimitText={true}
              value={inputText}
              onChange={inputData}
            />
            <Button
              data-testid="stack-add"
              text="Добавить"
              type="button"
              onClick={hadnleAddChar}
              isLoader={isLoading === "add"}
              disabled={
                emptyInput || isLoading === "clear" || isLoading === "delete"
              }
            />
            <Button
              data-testid="stack-delete"
              text="Удалить"
              type="button"
              isLoader={isLoading === "delete"}
              onClick={handleDeleteChar}
              disabled={
                chars.length === 0 ||
                isLoading === "add" ||
                isLoading === "clear"
              }
            />
          </div>
          <div className={style.clear_button}>
            <Button
              data-testid="stack-clear"
              text="Очистить"
              type="button"
              onClick={hadnleClearStack}
              disabled={
                chars.length === 0 ||
                isLoading === "add" ||
                isLoading === "delete"
              }
              isLoader={isLoading === "clear"}
            />
          </div>
        </div>
        <div className={style.text_display}>
          {chars.map((item, index) => (
            <div key={index} className={style.dispalay_stack}>
              {index === chars.length - 1 && (
                <p className={style.top_item}>Top</p>
              )}
              <Circle letter={item.char} state={item.state} />
              <p className={style.char_index}>{index}</p>
            </div>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
