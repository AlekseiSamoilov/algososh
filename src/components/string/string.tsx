import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import style from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, delay } from "../../constants/delays";

export interface ICharState {
  char: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chars, setChars] = useState<ICharState[]>([]);

  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoading) {
      const newText = e.target.value;
      setInputText(newText);
      setChars(
        newText
          .split("")
          .map((char) => ({ char, state: ElementStates.Default }))
      );
    }
  };

  const reverseString = () => {
    setIsLoading(true);
    let newChars = chars.map((char) => ({
      ...char,
      state: ElementStates.Default,
    }));

    const startSwap = (start: number, end: number) => {
      [newChars[start], newChars[end]] = [
        { ...newChars[end], state: ElementStates.Modified },
        { ...newChars[start], state: ElementStates.Modified },
      ];
    };

    const animateSwap = async (start: number, end: number) => {
      if (start >= end) {
        if (start === end) {
          newChars[start].state = ElementStates.Modified;
        }
        if (isMounted.current) {
          setChars([...newChars]);
          setIsLoading(false);
        }

        return;
      }

      newChars[start].state = ElementStates.Changing;
      newChars[end].state = ElementStates.Changing;
      if (isMounted.current) {
        setChars([...newChars]);
      }
      await delay(DELAY_IN_MS);
      startSwap(start, end);
      if (isMounted.current) {
        setChars([...newChars]);
      }
      await delay(DELAY_IN_MS);
      animateSwap(start + 1, end - 1);
    };

    animateSwap(0, newChars.length - 1);
    if (isMounted.current) {
      setInputText("");
    }
  };

  useEffect(() => {
    console.log("Chars state updated:", chars);
  }, [chars]);

  return (
    <SolutionLayout title="Строка">
      <div className={style.string_container}>
        <div className={style.input_display}>
          <div className={style.input_container}>
            <Input
              data-testid="string-input"
              type="text"
              maxLength={11}
              isLimitText={true}
              value={inputText}
              onChange={handleInputChange}
            />
          </div>
          <Button
            data-testid="reverse-button"
            text="Развернуть"
            type="button"
            disabled={inputText === ""}
            onClick={reverseString}
            isLoader={isLoading}
          ></Button>
        </div>
        <div data-testid={"chars"} className={style.text_display}>
          {chars.map((item, index) => (
            <Circle
              data-testid={`circle-${index}`}
              key={index}
              letter={item.char}
              state={item.state}
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
