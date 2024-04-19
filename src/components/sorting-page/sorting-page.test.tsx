import { bubbleSort } from "./sorting-page";
import { selectionSort } from "./sorting-page";

// jest.useFakeTimers();

const mockSetCurrentIndexes = jest.fn();
const mockSetSortedIndexes = jest.fn();
const mockSetArray = jest.fn();
const mockDelay = jest.fn().mockResolvedValue(undefined);

describe("bubbleSort", () => {
  it("correctly handle empty array", async () => {
    const emptyArray: number[] = [];
    await bubbleSort(
      [...emptyArray],
      "По возрастанию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );
    expect(mockSetArray).not.toHaveBeenCalled;
    expect(mockSetCurrentIndexes).not.toHaveBeenCalled;
    expect(mockDelay).not.toHaveBeenCalled;
  });

  it("correctly handle array with 1 char", async () => {
    const testArray: number[] = [1];

    await bubbleSort(
      testArray,
      "По возрастанию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );

    expect(mockSetArray).not.toHaveBeenCalled;
    expect(mockSetCurrentIndexes).not.toHaveBeenCalled;
    expect(mockDelay).not.toHaveBeenCalled;
  });

  it("correctly sorts array with elements", async () => {
    const testArray: number[] = [3, 1, 4, 1, 5, 9, 2, 6];
    const expectedArrayAscending: number[] = [1, 1, 2, 3, 4, 5, 6, 9];
    const expectedArrayDescending: number[] = [9, 6, 5, 4, 3, 2, 1, 1];

    await bubbleSort(
      testArray,
      "По возрастанию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );
    expect(mockSetArray).toHaveBeenCalledWith(expectedArrayAscending);

    jest.clearAllMocks();

    await bubbleSort(
      [...testArray],
      "По убыванию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );

    expect(
      mockSetArray.mock.calls[mockSetArray.mock.calls.length - 1][0]
    ).toEqual(expectedArrayDescending);
  });
});

describe("selectionSort", () => {
  it("correctly handle empty array", async () => {
    const emptyArray: number[] = [];
    await selectionSort(
      [...emptyArray],
      "По возрастанию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );
    expect(mockSetArray).not.toHaveBeenCalled;
    expect(mockSetCurrentIndexes).not.toHaveBeenCalled;
    expect(mockDelay).not.toHaveBeenCalled;
  });

  it("correctly handle array woth one char", async () => {
    const testArray: number[] = [1];
    await selectionSort(
      [...testArray],
      "По возрастанию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );
    expect(mockSetArray).not.toHaveBeenCalled;
    expect(mockSetCurrentIndexes).not.toHaveBeenCalled;
    expect(mockDelay).not.toHaveBeenCalled;
  });

  it("correctly sorts array with elements", async () => {
    const testArray: number[] = [1, 5, 2, 4, 6, 9, 9];
    const expectedArrayAscending: number[] = [1, 2, 4, 5, 6, 9, 9];
    const expectedArrayDescending: number[] = [9, 9, 6, 5, 4, 2, 1];

    await selectionSort(
      [...testArray],
      "По возрастанию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );
    expect(mockSetArray).toHaveBeenCalledWith(expectedArrayAscending);

    jest.clearAllMocks();

    await selectionSort(
      [...testArray],
      "По убыванию",
      mockSetCurrentIndexes,
      mockSetSortedIndexes,
      mockSetArray,
      mockDelay
    );

    expect(
      mockSetArray.mock.calls[mockSetArray.mock.calls.length - 1][0]
    ).toEqual(expectedArrayDescending);
  });
});
