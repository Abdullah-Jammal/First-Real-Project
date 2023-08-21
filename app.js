// Images
// The Vars Of To Upload Images 
let inputImage = document.querySelector('#first')
let inputImageTwo = document.querySelector('#second')
let firstDivImage = document.querySelector('.uploded-image')
let secondDivImage = document.querySelector('.uploded-image-two')
let uploadedImg = '';
let uploadedImgTwo = '';
let tepImg;
let tepImgTwo;

// First Image Upload
inputImage.addEventListener('change', displayImg)

function displayImg() {
  let reader = new FileReader()
  reader.addEventListener('load', () => {
    uploadedImg = reader.result;
    firstDivImage.style.backgroundImage = `url(${uploadedImg})`
  })
  reader.readAsDataURL(this.files[0])
  let finalFirstImg = this.files[0].name;
  tepImg = finalFirstImg
}
// Second Image Upload
inputImageTwo.addEventListener('change', displayImgTwo)

function displayImgTwo() {
  let reader = new FileReader()
  reader.addEventListener('load', () => {
    uploadedImgTwo = reader.result;
    secondDivImage.style.backgroundImage = `url(${uploadedImgTwo})`
  })
  reader.readAsDataURL(this.files[0])
  let finalFirstImg = this.files[0].name;
  tepImgTwo = finalFirstImg
}

// Get Vars To Table
let fullName = document.querySelector('#name')
let mainDate = document.querySelector('#main')
let invetationDate = document.querySelector('#lawdate')
let finalResault = document.querySelector('#finalResault')
let finalResaultDate = document.querySelector('#finalResaultDate')
let numSue = document.querySelector('#numSue')
let tbody = document.querySelector('.tbody')
let btn = document.querySelector('.btn')
let firstLaw = document.querySelector('.firstLaw span')
let secondLaw = document.querySelector('.secondLaw span')
let search = document.querySelector('.search')
let showsuts = document.querySelector('.showsuts')
let reload = document.querySelector('.reload')

let mood = 'create';
let globalIndex;

// Create Object
let dataPro;
if(localStorage.client != null) {
  dataPro = JSON.parse(localStorage.client)
} else {
  dataPro = [];
}

btn.addEventListener('click', function() {
  let myObj = {
  fullName : fullName.value,
  numSue : numSue.value,
  mainDate : mainDate.value,
  invetationDate : invetationDate.value,
  finalResault : finalResault.value,
  finalResaultDate : finalResaultDate.value,
  firstImage : tepImg,
  secondImage : tepImgTwo
}
  if (mood === 'create') {
  dataPro.push(myObj)
  } else {
    dataPro[globalIndex] = myObj
    mood = 'create';
    btn.innerHTML = 'Create'
  }
  localStorage.setItem('client', JSON.stringify(dataPro))
  clearInput()
  displayData()
})

// Clear Inputs
function clearInput() {
  fullName.value = ''
  numSue.value = ''
  mainDate.value = ''
  invetationDate.value = ''
  finalResault.value = ''
  finalResaultDate.value = ''
  firstDivImage.style.backgroundImage = ''
  secondDivImage.style.backgroundImage = ''
  firstLaw.innerHTML = '00'
}

// Read Data (Create Table)
function displayData() {
  let html = ''
  for (let i = 0; i < dataPro.length; i++) {
    html += `
  <tr>
    <td>${i}</td>
    <td>${dataPro[i].fullName}</td>
    <td>${dataPro[i].numSue}</td>
    <td>${dataPro[i].mainDate}</td>
    <td>${dataPro[i].invetationDate}</td>
    <td>${dataPro[i].finalResault}</td>
    <td>${dataPro[i].finalResaultDate}</td>
    <td><button onclick = 'showImg(${i})' class="btnf">Image</button></td>
    <td><button onclick = 'updateData(${i})' class="btnf">Update</button></td>
    <td><button onclick = 'deleteEle(${i})' class="btnf">Delete</button></td>
  </tr>
    `
  }
  tbody.innerHTML = html;
  secondLaw.innerHTML = dataPro.length
}
displayData()

// Delete Data
function deleteEle(i) {
    dataPro.splice(i, 1)
    localStorage.client = JSON.stringify(dataPro)
    displayData()
}

// Update Data
function updateData(i) {
  showImg(i)
  fullName.value = dataPro[i].fullName
  numSue.value = dataPro[i].numSue
  mainDate.value = dataPro[i].mainDate
  invetationDate.value = dataPro[i].invetationDate
  finalResault.value = dataPro[i].finalResault
  finalResaultDate.value = dataPro[i].finalResaultDate
  btn.innerHTML = 'Update';
  mood = 'update';
  globalIndex = i;
  firstLaw.innerHTML = i
  scroll({
    top : 0,
    behavior: 'smooth'
  })
}

// Search
search.addEventListener('keyup', () => {
  let html = '';
  for(let i = 0; i < dataPro.length; i++) {
    if(dataPro[i].fullName.includes(search.value)) {
      html += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].fullName}</td>
        <td>${dataPro[i].numSue}</td>
        <td>${dataPro[i].mainDate}</td>
        <td>${dataPro[i].invetationDate}</td>
        <td>${dataPro[i].finalResault}</td>
        <td>${dataPro[i].finalResaultDate}</td>
        <td><button onclick = 'showImg(${i})' class="btnf">Image</button></td>
        <td><button onclick = 'updateData(${i})' class="btnf">Update</button></td>
        <td><button onclick = 'deleteEle(${i})' class="btnf">Delete</button></td>
      </tr>
        `
    }
  }
  tbody.innerHTML = html
})

// Displaying The sues of the day
showsuts.addEventListener('click', function() {
  clearInput()
  let getDate = new Date()
  let year = JSON.stringify(getDate.getFullYear())
  let month = JSON.stringify(getDate.getMonth() + 1).padStart(2, '0')
  let day = JSON.stringify(getDate.getDate()).padStart(2, '0')
  let lastResult = `${year}-${month}-${day}`

  let html = '';
  for(let i = 0; i < dataPro.length; i++) {
    if(dataPro[i].invetationDate === lastResult) {
      html += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].fullName}</td>
        <td>${dataPro[i].numSue}</td>
        <td>${dataPro[i].mainDate}</td>
        <td>${dataPro[i].invetationDate}</td>
        <td>${dataPro[i].finalResault}</td>
        <td>${dataPro[i].finalResaultDate}</td>
        <td><button onclick = 'showImg(${i})' class="btnf">Image</button></td>
        <td><button onclick = 'updateData(${i})' class="btnf">Update</button></td>
        <td><button onclick = 'deleteEle(${i})' class="btnf">Delete</button></td>
      </tr>
        `
    }
  }
  tbody.innerHTML = html
  reload.style.display = 'block'
  reload.onclick = () => {
    location.reload()
  }
  scroll({
    top : 500,
    behavior : 'smooth'
  })
})

// Display The Image On Click
function showImg(i) {
  clearInput()
  firstDivImage.style.backgroundImage = `url(${dataPro[i].firstImage})`;
  secondDivImage.style.backgroundImage = `url(${dataPro[i].secondImage})`;
  scroll({
    top : 0,
    behavior : 'smooth'
  })
}
