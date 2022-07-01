const form = document.forms[0];
const apiOl = document.querySelector('ol');
let apis;

fetch('https://api.publicapis.org/entries')
  .then(res => res.json())
  .then(data => {
    apis = data.entries;
    apis.forEach(api => {
      const apiLi = document.createElement('li');
      const apiItemUl = document.createElement('ul');
      for (key in api) {
        const apiItemLi = document.createElement('li');
        apiItemLi.textContent = `${key} : ${api[key]}`;
        apiItemUl.append(apiItemLi);
      }
      apiLi.append(apiItemUl);
      apiOl.append(apiLi);
    });

    document.querySelector('input[disabled]').disabled = false;
  });

form.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const usrInput = form.elements.filter.value.toLowerCase();

  const filterRemainIndexArray = apis.map((api, index) => {
    const noMatchingValue = !Object.values(api).filter(apiKeyValue =>
      apiKeyValue.toString().toLowerCase().includes(usrInput)
    ).length;

    if (noMatchingValue) {
      return index;
    }
  });

  [...apiOl.children].forEach((apiLi, index) => {
    apiLi.style.display = 'list-item';
    if (filterRemainIndexArray.includes(index)) {
      apiLi.style.display = 'none';
    }
  });
});
