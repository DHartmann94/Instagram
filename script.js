/* --- Render --- */
function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        content.innerHTML += generateContent(i);
    }
}

/* --- Comment --- */
function addComment(i) {
    input = document.getElementById(`input-comment${i}`).value;
    if (input == '') {
        alert('Bitte ein Kommentar eintragen!')
        errorComment = true;
        return false;
    }
    posts[i]['comments'].push(input);
    renderComments(i);
}


function renderComments(i) {
    document.getElementById(`show-comments${i}`).innerHTML = '';
    document.getElementById(`input-comment${i}`).value = ``;
    let showComments = document.getElementById(`show-comments${i}`);

    for (let j = 0; j < posts[i]['comments'].length; j++) {
        let comment = posts[i]['comments'][j];
        showComments.innerHTML += `<div>Daniel: ${comment} </div>`;
    }
}

/* --- Popup Container IMG --- */
function openImg(i) {
    let content = document.getElementById('content');
    content.innerHTML += generateImg(i);
}

function generateImg(i) {
    let postImg = posts[i][`post-img`];
    return `
    <div class="popup-container" id="popup-section">
        <img class="footer-img absolute" onclick="popupImgClose()" src="img/logo/close-window-128.jpg" alt="Close Popup">
        <div class="popup-img">${postImg}</div>
    </div>
    `;
}

function popupImgClose() {
    document.getElementById(`popup-section`).remove();
}

/* --- Likes / Dislikes --- */
function liken(i) {
    posts[i][`likes`]++;
    document.getElementById(`heart${i}`).classList.add(`dnone`);
    document.getElementById(`heart-red${i}`).classList.remove(`dnone`);
    renderLike(i);
}

function disliken(i) {
    posts[i][`likes`]--;
    document.getElementById(`heart-red${i}`).classList.add(`dnone`);
    document.getElementById(`heart${i}`).classList.remove(`dnone`);
    renderLike(i);
}

function renderLike(i) {
    let updateLike = posts[i][`likes`];
    document.getElementById(`show-like${i}`).innerHTML = `<b>Gefällt ${updateLike} Mal</b>
    `;
}

/* --- Toogle-Button Header --- */
function toggle() {
    document.getElementById("show").classList.toggle(`active`);
}

/* --- Generate Content / Template --- */
function generateContent(i) {
    const post = posts[i];
    return `
        <div class="post-container">
            <div class="post-center">
                <div>${post['author-img']}</div> 
                <div class="column">
                    <div>${post['author']}</div> 
                    <div>${post['location']}</div>
                </div>
            </div>
            <div onclick="openImg(${i})">${post['post-img']}</div>
            <div class="post-center post-space-between">
                <div>
                    <img onclick="liken(${i})" id="heart${i}" class="header-img" src="img/logo/favorite-3-128.jpg" alt="Like">
                    <img onclick="disliken(${i})" id="heart-red${i}" class="header-img dnone" src="img/logo/favorite-red-128.jpg" alt="Dislike">
                    <img class="header-img" src="img/logo/comments-128.jpg" alt="Comments Button">
                    <img class="header-img" src="img/logo/paper-plane-128.jpg" alt="Paper Plane">
                </div>
                <div><img class="header-img" src="img/logo/bookmark-5-128.jpg" alt="Bookmark"></div>
            </div>
            <div id="show-like${i}" class="post-center"><b>Gefällt ${post['likes']} Mal</b></div>
            <div class="post-center">${post['text']}</div>
            <div class="post-center"><i>vor ${post['datum']} Stunden</i></div>
            <div id="show-comments${i}" class="comments-column">${post['comments']}</div>
            <span id="error-comment${i}" class="post-center"></span>
            <div class="post-center post-space-between">
                <input id="input-comment${i}" placeholder="Kommentar hinzufügen ...">
                <button onclick="addComment(${i})">Posten</button>
            </div>
        </div>
    `;
}