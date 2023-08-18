import { Meteor } from 'meteor/meteor';

export const AccountStatus = {
  LOGGED_OUT: 'loggedOut',
  FULL: 'full',
  PARTIAL: 'partial',
};

export const getAccountStatus = async (user) => {
  if (!user) {
    return AccountStatus.LOGGED_OUT;
  }

  return new Promise((resolve, reject) => {
    Meteor.call('user.isFullyRegistered', (error, isFullyRegistered) => {
      
      if (error) {
        console.error(error);
        reject(error); 
      } else if (!!isFullyRegistered) {
        resolve(AccountStatus.FULL);
      } else { 
        resolve(AccountStatus.PARTIAL);
      }
    });
  });
};

