const form = document.forms[0];

form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const userInput = form.elements.filter.value;
  const apiOl = document.querySelector('ol');

  fetch('https://api.publicapis.org/entries')
    .then(res => res.json())
    .then(data => {
      const apiArray = data.entries;
      const filteredApiArray = apiArray.filter(apiArrayObj => {
        return Object.values(apiArrayObj).filter(apiArrayObjValue => {
          return apiArrayObjValue.toString().includes(userInput);
        }).length;
      });

      filteredApiArray.forEach(api => {
        const apiObjLi = document.createElement('li');
        const apiPropertyUl = document.createElement('ul');
        apiObjLi.style.margin = '10px';

        for (key in api) {
          const apiPropertyLi = document.createElement('li');
          apiPropertyLi.textContent = `${[key]} : ${api[key]}`;
          apiPropertyUl.append(apiPropertyLi);
        }
        apiObjLi.append(apiPropertyUl);
        apiOl.append(apiObjLi);
      });
    });
});
