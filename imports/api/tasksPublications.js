import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import { check } from 'meteor/check';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({
    $or: [
      { userId: this.userId },  
      { isPrivate: false } 
    ]
  });
});

Meteor.publish('task.byId', function getTaskById(taskId) {
  check(taskId, String);
  
  const task = TasksCollection.findOne({ _id: taskId });

  if (!task) {
    throw new Meteor.Error('404', 'Tarefa não encontrada');
  }

  if (task.isPrivate) {
    throw new Meteor.Error('403', 'Acesso restrito, tarefa privada');
  }

  return TasksCollection.find({ _id: taskId });
});