import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
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

  'tasks.update'(updatedTask) {
    //Duvida: como fazer para não precisar fazer essa verificação?
    // tentei usar o Maybe que teoricamente aceita null, mas não funcionou
    if (updatedTask.updatedAt === null) {
      delete updatedTask.updatedAt;
  }

    check(updatedTask, {
      _id: String,
      title: String,
      description: String,
      isPrivate: Boolean,
      status: String,
      createdAt: Date,
      updatedAt: Match.Optional(Date),
      userId: Match.Optional(String),
      username: Match.Optional(String),
    });

    Log.debug(`atualizando tarefa: ${JSON.stringify(updatedTask)}`);

    const task = TasksCollection.findOne(updatedTask._id);
    if (!task) {
      throw new Meteor.Error('Task não encontrada');
    }

    if (task.userId !== this.userId) {
      throw new Meteor.Error('Usuário não autorizado para edição');
    }

    TasksCollection.update(updatedTask._id, {
      $set: {
        title: updatedTask.title,
        description: updatedTask.description,
        isPrivate: updatedTask.isPrivate,
        status: updatedTask.status,
        updatedAt: new Date(),
      },
    });
  },
});