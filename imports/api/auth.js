import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import { Log } from 'meteor/logging'

Accounts.onCreateUser((options, user) => {

  user.profile = options.profile || {};

  if (user.services.github) {
    user.profile.email = user.profile.email || user.services.github.email;
    user.profile.nome = user.profile.nome || user.services.github.name;
    user.username = user.services.github.username;
    user.profile.oauth = 'github';
  }
  user.profile.dataDeNascimento = user.profile.dataDeNascimento || '';
  user.profile.sexo = user.profile.sexo || '';
  user.profile.empresa = user.profile.empresa || '';
  user.profile.foto = user.profile.foto || '';
  return user;
});

Meteor.methods({
  'users.register'(data) {
    check(data, {
      name: String,
      dob: String,
      gender: String,
      company: String,
      photo: String,
      email: Match.Optional(String), 
      password: Match.Optional(String), 
      username: Match.Optional(String) 
    });

    Log.debug(`users.register name: ${data.name}`);

    // Se já está logado só atualizamos o perfil
    if (this.userId) {
      Meteor.users.update(this.userId, {
        $set: {
          'profile.nome': data.name,
          'profile.dataDeNascimento': data.dob,
          'profile.sexo': data.gender,
          'profile.empresa': data.company,
          'profile.foto': data.photo,
          
        },
      });
      return;
    }
    
    const userId = Accounts.createUser({
      username: data.username,
      password: data.password,
      email: data.email,
      profile: {
        nome: data.name,
        dataDeNascimento: data.dob,
        sexo: data.gender,
        empresa: data.company,
        foto: data.photo,
        oauth: 'local',
      },
    });

    this.setUserId(userId);

    return userId;
  },
  'user.isFullyRegistered': function () {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'User must be logged in to check registration status.');
    }

    const user = Meteor.users.findOne(this.userId, { fields: { 'profile': 1 } });

    // Add a check for each required field in the profile
    const hasAllFields = user &&
      user.profile &&
      user.profile.nome &&
      user.profile.dataDeNascimento &&
      user.profile.sexo &&
      user.profile.empresa &&
      user.profile.foto;

    return hasAllFields;
  },
});
