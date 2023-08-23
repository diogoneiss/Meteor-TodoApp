// hooks/useTaskCounts.js
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCount } from '../../db/TasksCount';

const useTaskCounts = (searchQuery, showCompleted) => {
    return useTracker(() => {
        const handle = Meteor.subscribe('tasks.count', searchQuery, showCompleted);
        if (!handle.ready()) {
            return { totalTaskCount: 0, userTasksCount: 0, isLoading: true };
        }
        const tc = TasksCount.findOne() || {};
        return { totalTaskCount: tc.countAllTasks || 0, userTasksCount: tc.countUserTasks || 0, isLoading: false };
    });
};

export default useTaskCounts;
