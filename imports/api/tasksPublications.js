import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import { check } from 'meteor/check';
import { Log } from 'meteor/logging'

Meteor.publish('tasks', function publishTasks() {
  const tarefas = TasksCollection.find({
    $or: [
      { userId: this.userId},
      { isPrivate: false } 
    ]
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