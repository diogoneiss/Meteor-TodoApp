import { useTracker } from 'meteor/react-meteor-data';
import { StatusCount } from '../../db/StatusCount';

export const useStatusCount  = () => useTracker(() => {

    const noDataAvailable = {
      tasksCount: 0,
      pendingTasksCount: 0,
      doingTasksCount: 0,
      completedTasksCount: 0
    };
  
    const handler = Meteor.subscribe('tasks.statusCounts');
  
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
  
    let counts = StatusCount.findOne();
  
    if (!counts) return noDataAvailable;
    console.log("Registro no banco, dentro do hook: ", counts)
    const {_, tasksCount, CADASTRADA_Count, EM_ANDAMENTO_Count, CONCLUIDA_Count } = counts;

    return { tasksCount, CADASTRADA_Count, EM_ANDAMENTO_Count, CONCLUIDA_Count, isLoading: false };
  });

  export default useStatusCount;
  