import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './list-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { useState } from "react";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import LinkedList from "../data-structures/List";
import { useEffect } from "react";

export const getRandomInt = (minLen: number, maxLen: number) => {
  return Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
};

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState(new LinkedList<string>()); 
  const [listDisplay, setListDisplay] = useState<Array<{ value: string, state: ElementStates }>>([]);
  const [previewValue, setPreviewValue] = useState("");
  const [currentAction, setCurrentAction] = useState<
    'addHead' 
  | 'addTail' 
  | 'deleteHead'
  | 'deleteTail' 
  | 'insertAtIndex' 
  | 'deleteAtIndex' 
  | ''
  >('');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [isHeadVisible, setIsHeadVisible] = useState<boolean>(true);
  const [isTailVisible, setIsTailVisible] = useState<boolean>(true);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  const randomStarterContent = () => {
    const firstWord = '12MONTHISVERYHARDIWANNACRY';
    return firstWord.charAt(Math.floor(Math.random() * firstWord.length));
  };

  useEffect(() => {
    for (let i = 0; i < 3 ; i++) {
      list.append(randomStarterContent());
    }
    updateListDisplay();
  }, []);


  const resetState = () => {
    setPreviewValue('');
    setPreviewIndex(null);
    setInputValue('');
    setCurrentAction('');
    setInsertIndex(null);
  };


  const updateListDisplay = (changingIndices: number[] = [], modifiedIndex: number | null = null) => {
    const elements = list.toArray().map((value, index) => {
      let state = ElementStates.Default;
      if (changingIndices.includes(index)) {
        state = ElementStates.Changing;
      }
      if (index === modifiedIndex) {
        state = ElementStates.Modified;
      }
      return { value, state };
    });
    setListDisplay(elements);
  };
  
  

  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleIndexInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInsertIndex(isNaN(value) ? null : value);
}


  const handleAddToHead = () => {
    setCurrentAction('addHead');
    setPreviewIndex(0); 
    setPreviewValue(inputValue);
    setIsHeadVisible(false);
    setTimeout(() => {
        list.prepend(inputValue);
        resetState();
        setIsHeadVisible(true);
        const newDisplay = list.toArray().map((value, index) => ({
            value: value,
            state: index === 0 ? ElementStates.Changing : ElementStates.Default,
        }));
        setListDisplay(newDisplay);
        setTimeout(() => {
            newDisplay[0].state = ElementStates.Modified;
            setListDisplay([...newDisplay]);
            setTimeout(() => {
                newDisplay[0].state = ElementStates.Default;
                setListDisplay([...newDisplay]);
            }, 500); 
        }, 500); 
    }, 500); 
};

  const handleAddToTail = () => {
    setCurrentAction('addTail');
    setPreviewIndex(listDisplay.length - 1)
    setPreviewValue(inputValue); 
    setTimeout(() => {
      list.append(inputValue); 
      resetState();
      const newDisplay = list.toArray().map((value, index) => ({
        value: value,
        state: index === list.toArray().length - 1 ? ElementStates.Changing : ElementStates.Default,
      }));
      setListDisplay(newDisplay); 
      setTimeout(() => {
        if (newDisplay.length > 0) {
          newDisplay[newDisplay.length - 1].state = ElementStates.Modified; 
          setListDisplay([...newDisplay]); 
          setTimeout(() => {
            newDisplay[newDisplay.length - 1].state = ElementStates.Default; 
            setListDisplay([...newDisplay]); 
          }, 500); 
        }
      }, 500); 
    }, 500); 
  };
  
  const handleAddAtIndex = () => {
    if (insertIndex === null) return;
    setCurrentAction('insertAtIndex');
    setPreviewValue(inputValue);
    let currentIndex = 0;
    const step = () => {
      setPreviewIndex(currentIndex);
      if (currentIndex === 0) {
        setIsHeadVisible(false);
      } else {
        setIsHeadVisible(true);
      }
      if (currentIndex <= insertIndex) {
        setPreviewIndex(currentIndex);
        const changingIndex = Array.from({length: currentIndex + 1}, (_, i) => i);
        updateListDisplay(changingIndex);
        setTimeout(() => {
          if (currentIndex === insertIndex) {
            list.insertAt(inputValue, insertIndex);
            updateListDisplay([], currentIndex);
            setPreviewIndex(null)
            setTimeout(() => {
              resetState();
              updateListDisplay();
            }, 500);
          } else {
            currentIndex++;
            step();
          }
        }, 500);
      }
    };
    step();
  };
  
const handleDeleteAtIndex = () => {
  if (insertIndex === null) return; 
  setCurrentAction('deleteAtIndex');
  let currentIndex = 0;

  const step = () => {
    if (currentIndex <= insertIndex) {
      const changingIndices = Array.from({ length: currentIndex + 1 }, (_, i) => i);
      updateListDisplay(changingIndices);
      if (currentIndex === insertIndex) {
        setPreviewValue(list.toArray()[insertIndex]);
        const newDisplay = list.toArray().map((value, index) => ({
          value: index === insertIndex ? "" : value, 
          state: changingIndices.includes(index) ? ElementStates.Changing : ElementStates.Default,
        }));
        setListDisplay(newDisplay);

        const isLastElementBeingDeleted = insertIndex === list.toArray().length - 1;
        setIsTailVisible(!isLastElementBeingDeleted);
        setPreviewIndex(currentIndex)
        setTimeout(() => {
          list.deleteAt(insertIndex);
          updateListDisplay(); 
          setIsTailVisible(true); 
          resetState();
        }, 500);
      } else {
        setTimeout(() => {
          currentIndex++;
          step(); 
        }, 500);
      }
    }
  };

  step();
};

  const hadnleDeleteFromHead = () => {
    if (listDisplay.length > 0) {
      setCurrentAction('deleteHead')
      setPreviewIndex(0)
      setPreviewValue(listDisplay[0].value); 
      setTimeout(() => {
        list.deleteHead(); 
        updateListDisplay();
        resetState();
      }, 500); 
    }
  };
  
  const handleDeleteFromTail = () => {
    if (listDisplay.length > 0) {
      setPreviewIndex(listDisplay.length - 1)
      setCurrentAction('deleteTail')
      setIsTailVisible(false);
      setPreviewValue(listDisplay[listDisplay.length - 1].value);
      setTimeout(() => {
        list.deleteTail();
        resetState();
        updateListDisplay();
        setIsTailVisible(true);
      }, 500);
    }
  };


  return (
    <SolutionLayout title="Связный список">
      <div className={style.solution_container}>
      <div className={style.head_container}>
        <div className={style.input_container}>
        <Input  type='text'  maxLength={4} value={inputValue} onChange={handleInputData} isLimitText={true} />
        </div>
        <div className={style.button_container}>
        <Button extraClass={style.button_font} onClick={handleAddToHead} linkedList="small" isLoader={currentAction === 'addHead'} disabled={currentAction !== '' || inputValue === ''} text="Добавить в Head" />
        <Button extraClass={style.button_font} onClick={handleAddToTail} linkedList="small" isLoader={currentAction === 'addTail'} disabled={currentAction !== '' || inputValue === ''}  text="Добавить в Tail" />
        <Button extraClass={style.button_font} onClick={hadnleDeleteFromHead} disabled={currentAction !== ''} isLoader={currentAction === 'deleteHead'} linkedList="small" text="Удалить из Head" />
        <Button extraClass={style.button_font} onClick={handleDeleteFromTail} disabled={currentAction !== ''} isLoader={currentAction === 'deleteTail'}  linkedList="small" text="Удалить из Tail" />
        </div>
      </div>
      <div className={style.index_container}>
        <div className={style.input_container}>
        <Input type="number" isLimitText={false} onChange={handleIndexInputData} value={insertIndex !== null ? insertIndex.toString() : ''}/>
        </div>
        <div className={style.button_container}>
        <Button extraClass={style.button_font} linkedList="big" onClick={handleAddAtIndex} isLoader={currentAction === 'insertAtIndex'}  disabled={currentAction !== '' || insertIndex === null || inputValue === ''} text="Добавить по индексу"></Button>
        <Button extraClass={style.button_font} linkedList="big" onClick={handleDeleteAtIndex} isLoader={currentAction === 'deleteAtIndex'}  disabled={currentAction !== '' || insertIndex === null} text="Удалить по индексу"></Button>
        </div>
      </div>
      <div className={style.result_container}>
        
  {listDisplay.map((item, index) => (
    <div className={style.list_element} key={index}>
      <div className={style.preview_container}>
      {/* Контейнер для превью при добавлении над списком */}
      {previewIndex === index && currentAction === 'addHead' && (
        <Circle
          extraClass={style.pump}
          letter={previewValue}
          isSmall={true}
          state={ElementStates.Changing}
        />
      )  || previewIndex === index && currentAction === 'addTail' && (
        <Circle
        extraClass={style.pump} 
        letter={previewValue}
        isSmall={true}
        state={ElementStates.Changing}
      />
      ) || previewIndex === index && currentAction === 'insertAtIndex' && (
        <Circle
        extraClass={style.pump} 
        letter={previewValue}
        isSmall={true}
        state={ElementStates.Changing}
      />
      )}
      </div>
      {/* Элементы списка */}
      <div className={style.elements_container}>
      <Circle
            letter={
              (currentAction === 'deleteHead' && index === 0) || (currentAction === 'deleteTail' && index === listDisplay.length - 1)
              ? '' : item.value
            }
        state={item.state}
        head={index === 0 && isHeadVisible ? "head" : undefined}
        tail={index === listDisplay.length - 1 && isTailVisible ? "tail" : undefined}
        index={index} 
      />
      {index < listDisplay.length - 1 && <ArrowIcon />}
    </div>
    {/* Контейнер для превью при удалении под списком */}
    <div className={style.preview_container}>
    {previewIndex === index && currentAction === 'deleteHead' && (
        <Circle
          extraClass={style.pump}
          letter={previewValue}
          isSmall={true}
          state={ElementStates.Changing}
        />
    ) || previewIndex === index && currentAction === 'deleteTail' && (
      <Circle
      extraClass={style.pump}
      letter={previewValue}
      isSmall={true}
      state={ElementStates.Changing}
    />
    ) || previewIndex === index && currentAction === 'deleteAtIndex' && (
      <Circle
      extraClass={style.pump}
      letter={previewValue}
      isSmall={true}
      state={ElementStates.Changing}
    />
    )}
    </div>
    </div>
  ))}
</div>
</div>
    </SolutionLayout>
  );
};
