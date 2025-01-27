require('dotenv').config();

let mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let personDocument = new Person({
    name: "John Doe",
    age: 18,
    favoriteFoods: ["chicken nuggets", "chips"]
  })

  personDocument.save()
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((data) => {
      done(null, data);
    })
    .catch((err) => {
      done(err);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  })
    .then((data) => {
      done(null, data);
    })
    .catch((err) => {
      done(err);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};

const findPersonById = (personId, done) => {
  Person.findById(personId)
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, person) => {
    if (err) {
      return done(err);
    }

    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) {
        return done(err);
      }

      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({
    name: personName
  }, {
    age: ageToSet
  }, {
    new: true
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({
    name: nameToRemove
  })
    .then((data) => {
      done(null, data);
    })
    .catch((err) => {
      done(err);
    });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: false})
    .exec((err, data) => {
      done(err, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
