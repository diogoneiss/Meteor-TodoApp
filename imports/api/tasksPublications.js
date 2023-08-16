import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import { check } from 'meteor/check';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});

Meteor.publish('task.byId', function getTaskById(taskId) {
  check(taskId, String);
  
  // You can add additional security checks here, for example, 
  // to make sure the user has access to this specific task.

  return TasksCollection.find({ _id: taskId });
});