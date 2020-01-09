console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function getDogImgs() {
    fetch(imgUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        showImgArray(data["message"]);
    })
};

function showImgArray(data) {
    data.forEach(function(img) {
        showImg(img);
    })
};

function showImg(img) {
    let dogDiv = document.getElementById("dog-image-container")
    let newImg = document.createElement('img');
    newImg.src = img;
    newImg.height = "100";
    newImg.style.display = "inline-block";
    newImg.style.margin = "10px"
    dogDiv.appendChild(newImg)
};

function getDogBreeds() {
    fetch(breedUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let allBreeds = Object.keys(data.message)
        showBreedArray(allBreeds);
        let filter = document.getElementById("breed-dropdown");
        filter.addEventListener("change", function() {
            filterBreeds(filter.value)
        })
    })
};

function showBreedArray(breedArray) {
    breedArray.forEach(breed => showBreed(breed));
};

function filterBreeds(val) {
    let allBreeds = document.querySelectorAll('li');
    allBreeds.forEach(li => li.style.display = "none");
    if (val == "all") {
        allBreeds.forEach(li => li.style.display = "block");
    } else {
        allBreeds.forEach(li => {
            if (li.innerText[0] == val) {
                li.style.display = "block";
            };
        });
    };
}

function showBreed(breed) {
    let dogList = document.getElementById("dog-breeds")
    let newBreed = document.createElement('li');
    newBreed.innerText = breed;
    dogList.appendChild(newBreed)
    newBreed.onclick = function() {
        newBreed.style.color = "red";
    }
};

function addSelectorOpts() {
    let select = document.getElementById("breed-dropdown");
    let newOpt = document.createElement('option');
    newOpt.value = "all";
    newOpt.innerText = "all";
    select.insertBefore(newOpt, select.firstChild);
    for (let i = 101; i < 123; i++) {
        let char = String.fromCharCode(i);
        newOpt = document.createElement('option');
        newOpt.value = char;
        newOpt.innerText = char;
        select.appendChild(newOpt);
    };
    select.value = "all";
}

document.addEventListener("DOMContentLoaded", function() {
    addSelectorOpts();
    getDogImgs();
    getDogBreeds();
})