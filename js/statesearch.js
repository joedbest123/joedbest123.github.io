document.querySelector('.search-form').addEventListener('submit', e => e.preventDefault());

document.querySelector('.search-form').addEventListener('input', handleSearch, true);

function handleSearch (e) {
  inputVal = e.target.value;
  const searchOutput = document.querySelector('.search-output');

  const regEx = new RegExp(`^${inputVal}`, 'gi');

  fetch('states.json')
  .then(res => {
    if(res.ok){
      return res.json();
    } else {
      Promise.reject({status: res.status, statusText: res.statusText});
    }
  })

  .then(res => {
    let filteredStates = res.filter(state => {
      if (regEx.test(state.name) || regEx.test(state.capital)){
        return state;
      }
    });
    console.log(filteredStates);
    renderHtml(filteredStates);
  })
  .catch(error => {
    console.log('Error:'+ error.statusText)
  })

  function renderHtml (filteredStates) {
    if (inputVal.length > 0){
      let output = filteredStates.map(states => {
        return `
        <div class="search-result">
          <div class='less-details'>
            <p><span class="make-bold">State name: </span>${states.name} </p>
            <p><span class="make-bold">Capital: </span>${states.capital} </p>
            <p><span class="make-bold">Slogan: </span>${states.slogan} </p>
          </div>
          <div class="more-details">
            <div class="more-text">
            <p><span class="make-bold">Founded: </span>${states.founded}</p>
            <p><span class="make-bold">Area: </span>${states.area}</p>
            <p><span class="make-bold">Population: </span>${states.population}</p>
            <p><span class="make-bold">Description: </span>${states.description}</p>
            <p><span class="make-bold">Facts: </span>${states.facts}</p>
            </div>
            <div class="image">
              <img src="${states.image}">
            </div>
          </div>
          <button class="btn btn-show" onclick="showDetails()">show details</button>
          <button class="btn btn-hide hide" onclick="hideDetails()" >hide details</button>
        </div>
        
        `;
      }).join('')
      searchOutput.innerHTML = output;
    } else searchOutput.innerHTML = '';
  }
}



const showDetails = () => {
  const show =  document.querySelector('.btn-show');
  const hide = document.querySelector('.btn-hide');
  const more = document.querySelector('.more-details');
  more.classList.add('show');
  show.classList.add('hide');
  hide.classList.remove('hide');
}
const hideDetails = () => {
  const show =  document.querySelector('.btn-show');
  const hide = document.querySelector('.btn-hide');
  const more = document.querySelector('.more-details');
  more.classList.remove('show');
  show.classList.remove('hide');
  hide.classList.add('hide');
}