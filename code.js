function sum(array){
    return array.reduce((acc, value) => acc += value)
}

function getTargetSumArray(targetSum, ingredients){
    return ingredients.map(i => targetSum);
}

function checkTargetSumArray(targetSumArray){
    return targetSumArray.every(sum => {
        if(!sum){
            return false;
        }
        else{
            return true;
        }
    })
}

function temp(curryArray, n, targetSumArray, curry){

    if(!checkTargetSumArray(targetSumArray)){
        return true;
    }

    if(n < 0){
        return false;
    }

    let flag = false;

    curryArray.forEach((e, i) => {
        if(!flag && (targetSumArray[i] - curryArray[n] >= 0)){

            curry[n] = i;
            targetSumArray[i] = targetSumArray[i] - curryArray[n];
            flag = temp(curryArray,
                n-1,
                targetSumArray,
                curry).flag
            targetSumArray[i] = targetSumArray[i] + curryArray[n];
        }
    });
    return curry;
}

function makeCurry(curryArray){
    let ingredients = ['P', 'Q', 'R'];
    let ingredientLength = ingredients.length;
    let curryArrayLength = curryArray.length;

    let targetSum = sum(curryArray)/ingredientLength;
    let targetSumArray = getTargetSumArray(targetSum, ingredients);

    let curry = curryArray.map(c => false)

    if(sum(curryArray)%ingredientLength !== 0){
        return 'noLuck';
    }

    let result = temp(curryArray,
        curryArrayLength - 1,
        targetSumArray,
        curry);

    console.log(result);

    if(!result.flag){
        return 'noLuck';
    }   

    let res = '';

    result.curry.forEach(c => {
        if(c == 1){
            res += 'P';
        }
        else if(c == 2){
            res += 'Q';
        }
        else{
            res += 'R';
        }
    })

    return res;

}

var curryArray = [3, 7, 2, 5 ,4];
makeCurry(curryArray);

