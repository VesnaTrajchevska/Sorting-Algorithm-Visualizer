import React, { useState } from 'react';
import './SortingVisualiser.css';
import { bubbleSort, 
         selectionSort,
         quickSort,
         insertionSort, 
         mergeSort, 
         radixSort} from './sortingAlgorithms/sortingAlgorithms';

function SortingVisualiser() {
    const algoNameSelect = ['Bubble', 'Selection', 'Insertion', 'Quick', 'Merge', 'Radix'];
    const [selectedAlgoName, setselectedAlgoName] = useState('Bubble Sort');
    
    const arraySizeSelect = [10, 50, 100, 150, 200];
    const [selectedSize, setSelectedSize] = useState(10);
    
    const speedSelect = [1000, 100, 50, 20, 10];
    const [selectedSpeed, setSelectedSpeed] = useState(1000);
    
    const handleChangeAlgo = (e) => {
        setselectedAlgoName(e.target.value);
        generateArray(selectedSize);
    }

    const handleChangeSize = (e) => {
        setSelectedSize(e.target.value);
        setSelectedSpeed(speedSelect[arraySizeSelect.indexOf(parseInt(e.target.value))]);
        generateArray(e.target.value);
    }
    
    const [list, setList] = useState([]);
    const [listIsSet, setListIsSet] = useState(false);
    
    const generateArray = (size) => {
        const array = [];
        const bars = document.querySelectorAll(".array-bar");

        for(let i = 0; i < size; i++ ){
            let number = randomFromInterval(5,500);

            if (list.includes(number)) {
                i--;
                continue;
            }

            array.push(number);

            if (bars[i]) bars[i].classList.remove('sorted-bar');
        }
    
        setList([...array]);
        setListIsSet(true);
    }
    const randomFromInterval = (min,max) => {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    if (!listIsSet) {
        generateArray(selectedSize);
    }

    const sort = () =>{
        switch (selectedAlgoName){
            case 'Bubble Sort':
                default:
                bubbleSort(list, selectedSize - 1, selectedSpeed);
                break;
            case 'Selection Sort':
                selectionSort(list, selectedSpeed, selectedSize);
                break;
            case 'Insertion Sort':
                insertionSort(list, selectedSize, selectedSpeed);
                break;
            case 'Quick Sort':
                quickSort(list, 0, selectedSize - 1, selectedSpeed);
                break;
            case 'Merge Sort':
                mergeSort(list, 0, selectedSize - 1, selectedSpeed);
                break;
            case 'Radix Sort':
                radixSort(list, selectedSpeed);
                break;   
        }
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='selects'>
                    <select value={selectedAlgoName} onChange={handleChangeAlgo}>
                        {algoNameSelect.map((current, index) => {
                            return (
                                <option key={index}>
                                    {current} Sort
                                </option>
                            )
                        })}
                    </select>
                    <select value={selectedSize} onChange={handleChangeSize}>
                        {arraySizeSelect.map((current)=>{
                            return (
                                <option key={current} value={current}>
                                    {current} elements
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className='buttons'>
                    <button onClick={() => {generateArray(selectedSize)} }>Generate new array</button>
                    <button onClick={sort}>Sort</button>
                </div>
            </div>        
            <div className='list-container'>
                {list.map((current, index) => {
                    return(
                        <div
                            key={index}
                            className='array-bar'
                            style={{height: current, width: `${100/selectedSize}%` }}></div>
                        )
                    })}
            </div>
            <div className='footer'>
                {selectedAlgoName}
            </div>
        </div>

    )
}

export default SortingVisualiser;