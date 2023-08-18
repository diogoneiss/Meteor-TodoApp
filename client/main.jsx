import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
//import App from '/imports/ui/App.jsx';
import Home from '/imports/ui/Home.jsx';



Meteor.startup(() => {
  const container = document.getElementById('react-target');
  console.log('rendered component: ', Home);
  const root = createRoot(container);
  root.render(<Home />);
});
