import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS, delay } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";

export const bubbleSort = async (
  arr: number[],
  direction: "По возрастанию" | "По убыванию" | null,
  setCurrentIndexes: (indexes: number[]) => void,
  setSortedIndexes: (callback: (prevIndexes: number[]) => number[]) => void,
  setArray: (newArray: number[]) => void,
  delay: (ms: number) => Promise<void>
) => {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setCurrentIndexes([j, j + 1]);
      await delay(DELAY_IN_MS);
      if (
        direction === "По возрастанию"
          ? arr[j] > arr[j + 1]
          : arr[j] < arr[j + 1]
      ) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await delay(DELAY_IN_MS);
      }
    }
    setSortedIndexes((prev: any) => [...prev, n - i - 1]);
  }
};

export const selectionSort = async (
  arr: number[],
  direction: "По возрастанию" | "По убыванию" | null,
  setCurrentIndexes: (index: number[]) => void,
  setSortedIndexes: (callback: (prevIndex: number[]) => number[]) => void,
  setArray: (newArray: number[]) => void,
  delay: (ms: number) => Promise<void>
) => {
  let arrayLength = arr.length;
  let finalSortedIndexes: number[] = [];

  for (let i = 0; i < arrayLength - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arrayLength; j++) {
      setCurrentIndexes([minIndex, j]);
      await delay(DELAY_IN_MS);
      if (
        direction === "По возрастанию"
          ? arr[j] < arr[minIndex]
          : arr[j] > arr[minIndex]
      ) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
    }
    finalSortedIndexes.push(i);
    setSortedIndexes(() => [...finalSortedIndexes]);
  }
  finalSortedIndexes.push(arrayLength - 1);
  setSortedIndexes(() => [...finalSortedIndexes]);
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sortMethod, setSortMethod] = useState<"Выбор" | "Пузырёк">("Выбор");
  const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
  const [sortedIndexes, setSortedIndexes] = useState<number[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [direction, setDirection] = useState<
    "По возрастанию" | "По убыванию" | null
  >(null);
  // const [direction, setDirection] = useState<
  //   "По возрастанию" | "По убыванию" | null
  // >(null);

  const generateRandomArr = (
    minLength: number = 3,
    maxLength: number = 6,
    maxValue: number = 100
  ) => {
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return Array.from({ length }, () =>
      Math.floor(Math.random() * (maxValue + 1))
    );
  };

  useEffect(() => {
    const newArr = generateRandomArr();
    setArray(newArr);
  }, []);

  const hadnleSortMethodChange = (method: "Выбор" | "Пузырёк") => {
    setSortMethod(method);
    setCurrentIndexes([]);
    setSortedIndexes([]);
  };

  const handleSort = async (
    direction: "По возрастанию" | "По убыванию" | null
  ) => {
    setIsCalculating(true);
    if (sortMethod === "Пузырёк") {
      setDirection(direction);
      await bubbleSort(
        [...array],
        direction,
        setCurrentIndexes,
        setSortedIndexes,
        setArray,
        delay as (ms: number) => Promise<void>
      );
    } else if (sortMethod === "Выбор") {
      setDirection(direction);
      await selectionSort(
        [...array],
        direction,
        setCurrentIndexes,
        setSortedIndexes,
        setArray,
        delay as (ms: number) => Promise<void>
      );
    }
    setDirection(null);
    setIsCalculating(false);
  };

  const handleNewArray = () => {
    const newArr = generateRandomArr();
    console.log(newArr);
    setArray(newArr);
    setCurrentIndexes([]);
    setSortedIndexes([]);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.sorting_container}>
        <div className={style.button_container}>
          <div className={style.radio_container}>
            <RadioInput
              label="Выбор"
              checked={sortMethod === "Выбор"}
              onChange={() => hadnleSortMethodChange("Выбор")}
            />
            <RadioInput
              label="Пузырёк"
              checked={sortMethod === "Пузырёк"}
              onChange={() => hadnleSortMethodChange("Пузырёк")}
            />
          </div>
          <div className={style.sort_container}>
            <Button
              sorting={Direction.Ascending}
              text="По возрастанию"
              onClick={() => handleSort("По возрастанию")}
              isLoader={direction === "По возрастанию"}
              disabled={direction === "По убыванию" || isCalculating}
            />
            <Button
              sorting={Direction.Descending}
              text="По убыванию"
              onClick={() => handleSort("По убыванию")}
              isLoader={direction === "По убыванию"}
              disabled={direction === "По возрастанию" || isCalculating}
            />
          </div>
          <Button
            text="Новый массив"
            onClick={handleNewArray}
            disabled={isCalculating}
          />
        </div>
        <div className={style.array_container}>
          {array.map((value, index) => (
            <Column
              key={index}
              index={value}
              state={
                sortedIndexes.includes(index)
                  ? ElementStates.Modified
                  : currentIndexes.includes(index)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};

// const handleSort = async (direction: "По возрастанию" | "По убыванию") => {
//   setIsCalculating(true);
//   setDirection(direction);
//   setCurrentIndexes([]);
//   setSortedIndexes([]);
//   if (sortMethod === "Выбор") {
//     await selectionSort([...array], direction);
//   } else if (sortMethod === "Пузырёк") {
//     await bubbleSort([...array], direction);
//   }
//   setIsCalculating(false);
//   setDirection(null);
// };

// const bubbleSort = async (
//   arr: number[],
//   direction: "По возрастанию" | "По убыванию"
// ) => {
//   let n = arr.length;
//   let change;
//   do {
//     change = false;
//     for (let i = 0; i < n - 1; i++) {
//       setCurrentIndexes([i, i + 1]);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       if (
//         (direction === "По возрастанию" && arr[i] > arr[i + 1]) ||
//         (direction === "По убыванию" && arr[i] < arr[i + 1])
//       ) {
//         [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
//         change = true;
//         setArray([...arr]);
//       }
//     }
//     setSortedIndexes((prev) => [...prev, n - 1]);
//     n--;
//   } while (change);
//   setSortedIndexes(Array.from(Array(arr.length).keys()));
//   setCurrentIndexes([]);
// };
// const selectionSort = async (
//   arr: number[],
//   direction: "По возрастанию" | "По убыванию"
// ) => {
//   let n = arr.length;
//   for (let i = 0; i < n - 1; i++) {
//     let minIndex = i;
//     setSortedIndexes((prev) => [...prev, i]);
//     for (let j = i + 1; j < n; j++) {
//       setCurrentIndexes([minIndex, j]);
//       await delay(DELAY_IN_MS);
//       if (
//         direction === "По возрастанию"
//           ? arr[j] < arr[minIndex]
//           : arr[j] > arr[minIndex]
//       ) {
//         minIndex = j;
//       }
//     }
//     if (minIndex !== i) {
//       [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
//       setArray([...arr]);
//       setSortedIndexes((prev) => [...prev, i]);
//     } else {
//       setSortedIndexes((prev) => [...prev, i]);
//     }
//   }
//   setCurrentIndexes([]);
//   setSortedIndexes(Array.from(Array(n).keys()));
// };
