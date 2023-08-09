import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';


Accounts.onCreateUser((options, user) => {
  // Use provided `profile` or create an empty object
  user.profile = options.profile || {};

  // If the user has logged in with Github, copy certain fields
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
    });

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
      //username is name of the user without spaces
      //and all lowercase
      username: data.email,
      password: data.password,
      profile: {
        nome: data.name,
        dataDeNascimento: data.dob,
        sexo: data.gender,
        empresa: data.company,
        foto: data.photo,
      },
    });

    // Optionally, you could also set a password or send a verification email here

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
