import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import {
    brownCards,
    blueCards,
    greenCards
  } from './data/mythicCards/index.js';

const state = {
    difficulty: null,
    ancientCard: null
};
const ancientsContainer = document.querySelector('.ancients-container');
const difficultyContainer = document.querySelector('.difficulty-container');
const firstStageContainer = document.getElementById('firstStageContainer');
const secondStageContainer = document.getElementById('secondStageContainer');
const thirdStageContainer = document.getElementById('thirdStageContainer');


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
};

function showStageNumbers (stageContainer, stage){
    stageContainer.querySelector('.green').textContent = stage.greenCards;
    stageContainer.querySelector('.brown').textContent = stage.brownCards;
    stageContainer.querySelector('.blue').textContent = stage.blueCards;
}





// function getCards (ancientCard, difficulty, greenCards, blueCards, brownCards){
//     в ней 3 раза вызывается функция getCardsForStage (stageRule, cardTypes, additionalCardTypes,  greenCards, blueCards, brownCards);
// };



// function getCardsForStage (stageRule, cardTypes, additionalCardTypes,  greenCards, blueCards, brownCards){
// };


// function getCardsForColor (cardTypes, count, greenCards, blueCards, brownCards){
// };
