import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, delay } from "../../constants/delays";

interface IFibonacciNumber {
  value: number;
  state: ElementStates;
}

export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<IFibonacciNumber[]>([]);
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeactivated, setIsDeactivated] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newString: string = e.target.value;
    const newValue: number | undefined = parseInt(newString, 10);
    setInputValue(newValue);
    if (newValue > 19) {
      setIsDeactivated(true);
    } else {
      setIsDeactivated(false);
    }
  };

  const calculateFibonacci = async () => {
    const n: number | undefined = inputValue;
    setIsLoading(true);
    let a: number = 0;
    let b: number = 1;
    const newArr: IFibonacciNumber[] = [];
    if (n === undefined) return;
    for (let i = 0; i < n; i++) {
      await delay(DELAY_IN_MS);
      newArr.push({ value: b, state: ElementStates.Default });
      [a, b] = [b, a + b];
      setNumbers([...newArr]);
      if (i === n - 1) {
        setIsLoading(false);
      }
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.string_container}>
        <div className={style.input_display}>
          <div className={style.input_container}>
            <Input
              type="number"
              max={19}
              isLimitText={true}
              onChange={handleInputChange}
              value={inputValue}
            />
          </div>
          <Button
            text="Рассчитать"
            type="button"
            onClick={calculateFibonacci}
            isLoader={isLoading}
            disabled={inputValue === undefined || isDeactivated}
          ></Button>
        </div>
        <div className={style.text_display}>
          {numbers.map((item, index) => (
            <Circle
              key={index}
              letter={item.value.toString()}
              state={item.state}
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
