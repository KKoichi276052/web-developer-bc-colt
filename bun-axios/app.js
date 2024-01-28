const axios = require('axios').default;

// axios
//   .get('https://swapi.dev/api/people/1')
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const getStarWarsPerson = async (id) => {
  const res = await axios.get('https://swapi.dev/api/people/1');
  // console.log(res);
  console.log(res.data);
};

getStarWarsPerson();
