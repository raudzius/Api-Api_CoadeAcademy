const form = document.forms[0];
const apiOl = document.querySelector('ol');
let apiList;

fetch('https://api.publicapis.org/entries')
  .then(res => res.json())
  .then(data => {
    apiList = data.entries;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const apiOlChildren = apiOl.children;
  console.log(apiOlChildren);
  const filteredArray = [...apiOlChildren].filter(apiArrayObj => {
    return Object.values(apiArrayObj).filter(apiArrayObjValue => {
      return apiArrayObjValue.toString().includes(userInput);
    }).length;
  });

  console.log(filteredArray);
});
