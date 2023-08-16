import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { TaskView } from './TaskView';
import { TaskEdit } from './TaskEdit';

export const TaskDetail = () => {
  const { taskId } = useParams();
  
  const { task, loading, error } = useTracker(() => {
    const handle = Meteor.subscribe('task.byId', taskId);
    const loading = !handle.ready();
    const task = TasksCollection.findOne(taskId);
    const error = !loading && !task;
    
    return { task, loading, error };
  });

  useEffect(() => {
    const fetchedTask = TasksCollection.findOne(taskId);
    setTask(fetchedTask);
  }, [taskId]);

  const isCurrentUserOwner = task && Meteor.userId() === task.userId;

  const handleEditClick = () => setEditing(true);
  const handleUpdate = (updatedTask) => {
    // Call a Meteor method to update the task
    // Redirect or change state as needed
  };

  return task ? (
    editing ? (
      <TaskEdit task={task} onUpdate={handleUpdate} />
    ) : (
      <TaskView task={task} onEditClick={handleEditClick} isCurrentUserOwner={isCurrentUserOwner} />
    )
  ) : (
    <div>Loading...</div>
  );
};
