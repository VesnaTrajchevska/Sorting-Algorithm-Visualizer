import { bubbleVisualizer,
         selectionVisualizer,
         insertVisualizer,
         quickVisualizer,
         mrVisualizer } from "../visualizers/visualizers";

const swap = (list, a, b) => {
    let temp = list[a];
    list[a] = list[b];
    list[b] = temp;
}

//Bubble Sort
const bubbleSort = (list, selectedSize, selectedSpeed) => {
    const tempList = [...list];
    let animations = [];

    //fill animations
    bubbleSortHelper(tempList, selectedSize, animations);
    //display animations
    bubbleVisualizer(animations, selectedSpeed, tempList);
}
const bubbleSortHelper = (array, selectedSize, animations) => {
    for (let i = 0; i < selectedSize; i++) {
        let swapped = false;

        for (let j = 0; j < selectedSize - i; j++) {
            let animation = {};
            animation.compare = [j, j + 1];
            animation.swap = [];

            if (array[j] > array[j + 1]) {
                animation.swap = [j, j + 1];
                
                swap(array, j, j+1);
                swapped = true;
            }

            animations.push(animation);
        }

        if (swapped == false)
        break;
    }
};

//Selection Sort
const selectionSort = (list, selectedSpeed, selectedSize) => {
    const tempList = [...list];
    let animations = selectionSortHelper(tempList,selectedSize);

    selectionVisualizer(animations, selectedSpeed);
}
const selectionSortHelper = (list, selectedSize) => {
    let animations = [];
    for (let i = 0; i < selectedSize; i++) {
        let minIx = i;
        

        for (let j = i + 1; j < selectedSize; j++) {
            let animation = {};
            animation.compare = [minIx,j];
            animation.swap = [];
            animations.push(animation);

            if (list[minIx] > list[j]){
                minIx = j;
            }    
        }
        swap(list, i, minIx);
        let animation = {};
        animation.compare = [i,minIx];
        animation.swap = [i,minIx];
        animations.push(animation);
    }

    return animations;
}

//Insertion Sort
const insertionSort = (list, selectedSize, selectedSpeed) => {
    let tempList = [...list];
    let animations = [];

    insertionSortHelper(tempList, selectedSize, animations);
    insertVisualizer(animations, selectedSpeed);
}
const insertionSortHelper = (array, selectedSize, animations) => {
    for (let i = 1; i < selectedSize; i++) {  
        let key = array[i];  
        let j = i - 1;  
        let animated = false;
        
        while (j >= 0 && array[j] > key) 
            {
                let animation = {};
                animation.swap = [j,j + 1];
                animations.push(animation);
                animated = true;

                array[j + 1] = array[j];  
                j = j - 1;  
        }
        
        if(!animated){
            let animation = {};
            animation.swap = [i,i];
            animations.push(animation);
        }
        array[j + 1] = key;  
    }  
}

//Quick Sort
const quickSort = (list, left, selectedSize, selectedSpeed) => {
    let animations = [];
    let tempList = [...list];

    quickSortHelper(animations, tempList, left, selectedSize);
    quickVisualizer(animations, selectedSpeed, tempList);
    
}
const quickSortHelper = (animations, arr, left, right) => {
    if (left > right) {
        return;
    }

    let pi = partition(animations,arr,left,right);

    quickSortHelper(animations, arr, left, pi-1);
    quickSortHelper(animations, arr, pi+1, right);
}
const partition = (animations, array, left, right) => {
    let pivot = array[right];
    let i = left-1;
    
    for(let j = left; j <= right-1; j++){
        let animation = {};
        animation.compare = [j, right];
        animation.swap = [];
        animation.pivot = false;

        if (array[j] < pivot) {
            i++;
            swap(array, i, j);
            animation.swap = [i, j];
        }

        animations.push(animation);
    }

    swap(array, i+1, right);

    let animation = {};
    animation.compare = [i+1, right];
    animation.swap = [i+1, right];
    animation.pivot = true;

    animations.push(animation);

    return i+1;
}

//Merge Sort
const mergeSort = (list, left, selectedSize, selectedSpeed) => {
    const tempList = [...list];
    let animations = [];

    mergeSortHelper(tempList, left, selectedSize, animations);
    mrVisualizer(animations, selectedSpeed, tempList);
}
const mergeSortHelper = (array, startIdx, endIdx, animations) => {
    if (startIdx === endIdx) {
        return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);

    mergeSortHelper(array, startIdx, middleIdx, animations);
    mergeSortHelper(array, middleIdx + 1, endIdx, animations);

    merge(array, startIdx, middleIdx, endIdx, animations);
  }
const merge = (array, startIdx, middleIdx, endIdx, animations ) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    let sortedArray = [...array];

    while (i <= middleIdx && j <= endIdx) {
        let animation = {};
        animation.compare = [i, j];
        animation.swap = [];

        if (sortedArray[i] <= sortedArray[j]) {
            animation.swap = [k, sortedArray[i]];
            animations.push(animation);

            array[k++] = sortedArray[i++];
        } else {
            animation.swap = [k, sortedArray[j]];
            animations.push(animation);

            array[k++] = sortedArray[j++];
        }
    }

    while (i <= middleIdx) {
      let animation = {};
      animation.compare = [i, i];
      animation.swap = [k, sortedArray[i]];
      animations.push(animation);
      array[k++] = sortedArray[i++];
    }

    while (j <= endIdx) {
      let animation = {};
      animation.compare = [j, j];
      animation.swap = [k, sortedArray[j]];
      animations.push(animation);
      array[k++] = sortedArray[j++];
    
    }
}

//Radix sort
const radixSort = (list, selectedSpeed) => {
    let tempList = [...list];
    let animations = [];

    radixSortHelper(tempList, animations);
    mrVisualizer(animations, selectedSpeed, tempList);
}
const radixSortHelper = (array, animations) => {
    const maxNumber = getMax(array);
    let sortedArray = [...array];
    let prevArray = [...array];
    
        for (let exp = 1; Math.floor(maxNumber / exp) > 0; exp *= 10) {
        sortedArray = countSort(sortedArray, exp);

        for (let j = 0; j < sortedArray.length; j++) {
            let animation = {};
            animation.compare = [j, prevArray.indexOf(sortedArray[j])];
            animation.swap = [];
            if (prevArray[j] != sortedArray[j]) {
                animation.swap = [j, sortedArray[j]];
            }

            animations.push(animation);
        }

        prevArray = [...sortedArray];
    }
    
    for (let i = 0; i < sortedArray.length; i++) {
        array[i] = sortedArray[i];
    }
}
const countSort = (array, exp) => {
    const length = array.length;
    let outputArray = Array(length);
    let count = Array(10).fill(0, 0);
    
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(array[i] / exp) % 10;
        count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = length - 1; i >= 0; i--) {
        const digit = Math.floor(array[i] / exp) % 10;

        outputArray[count[digit] - 1] = array[i];
        count[digit]--;
    }
        
    return outputArray;
}
      
const getMax = (array) => {
    let max = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
        max = array[i];
        }
    }

    return max;
}

export { bubbleSort,
         selectionSort,
         insertionSort,
         quickSort, 
         mergeSort, 
         radixSort };