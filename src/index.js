console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", function() {
    addSelectorOpts();
    getDogImgs();
    getDogBreeds();
});

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

function getDogImgs() {
    fetch(imgUrl)
    .then(res => res.json())
    .then(data => renderDogImgs(data.message));
};

function renderDogImgs(data) {
    data.forEach(img => showImg(img));
};

function showImg(img) {
    let newImg = document.createElement('img');
    newImg.src = img;
    newImg.height = "100";
    newImg.style.display = "inline-block";
    newImg.style.margin = "10px";
    document.getElementById("dog-image-container").appendChild(newImg);
};

function getDogBreeds() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(data => renderDogBreeds(data));
};

function renderDogBreeds(data) {
    document.getElementById("breed-dropdown").onchange = function(e) {filterBreeds(e.target.value)};
    Object.keys(data.message).forEach(breed => showBreed(breed));
};

function showBreed(breed) {
    let newBreed = document.createElement('li');
    newBreed.innerText = breed;
    document.getElementById("dog-breeds").appendChild(newBreed);
    newBreed.onclick = function() {newBreed.style.color = "red"};
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
};