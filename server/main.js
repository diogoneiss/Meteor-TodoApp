import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import { TasksCount } from '../imports/db/TasksCount';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import { taskStatuses } from '../imports/enums/taskModel';
import '../imports/api/tasksMethods';
import '../imports/api/tasksPublications';
import '../imports/api/accountMethods';
import dotenv from 'dotenv';

dotenv.config();

/* DUVIDA pq isso nao funciona?
// Verificar variáveis de ambiente específicas
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_SECRET) {
    throw new Error("GITHUB_CLIENT_ID ou GITHUB_SECRET não estão definidos no arquivo .env");
}
*/
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
    status: taskStatuses.CADASTRADA,
    updatedAt: null,
    username: user.username,
    description: 'Sem descricao',
  });


Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  //TODO: melhorar as tasks iniciais
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: process.env.GITHUB_CLIENT_ID, // read from your .env file
      secret: process.env.GITHUB_SECRET, // read from your .env file
    },
  }
);