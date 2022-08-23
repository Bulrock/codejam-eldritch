const difficulties = [
  {
    id: 'supereasy',
    name: 'Очень легкий',
	  cardTypes: ['snowflake'],
	  additionalCardTypes: ['normal'],
  },
  {
    id: 'easy',
    name: 'Легкий',
	  cardTypes: ['snowflake','normal'],
  },
  {
    id: 'normal',
    name: 'Средний',
	  cardTypes: ['snowflake','normal','tentacles'],
  },
  {
    id: 'hard',
    name: 'Сложный',
	  cardTypes: ['normal','tentacles'],
  },
  {
    id: 'superhard',
    name: 'Очень сложный',
	  cardTypes: ['tentacles'],
	  additionalCardTypes: ['normal'],
  },
]

export default difficulties