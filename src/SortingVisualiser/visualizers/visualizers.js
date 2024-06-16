//Bubble Sort visualizer
const bubbleVisualizer = (animations, selectedSpeed, sortedList) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    let offset = 1;

    for (let i = 0; i < animations.length; i++) {
        let swapped = (animations[i].swap.length != 0);
        let compare = animations[i].compare;
        let swap = animations[i].swap;
        
        setTimeout(()=>{
            //flash green
            arrayBars[compare[0]].classList.add('compare-bar');
            arrayBars[compare[1]].classList.add('compare-bar');
            
            if (swapped) {
                    //flash red
                    arrayBars[swap[0]].classList.add('switch-bar');
                    arrayBars[swap[1]].classList.add('switch-bar');
                    //swap heights
                    let temp = arrayBars[swap[0]].style.height;
                    arrayBars[swap[0]].style.height = arrayBars[swap[1]].style.height;
                    arrayBars[swap[1]].style.height = temp;
                    //if last in traversal color green - sorted
                    if (swap[1] + offset == sortedList.length) {
                        offset++;
                        arrayBars[swap[1]].classList.add('sorted-bar');
                    } 
                //remove red
                setTimeout(()=>{
                    arrayBars[swap[0]].classList.remove('switch-bar');
                    arrayBars[swap[1]].classList.remove('switch-bar');
                }, selectedSpeed / 2);
            }

            setTimeout(()=> {
                //remove green
                arrayBars[compare[0]].classList.remove('compare-bar');
                arrayBars[compare[1]].classList.remove('compare-bar');
                
                //if last in traversal color green - sorted
                if (compare[1] + offset == sortedList.length) {
                    offset++;
                    arrayBars[compare[1]].classList.add('sorted-bar');
                } 
                //if finished sorting color all green - sorted
                if(i == animations.length-1){
                    for(let j = 0; j<arrayBars.length; j++){
                        arrayBars[j].classList.add('sorted-bar');
                    }
                }
            }, selectedSpeed / 2);
        }, i * selectedSpeed);
    }
}

//Selection Sort visualizer
const selectionVisualizer = (animations, selectedSpeed) => {
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        let swapped = (animations[i].swap.length != 0);
        let compare = animations[i].compare;
        let swap = animations[i].swap;
        
        setTimeout(()=>{
            //flash green
            arrayBars[compare[0]].classList.add('compare-bar');
            arrayBars[compare[1]].classList.add('compare-bar');

            if (swapped) {
                //flash red
                arrayBars[swap[0]].classList.add('switch-bar');
                arrayBars[swap[1]].classList.add('switch-bar');

                //swap heights
                let temp = arrayBars[swap[0]].style.height;
                arrayBars[swap[0]].style.height = arrayBars[swap[1]].style.height;
                arrayBars[swap[1]].style.height = temp;                    

                setTimeout(()=>{
                    //remove red, color green - sorted
                    arrayBars[swap[0]].classList.remove('switch-bar');
                    arrayBars[swap[0]].classList.add('sorted-bar');
                    //remove red, if finished sorting color green - sorted
                    arrayBars[swap[1]].classList.remove('switch-bar');
                    if(i == animations.length - 1){
                        arrayBars[swap[1]].classList.add('sorted-bar');
                    }
                }, selectedSpeed / 2);
            }

            setTimeout(()=> {
                //remove green
                arrayBars[compare[0]].classList.remove('compare-bar');
                arrayBars[compare[1]].classList.remove('compare-bar');
            }, selectedSpeed / 2);
        }, i * selectedSpeed);
    }
}

//Insertion Sort visualizer
const insertVisualizer = (animations, selectedSpeed) => {
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        let swap = animations[i].swap;

        setTimeout(()=>{
            //first bar is always sorted
            arrayBars[0].classList.add('sorted-bar');

            if(swap[0] == swap[1]){
                //flash green
                arrayBars[swap[0]].classList.add('compare-bar');
                arrayBars[swap[1]].classList.add('compare-bar');
            } else {
                //flash red
                arrayBars[swap[0]].classList.add('switch-bar');
                arrayBars[swap[1]].classList.add('switch-bar');
            }

            //swap heights
            let temp = arrayBars[swap[0]].style.height;
            arrayBars[swap[0]].style.height = arrayBars[swap[1]].style.height;
            arrayBars[swap[1]].style.height = temp;

            setTimeout(()=>{
                //remove red or green
                arrayBars[swap[0]].classList.remove('switch-bar', 'compare-bar');
                arrayBars[swap[1]].classList.remove('switch-bar', 'compare-bar');
                
                if(!animations[i+1] ){
                    //if done sorting color moving bar green - sorted
                    arrayBars[swap[0]].classList.add('sorted-bar');
                    arrayBars[swap[1]].classList.add('sorted-bar');
                } else if(animations[i+1].swap[0] > swap[0]){
                    //if moving bar is at corect position color both bars green - sorted
                    arrayBars[swap[0]].classList.add('sorted-bar');
                    arrayBars[swap[1]].classList.add('sorted-bar');
                }else{
                    //color moving bar - unsorted color other bar green - sorted
                    arrayBars[swap[0]].classList.remove('sorted-bar');
                    arrayBars[swap[1]].classList.add('sorted-bar');
                }
            }, selectedSpeed / 2);
        }, i * selectedSpeed);
    }
}

//Quick Sort visualizer
const quickVisualizer = (animations, selectedSpeed, sortedList) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    let pivot = sortedList.length - 1;

    for (let i = 0; i < animations.length; i++) {
        let compare = animations[i].compare;
        let swap = animations[i].swap;
        let swapped = (swap.length !== 0);
        setTimeout(()=>{   
            //make pivot blue
            arrayBars[pivot].classList.add('pivot');
            //flash green
            arrayBars[compare[0]].classList.add('compare-bar');
            arrayBars[compare[1]].classList.add('compare-bar');
            if (swapped) {
                //flash red
                arrayBars[swap[0]].classList.add('switch-bar');
                arrayBars[swap[1]].classList.add('switch-bar');
                //swap heights
                let temp = arrayBars[swap[0]].style.height;
                arrayBars[swap[0]].style.height = arrayBars[swap[1]].style.height;
                arrayBars[swap[1]].style.height = temp;             
                //if swapping pivot
                if(animations[i].pivot){
                    //remove blue from pivot
                    arrayBars[pivot].classList.remove('pivot');
                    //if next animatin exists pivot = nextanimation.compare[1]
                    if(animations[i + 1])   pivot =  animations[i + 1].compare[1];
                    //if new pivot from right sub-array 
                    //color all bars left of current pivots final spot green - sorted
                    if (pivot != swap[0]-1){
                        for(let j = swap[0] - 1; j>=0; j--){
                            arrayBars[j].classList.add('sorted-bar');
                        }
                    }
                }
                setTimeout(()=>{
                    //remove red
                    arrayBars[swap[0]].classList.remove('switch-bar');
                    arrayBars[swap[1]].classList.remove('switch-bar');
                }, selectedSpeed / 2);
            }
            setTimeout(()=> {
                //remove green
                arrayBars[compare[0]].classList.remove('compare-bar');
                arrayBars[compare[1]].classList.remove('compare-bar');
            }, selectedSpeed / 2);
            if(!animations[i+1]){
                //catch any sorted bars at the end of the array that dont get colored green
                for(let j = sortedList.length-1; j>=0; j--){
                    arrayBars[j].classList.add('sorted-bar');
                }
            }}, i  * selectedSpeed); }
    
}

//Merge Sort and Radix Sort visualizer
const mrVisualizer = (animations, selectedSpeed, sortedList) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    let lastlap = false;

    for (let i = 0; i < animations.length; i++) {
        let swapped = (animations[i].swap.length != 0);
        let compare = animations[i].compare;
        let swap = animations[i].swap;
       
        setTimeout(()=>{
            //if last lap color bar green - sorted
            if((animations.length - i) == sortedList.length){
                lastlap = true;
            }

            //flash green
            arrayBars[compare[0]].classList.add('compare-bar');
            arrayBars[compare[1]].classList.add('compare-bar');

            if (swapped) {
                //flash red
                arrayBars[swap[0]].style.height = `${swap[1]}px`;
                arrayBars[swap[0]].classList.add('switch-bar');
                setTimeout(()=>{
                    //remove red
                    arrayBars[swap[0]].classList.remove('switch-bar');
                    if(lastlap) arrayBars[swap[0]].classList.add('sorted-bar');
                }, selectedSpeed / 2);
            }

            setTimeout(()=> {
                arrayBars[compare[0]].classList.remove('compare-bar');
                arrayBars[compare[1]].classList.remove('compare-bar');
                if(lastlap){
                    arrayBars[compare[0]].classList.add('sorted-bar');
                } 
            }, selectedSpeed / 2);
        }, i * selectedSpeed);
    }
}

export { bubbleVisualizer,
         selectionVisualizer,
         insertVisualizer,
         quickVisualizer,
         mrVisualizer };
