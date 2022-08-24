import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import {
    brownCards,
    blueCards,
    greenCards
  } from './data/mythicCards/index.js';

const state = {
    difficulty: null,
    ancientCard: null,
    greenCardsStack: [],
    blueCardsStack: [],
    brownCardsStack: [],
};
const ancientsContainer = document.querySelector('.ancients-container');
const difficultyContainer = document.querySelector('.difficulty-container');
const firstStageContainer = document.getElementById('firstStageContainer');
const secondStageContainer = document.getElementById('secondStageContainer');
const thirdStageContainer = document.getElementById('thirdStageContainer');
const stack = document.querySelector('.deck');
const lastCard = document.querySelector('.last-card');


ancientsContainer.onclick = function (event) {
    let target = event.target;
    let ancientId = target.id;
    if(!ancientId){
        return
    }
    state.ancientCard = ancientsData.find( card => card.id === ancientId);
   
};

difficultyContainer.onclick = function (event) {
    let target = event.target;
    let difficultyId = target.id;
    if(!difficultyId){
        return
    }
    state.difficulty = difficulties.find( item => item.id === difficultyId);
    showStageNumbers (firstStageContainer, state.ancientCard.firstStage);
    showStageNumbers (secondStageContainer, state.ancientCard.secondStage);
    showStageNumbers (thirdStageContainer, state.ancientCard.thirdStage);
    getCardsForState ()
};

function showStageNumbers (stageContainer, stage){
    stageContainer.querySelector('.green').textContent = stage.greenCards;
    stageContainer.querySelector('.brown').textContent = stage.brownCards;
    stageContainer.querySelector('.blue').textContent = stage.blueCards;
}

stack.addEventListener('click', takeCard);

function takeCard(){
    let number = getRandomNum(2);
    if()

    lastCard.style['background-image'] = 'url(./assets/MythicCards/blue/blue1.png)'
}

function getRandomNum(max) {
    let result = 0;
    let min = Math.ceil(1);
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
};

function getCardsForState (){
    state.greenCardsStack = getCardsForStages ('greenCards');
    state.blueCardsStack = getCardsForStages ('blueCards');
    state.brownCardsStack = getCardsForStages ('brownCards');
}

function getCardsForStages (colorOfCards){
    let colorCards;
    if(colorOfCards === 'greenCards'){
        colorCards = greenCards
    } else  if(colorOfCards === 'blueCards'){
        colorCards = blueCards
    } else {
        colorCards = brownCards
    }
    
    let cardsForStages = getCardsForTypes (state.difficulty.cardTypes, colorCards);
    let NumberOfColorCards = getNumberOfColorCards (colorOfCards);
    if(cardsForStages.length < NumberOfColorCards){
        let additionalNumber = NumberOfColorCards - cardsForStages.length;
        let additionalNumberOfColorCards = shuffle(getCardsForTypes (state.difficulty.additionalCardTypes, colorCards));
        cardsForStages = shuffle(cardsForStages.concat(additionalNumberOfColorCards.slice(0, additionalNumber)));
    } else {
        cardsForStages = shuffle(cardsForStages).slice(0, NumberOfColorCards);
    }
    return cardsForStages;
}

function getNumberOfColorCards (colorOfCards){
    let numberOfStageCards = state.ancientCard.firstStage[colorOfCards] + state.ancientCard.secondStage[colorOfCards] + state.ancientCard.thirdStage[colorOfCards];
    return numberOfStageCards
};

function getCardsForTypes (cardTypes, colorCards){
    let arrOfColorCards = [];
    let arrOfColorCards1 = [];
    for (let i = 0; i < cardTypes.length; i++){
        arrOfColorCards1 = colorCards.filter( card => card.difficulty === cardTypes[i]);
        arrOfColorCards = arrOfColorCards.concat(arrOfColorCards1);
    }
    return arrOfColorCards
};
