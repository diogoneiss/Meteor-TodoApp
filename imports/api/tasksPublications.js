import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import { check } from 'meteor/check';
import { Log } from 'meteor/logging'
import { taskStatuses } from '../models/taskModel';
import { Random } from 'meteor/random';
import { TASKS_PER_PAGE } from '../constants';

/**
 * 
 * @param {string} userId 
 * @param {string} searchQuery 
 * @param {boolean} showCompleted se devemos incluir tarefas concluídas
 * @param {boolean} showOtherUsers se a busca deve incluir tarefas públicas
 * @returns filtro para o mongodb
 */
const createCollectionFilters = (userId, searchQuery, showCompleted, showOtherUsers=false) => {
  const userFilters = showOtherUsers ? 
    {
      $or: [
        { userId },
        { isPrivate: false }
      ]
    } : 
    { userId };

  const searchFilter = searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {};
  
  const statusFilter = !showCompleted ? 
    { status: { $in: [taskStatuses.CADASTRADA, taskStatuses.EM_ANDAMENTO] } } : {};

  return {
    $and: [userFilters, searchFilter, statusFilter]
  };
}

Meteor.publish('tasks.count', function publishTasksCount(searchQuery = "", showCompleted = true) {
  check(searchQuery, String);
  
  const combinedFiltersAll = createCollectionFilters(this.userId, searchQuery, showCompleted, true);
  const combinedFiltersUser = createCollectionFilters(this.userId, searchQuery, showCompleted, true);


  const countAllTasks = TasksCollection.find(combinedFiltersAll).count();
  const countUserTasks = TasksCollection.find(combinedFiltersUser).count();


  // Coleção virtual para contagem de tarefas
  this.added('tasksCount', Random.id(), { countAllTasks, countUserTasks  });

  this.ready();

});

Meteor.publish('tasks', function publishTasks(page = 1, searchQuery = "", showCompleted = true) {

  const skip = (page - 1) * TASKS_PER_PAGE;
  console.log(`skip: ${skip}`)

  const combinedFilters = createCollectionFilters(this.userId, searchQuery, showCompleted);


  console.log(JSON.stringify(combinedFilters))


  const tarefas = TasksCollection.find(combinedFilters,
    {
      limit: TASKS_PER_PAGE,
      skip: skip,
      sort: { createdAt: -1 }
    });

  return tarefas;
});

/*
//Eu notei que isso as vezes conflita com o publish de tasks,
//então achei melhor criar um método para buscar a task por id, gerenciando erros e carregamento
Meteor.publish('task.byId', function getTaskById(taskId) {
  check(taskId, String);
  Log.debug(`publicando tarefa: ${JSON.stringify(taskId)}`);
  
  const task = TasksCollection.findOne({ _id: taskId });

  if (!task) {
    throw new Meteor.Error('404', 'Tarefa não encontrada');
  }

  if (task.isPrivate) {
    throw new Meteor.Error('403', 'Acesso restrito, tarefa privada');
  }


  return TasksCollection.find({ _id: taskId });
});

*/