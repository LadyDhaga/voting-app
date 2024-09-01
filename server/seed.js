require('dotenv').config();
const mongoose = require('mongoose');

// Use new URL parser and unified topology
mongoose.set('debug', true);
mongoose.set('useNewUrlParser', true);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
});

const db = require('./models');

const users = [
  { username: 'username', password: 'password' },
  { username: 'kelvin', password: 'password' },
];

const polls = [
  {
    question: 'Which is the best JavaScript framework',
    options: ['Angular', 'React', 'VueJS'],
  },
  { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
  { question: 'Truth or dare', options: ['Truth', 'Dare'] },
  { question: 'Boolean?', options: ['True', 'False'] },
];

const seed = async () => {
  try {
    // Remove existing documents using deleteMany
    await db.User.deleteMany({});
    console.log('Dropped all users');

    await db.Poll.deleteMany({});
    console.log('Dropped all polls');

    // Create new users
    const createdUsers = await Promise.all(
      users.map(user => db.User.create(user)),
    );
    console.log('Created users:', JSON.stringify(users));

    // Create new polls
    await Promise.all(
      polls.map(async poll => {
        poll.options = poll.options.map(option => ({ option, votes: 0 }));
        const createdPoll = await db.Poll.create(poll);
        const user = createdUsers.find(u => u.username === 'username');
        createdPoll.user = user._id;
        user.polls.push(createdPoll._id);
        await user.save();
        await createdPoll.save();
      }),
    );
    console.log('Created polls:', JSON.stringify(polls));
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close(); // Close connection after seeding
  }
};

seed();
