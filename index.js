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
    stage1Cards: [],
    stage2Cards: [],
    stage3Cards: [],
    firstStageNumbers: {},
    secondStageNumbers: {},
    thirdStageNumbers: {},
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
    lastCard.style['background-image'] = 'unset';
    ancientsContainer.querySelectorAll('.ancient-card').forEach(card => card.classList.remove("active"));
    target.classList.add("active");
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
    lastCard.style['background-image'] = 'unset';

    difficultyContainer.querySelectorAll('.difficulty').forEach(button => button.classList.remove("active"));
    target.classList.add("active");
};

function showStageNumbers (stageContainer, stage){
    stageContainer.querySelector('.green').textContent = stage.greenCards;
    stageContainer.querySelector('.brown').textContent = stage.brownCards;
    stageContainer.querySelector('.blue').textContent = stage.blueCards;
}

stack.addEventListener('click', takeCard);

function takeCard(){
    let chosenCard;
    let stageNumbersToUpdate;
    let stageContainer;
    if(state.stage1Cards.length > 0){
        chosenCard = state.stage1Cards.pop()
        stageNumbersToUpdate = state.firstStageNumbers;
        stageContainer = firstStageContainer;
    } else if(state.stage2Cards.length > 0){
        chosenCard = state.stage2Cards.pop()
        stageNumbersToUpdate = state.secondStageNumbers;
        stageContainer = secondStageContainer;
    } else if(state.stage3Cards.length > 0){
        chosenCard = state.stage3Cards.pop()
        stageNumbersToUpdate = state.thirdStageNumbers;
        stageContainer = thirdStageContainer;
    } else {
        return
    }

    if(chosenCard.color === 'green'){
        stageNumbersToUpdate.greenCards -= 1;
    } else if(chosenCard.color === 'brown'){
        stageNumbersToUpdate.brownCards -= 1;
    } else if(chosenCard.color === 'blue'){
        stageNumbersToUpdate.blueCards -= 1;
    }
    showStageNumbers (stageContainer, stageNumbersToUpdate)

    lastCard.style['background-image'] = `url(./assets/MythicCards/${chosenCard.color}/${chosenCard.id}.png)`

    if(state.stage1Cards.length < 1 && state.stage2Cards.length < 1 && state.stage3Cards < 1){
        stack.style.visibility = "hidden";
    }
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

    state.stage1Cards = [];
    state.stage1Cards = state.stage1Cards.concat(state.greenCardsStack.splice(0, state.ancientCard.firstStage.greenCards));
    state.stage1Cards = state.stage1Cards.concat(state.brownCardsStack.splice(0, state.ancientCard.firstStage.brownCards));
    state.stage1Cards = state.stage1Cards.concat(state.blueCardsStack.splice(0, state.ancientCard.firstStage.blueCards));
    state.stage1Cards = shuffle(state.stage1Cards);

    state.stage2Cards = [];
    state.stage2Cards = state.stage2Cards.concat(state.greenCardsStack.splice(0, state.ancientCard.secondStage.greenCards));
    state.stage2Cards = state.stage2Cards.concat(state.brownCardsStack.splice(0, state.ancientCard.secondStage.brownCards));
    state.stage2Cards = state.stage2Cards.concat(state.blueCardsStack.splice(0, state.ancientCard.secondStage.blueCards));
    state.stage2Cards = shuffle(state.stage2Cards);

    state.stage3Cards = [];
    state.stage3Cards = state.stage3Cards.concat(state.greenCardsStack.splice(0, state.ancientCard.thirdStage.greenCards));
    state.stage3Cards = state.stage3Cards.concat(state.brownCardsStack.splice(0, state.ancientCard.thirdStage.brownCards));
    state.stage3Cards = state.stage3Cards.concat(state.blueCardsStack.splice(0, state.ancientCard.thirdStage.blueCards));
    state.stage3Cards = shuffle(state.stage3Cards);

    state.firstStageNumbers = {...state.ancientCard.firstStage};
    state.secondStageNumbers = {...state.ancientCard.secondStage};
    state.thirdStageNumbers = {...state.ancientCard.thirdStage};
    stack.style.visibility = "unset";
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
