import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css"
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

interface IFibonacciNumber {
  value: number;
  state: ElementStates
}

export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<IFibonacciNumber[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    setInputValue(newValue);
  };

  const calculateFibonacci = () => {
    const n: number = parseInt(inputValue, 10);
    setIsLoading(true);
    let a: number = 0;
    let b: number = 1;
    const newArr: IFibonacciNumber[] = [];
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        newArr.push({ value: b, state: ElementStates.Default });
        [a, b] = [b, a + b];
        setNumbers([... newArr]);
      if (i === n - 1) {
        setIsLoading(false);
      }
      }, i * 500);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
           <div className={style.string_container}>
        <div className={style.input_display}>
        <div className={style.input_container}>
        <Input
            type='text'
            maxLength={4}
            isLimitText={true}
            onChange={handleInputChange}
            value={inputValue}
            />
     </div>
     <Button text="Рассчитать" type="button" onClick={calculateFibonacci} isLoader={isLoading} disabled={inputValue === ''} ></Button>
     </div>
     <div className={style.text_display}>
        {numbers.map((item, index) => (
          <Circle key={index} letter={item.value.toString()} state={item.state} />
        ))}
     </div>
     </div>
    </SolutionLayout>
  );
};
