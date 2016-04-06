/*

totalTime = timeEach * n
f(n) = n

n | f(n)
0 | timeEAch * 0
1 | timeEAch * 1
2 | timeEach * 2
4 | timeEach * 4


-----

g(n)
{
  users: []
}
// find all users that have same birthdate
foreach (user in users) {
  foreach (other in users) {
    if (user.birthdate == other.birthdate) {
      ding
    }
  }
}

function sortByBirthday();
function findDuplicateBirthdays();

sorted = user1 user2 user3 user4
         ^ i
                ^ j
*/

function randomDate(start, end) {
  var dateObj = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();

  return month + "/" + day;
}

function generateListOfUsers(numWanted) {
  users = []
  numberWanted = numWanted
  for (var i = 0; i < numberWanted; i++) {
    users.push({
      user: i,
      birthday: randomDate(new Date(2012, 0, 1), new Date(2012, 11, 31))
    })
  }
  return users
}

function findDuplicatesTakeOne(users) {
  var duplicates = []

  for (i = 0; i < users.length; i++) {
    for (j = 0; j < users.length; j++) {
      var user1 = users[i];
      var user2 = users[j];

      if(user1.birthday == user2.birthday) {
        duplicates.push([user1, user2])
      }
    }
  }
}

function findDuplicatesTakeTwo(users) {
  var duplicates = []

  for (i = 0; i < users.length; i++) {
    for (j = i+1; j < users.length; j++) {
      var user1 = users[i];
      var user2 = users[j];

      if(user1.birthday == user2.birthday) {
        duplicates.push([user1, user2])
      }
    }
  }
}

function findFromSorted(users) {
  var duplicates = []
  var sorted = users.sort(function(a, b){
    if (a.birthday > b.birthday) {
      return 1;
    }
    if (a.birthday < b.birthday) {
      return -1;
    }
    return 0;
  });

  for (i = 0; i < sorted.length; i++) {
    for (j = i+1; j < sorted.length; j++) {
      var user1 = sorted[i];
      var user2 = sorted[j];

      if(user1.birthday != user2.birthday) {
        break
      }

      duplicates.push([user1, user2])
    }
  }

  return duplicates
}

function findFromMap(users) {
  var duplicates = []
  datesWithDuplicates = {}
  for (i = 0; i < users.length; i++) {
    var key = users[i].birthday
    var listForDate = datesWithDuplicates[key]

    if (listForDate) {
      listForDate.push(users[i])
    } else {
      datesWithDuplicates[key] = [users[i]];
    }
  }

  Object.keys(datesWithDuplicates).forEach(function(key){
    var usersByDay = datesWithDuplicates[key]

    if(usersByDay.length > 1) {
      // duplicates.push(usersByDay)

      for (i = 0; i < usersByDay.length; i++) {
        for (j = i+1; j < usersByDay.length; j++) {
          var user1 = usersByDay[i];
          var user2 = usersByDay[j];
          duplicates.push([user1, user2])
        }
      }

    }
  })
  return duplicates;
}

function runAndLog(fun, list) {
  var start = new Date().getTime();

  fun(list)

  var end = new Date().getTime();
  var time = end - start;
  console.log('Execution time: ' + time);
}

var users = generateListOfUsers(20000)
runAndLog(findDuplicatesTakeOne, users)
runAndLog(findDuplicatesTakeTwo, users)
runAndLog(findFromSorted, users)
runAndLog(findFromMap, users)

// {
//   school1:  {
//     classes: {
//       {
//         id: 1
//         teacher: 'Teacher One',
//         students: [],
//       }
//     }xs
//   }
// }

// {
//   id: 123,
//   student: 123,
//   course: 123,
//   questions: []

// }

// for i
// task

// foreach
// task

// foreach
// if every task

/*
duplicates[user1.birthdate].concat([user1, user2])


for (i = 0; i < users.length; i++) {
  for (j = i+1; j < users.length; j++) {
    var user1 = sorted[i];
    var user2 = sorted[j];
    if (user1.birthday == user2.birthday) {
      duplicates = duplicates.push([user1, user2])

    }
  }
}

Jan1 Jan1 Mar3 May7
Jan1 Mar3 May7
Mar3 May7
May7

user1 user2 user3 user4
user2 user3 user4
user3 user4
user4



user1 user2 user3 user4 ...
n     n     n     n

g(n) = n^2
*/

