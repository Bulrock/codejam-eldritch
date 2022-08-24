const difficulties = [
  {
    id: 'supereasy',
    name: 'Очень легкий',
	  cardTypes: ['easy'],
	  additionalCardTypes: ['normal'],
  },
  {
    id: 'easy',
    name: 'Легкий',
	  cardTypes: ['easy','normal'],
  },
  {
    id: 'normal',
    name: 'Средний',
	  cardTypes: ['easy','normal','hard'],
  },
  {
    id: 'hard',
    name: 'Сложный',
	  cardTypes: ['normal','hard'],
  },
  {
    id: 'superhard',
    name: 'Очень сложный',
	  cardTypes: ['hard'],
	  additionalCardTypes: ['normal'],
  },
]

export default difficulties