interface IUser {
  id: number;
  name: string;
  phonenumber: number;
  email: string;
  address?: string;
}

class User implements IUser {
  constructor(
    public id: number,
    public name: string,
    public phonenumber: number,
    public email: string,
    public address?: string
  ) {}
}

class UserService {
  private users: User[] = [];
  private lastUserId = 1;

  createUser(name: string, email: string, phonenumber: number, address: string): User {
    const newUser = new User(this.lastUserId++, name, phonenumber, email, address);
    this.users.push(newUser);
    return newUser;
  }

  getAllContacts(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id: number): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

// DOM Elements
const addUser = new UserService();

const addName = document.getElementById('add-name') as HTMLInputElement;
const addEmail = document.getElementById('addemail') as HTMLInputElement;
const addNumber = document.getElementById('add-number') as HTMLInputElement;
const addAddress = document.getElementById('address') as HTMLInputElement;
const button = document.getElementById('submit') as HTMLButtonElement;
const contactListDisplay = document.querySelector('.display-area') as HTMLElement;

// // Display users
// function displayUser(): void {
//   contactListDisplay.innerHTML = '';

//   const allContacts = addUser.getAllContacts();

//   if (allContacts.length === 0) {
//     contactListDisplay.innerHTML = '<li>No contact found</li>';
//     return;
//   }

//   const div = document.createElement('div');


//   allContacts.forEach((user) => {

//     const container = document.createElement('ul');
//       container.className = "contact-card"; 
// container.innerHTML= `

//     <li>Name: ${user.name}</li>
//     <li>Email:${user.email}</li>  
//      <li>Phone: ${user.phonenumber}</li>
//      <li>Address: ${user.address}</li>

//           <button class="delete-btn">Delete</button>
//       <button class="update-btn">Update</button>
//      `;
//     div.appendChild(container);
//   });

//   contactListDisplay.appendChild(div);
// }

// button.addEventListener('click', () => {
//   const name = addName.value.trim();
//   const email = addEmail.value.trim();
//   const number = parseInt(addNumber.value.trim());
//   const address = addAddress.value.trim();

//   if (name && email && !isNaN(number)) {
//     addUser.createUser(name, email, number, address);
//     addName.value = '';
//     addEmail.value = '';
//     addNumber.value = '';
//     addAddress.value = '';
//     displayUser();
//   } else {
//     alert('Please fill all required fields.');
//   }
  
// });

// const deleteBtn=document.querySelector('.delete-btn') as HTMLButtonElement;




// deleteBtn.addEventListener("click", () => {
//   const id = parseInt(deleteTaskIdInput.value);
//   if (!isNaN(id)) {
//     UserService.deleteUser(id);
//     deleteTaskIdInput.value = "";
//     displayTaskList();
//   }
// });



function displayUser(): void {
  contactListDisplay.innerHTML = '';

  const allContacts = addUser.getAllContacts();

  if (allContacts.length === 0) {
    contactListDisplay.innerHTML = '<li>No contact found</li>';
    return;
  }

  const div = document.createElement('div');

  allContacts.forEach((user) => {
    const container = document.createElement('ul');
    container.className = "contact-card";
    container.innerHTML = `
      <li>Name: ${user.name}</li>
      <li>Email: ${user.email}</li>  
      <li>Phone: ${user.phonenumber}</li>
      <li>Address: ${user.address}</li>
      <button class="delete-btn" data-id="${user.id}">Delete</button>
      <button class="update-btn" data-id="${user.id}">Update</button>
    `;
    div.appendChild(container);
  });

  contactListDisplay.appendChild(div);


  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = parseInt((btn as HTMLButtonElement).dataset.id!);
      if (!isNaN(id)) {
        addUser.deleteUser(id);
        displayUser();
      }
    });
  });


  const updateButtons = document.querySelectorAll('.update-btn');
  updateButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = parseInt((btn as HTMLButtonElement).dataset.id!);
      const user = addUser.getUserById(id);
      if (user) {
        addName.value = user.name;
        addEmail.value = user.email;
        addNumber.value = user.phonenumber.toString();
        addAddress.value = user.address ?? '';
        editingId = id; 
      }
    });
  });
}

let editingId: number | null = null;

button.addEventListener('click', () => {
  const name = addName.value.trim();
  const email = addEmail.value.trim();
  const number = parseInt(addNumber.value.trim());
  const address = addAddress.value.trim();

  if (name && email && !isNaN(number)) {
    if (editingId !== null) {
      const user = addUser.getUserById(editingId);
      if (user) {
        user.name = name;
        user.email = email;
        user.phonenumber = number;
        user.address = address;
      }
      editingId = null;
    } else {
      addUser.createUser(name, email, number, address);
    }

  
    addName.value = '';
    addEmail.value = '';
    addNumber.value = '';
    addAddress.value = '';
    displayUser();
  } else {
    alert('Please fill all required fields.');
  }
});
