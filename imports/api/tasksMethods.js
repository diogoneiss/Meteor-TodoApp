import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';
import { Log } from 'meteor/logging'
import { taskStatuses } from '../models/taskModel';

Meteor.methods({
  'tasks.insert'(task) {
    check(task, {
      title: String,
      description: String,
      isPrivate: Boolean,
    });
    

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    TasksCollection.insert({
      title: task.title,
      description: task.description,
      isPrivate: task.isPrivate,
      status: taskStatuses.CADASTRADA,
      createdAt: new Date,
      updatedAt: null,
      userId: this.userId,
      //evitar ter que fazer uma nova busca no front
      username: Meteor.users.findOne(this.userId).username,
    })

    Log.debug(`inserida tarefa: ${JSON.stringify(task)}`);
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  }
});