function adoptAnimal(animalId, userId) {
  console.log("animalIdFetch:", animalId)
  console.log("UserlIdFetch:", userId)
    fetch(`/adopt/${animalId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ animalId: animalId, userId: userId })
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
      method: 'DELETE'
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

async function updateSpecies(speciesId){
    const name = prompt('Enter a new name for the species:');
  if (!name) {
    alert("please enter a name")
    return;
  }
    fetch(`/species/${speciesId}`, {
      method: 'PUT',
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

  function addSpecies() {
    event.preventDefault();
    const name = prompt('Enter the name of the new species:');
    if (!name) {
      alert("Please enter a name for the new species.");
      return;
    }
    fetch('/species/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      location.reload();
      alert('Added new species!');
    })
    .catch(error => console.error(error));
  }

  async function updateTemperament(temperamentId) {
    const name = prompt('Enter a new name for the temperament:');
    if (!name) {
      alert("Please enter a name");
      return;
    }
    fetch(`/temperament/${temperamentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        location.reload()
        alert('Updated temperament name!');
    })
    .catch(error => console.error(error));
  }

  async function deleteTemperament(temperamentId) {
        if (confirm('Are you sure you want to delete this temperament?')) {
            fetch(`/temperament/${temperamentId}`, {
                method: 'DELETE',
              })
              .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                location.reload()
                alert('Deleted temperament!');
              })
              .catch(error => console.error(error));
        }
    }

  async function addTemperament() {
    event.preventDefault();
    const name = prompt('Enter a name for the new temperament:');
    if (!name) {
      alert('Please enter a name!');
      return;
    }
    try {
      const response = await fetch('/temperament/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      location.reload();
      alert('Temperament added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add temperament!');
    }
  }

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function notAdmin(){
    alert("Must be an admin to modify this data!")
}
function notUser(){
    alert("Must be logged in to do this.")
}