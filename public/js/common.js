function adoptAnimal(animalId) {
    fetch(`/adopt/${animalId}`, {
      method: 'POST'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      location.reload()
      console.log(`Adopted animal with ID ${animalId}`);
    })
    .catch(error => console.error(error));
  }
  
  function cancelAdoption(animalId) {
    fetch(`/cancelAdoption/${animalId}`, {
      method: 'POST'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      location.reload()
      console.log(`Cancelled adoption of animal with ID ${animalId}`);
    })
    .catch(error => console.error(error));
  }

function deleteAnimal(id){
}

async function updateSpecies(speciesId){
    const name = prompt('Enter a new name for the species:');
  if (!name) {
    alert("please enter a name")
    return;
  }
    fetch(`/species/${speciesId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(response => {
        if (!response.ok){
            throw new Error(response.statusText);
        }
        location.reload()
        alert('Updated species name!');
    })
    .catch(error => console.error(error));
}
function deleteSpecies(speciesId) {
    if (confirm('Are you sure you want to delete this species?')) {
      fetch(`/species/${speciesId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok){
            throw new Error(response.statusText);
        }
        location.reload()
        alert('Deleted species!');
      })
      .catch(error => console.error(error));
    }
  }

async function addSpecies(url){
    let name = prompt("Provide species name");
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            Name: name,
        })
    }).then((response)=> {
        if(response.ok){
            const resData = 'Added a new species';
            location.reload()
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    })
    .catch((response)=>{
        alert(response.statusText);
    });
}

function updateTemperament(id){
    newTemperament = prompt("Update temperament")
}

function deleteTemperament(id){
}

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function notAdmin(){
    alert("Must be an admin to modify species data")
}