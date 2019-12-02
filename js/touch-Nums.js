'use strict'

var gTableSize = +prompt("enter number of rows");
var gBoardCellNum = gTableSize * gTableSize;
var gNums = createNumsArr(gBoardCellNum);
var gElTable = document.querySelector('.numTable');
var gcounter = 0;
var gCurrNumTofind = 0;
var gIsStart = false;
var gInterval;
var gMil = 0;
var gSec = 0;
var gMin = 0;



function init() {
    createtable();
    nextNumberRender();
}

function timer() {
    var milElement = document.querySelector('.mil');
    var secElement = document.querySelector('.sec');
    var minElement = document.querySelector('.min');

    gMil++;
    if (gMil < 10) {
        gMil = '0' + gMil;
    }
    milElement.innerText = gMil;
    if (gMil === 99) {
        gMil = 0;
        gSec++;
        if (gSec < 10) {
            gSec = '0' + gSec;
        }
        secElement.innerText = gSec;
        if (gSec === 59) {
            gSec = 0;
            gMin++;
            if (gMin < 10) {
                gMin = '0' + gMin;
            }
            minElement.innerText = gMin;
        }
    }
}

function nextNumberRender() {
    gCurrNumTofind++;
    var strHTML = '';
    var elNextNumberText = document.querySelector('.next-number');
    strHTML = `Next number: ${gCurrNumTofind}`;
    elNextNumberText.innerText = strHTML;
}

function createtable() {
    var strHTML = '';
    for (var i = 0; i < gTableSize; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gTableSize; j++) {
            var tempNum = gNums.pop();
            strHTML += `<td onclick="cellClicked(this,${tempNum})">${tempNum}</td>`
        }
        strHTML += `</tr>`
    }
    gElTable.innerHTML = strHTML;
}

function cellClicked(clickedNum, tempNum) {
    if (!gIsStart) {
        gInterval = setInterval(timer, 10);
        gIsStart = true;
    }
    if (tempNum - 1 === gcounter) {
        clickedNum.classList.add('success');
        nextNumberRender();
        gcounter++;
    }
    if (gcounter === gBoardCellNum) {
        gameover();
    }
}

function createNumsArr(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr[i] = i + 1;
    }
    shuffle(arr)
    return arr;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randogMindex;
    while (0 !== currentIndex) {
        randogMindex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randogMindex];
        array[randogMindex] = temporaryValue;
    }
    return array;
}

function gameover() {
    clearInterval(gInterval);
}