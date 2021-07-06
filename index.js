
fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(data => {console.log(data)
    const fetchData = data.reverse().map(user=>{
        return `<div class="items w-100">

                <div class="idNumber" class="userItem"><b>ID number: </b>#${user.id}</div>
                <div class="name" class="userItem"><b>Name: </b>${user.name}</div>
                <div class="username" class="userItem"><b>Username: </b>${user.username}</div>
                <div class="email" class="userItem"><b>Email: </b>${user.email}</div>
                <div class="city" class="userItem"><b>City: </b>${user.city}</div>
                </div>`

    }).join("")
    console.log(fetchData);
    document.getElementById("list").insertAdjacentHTML("afterbegin", fetchData)
  })
  .catch(err => {
      console.log(err)
 })



//POST method to Add user data to the server
function addUser() {

  var name = document.getElementById("name").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var city = document.getElementById("city").value;

  let canSubmit = false;

  //Validation for Add Form
  if(name === "") {
    alert("Name cannot be blank")
    canSubmit = false
  } else if(username ===""){
    alert("Username cannot be blank")
    canSubmit = false
  } else if(username.length < 8 || username.length > 12 ) {
    alert("Username Must be between 8 and 12 characters")
    canSubmit = false
  } else if(email === "") {
    alert("Email cannot be blank")
    canSubmit = false
  }else if(city ===""){
    alert("City cannot be blank")
    canSubmit = false
  }else {
    canSubmit = true
}

  if(canSubmit != false) {

    //Log data to be pushed to the JSON server
  console.log("Input Data: " + name + " " + username + " " + email);

  fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      username: username,
      email: email,
      city: city
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then(json => {
      console.log('response: ' + JSON.stringify(json));
      alert('User with the name of ' + name + ' will be added.');
      location.reload();

    })
}
}

//Remove User through ID
function removeUser() {
  var userId = document.getElementById("idNumber").value;

  let canSubmit = false;
  if(userId === "") {
    alert("ID cannot be blank")
    canSubmit = false
  }else {
    canSubmit = true
}
  if(canSubmit != false) {

    fetch('http://localhost:3000/users/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then(json => {
        console.log('response: ' + JSON.stringify(json));
        alert("The user with the Id number " + userId + " will be deleted.")
        location.reload();

      })
  }
}