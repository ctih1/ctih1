window.onload = function() {
    fetch("https://ctihcommentserver.ctih.repl.co");
    getComment();

};
let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Credentials', 'true');

headers.append('GET', 'POST', 'OPTIONS');
let likedComment = false;
let lastComment = "";
let currentUser = "";
let currentComment = "";
let currentLikes = 0;
function hover(img) {
    img.src = "https://i.ibb.co/gZG7x2g/6dcc94f6b4c1fac7f4d12336f054c8e6.webp"
}
function hoverOut(img) {
    img.src = "https://i.ibb.co/R7vtGCx/s4hype-profile.jpg"
}

function sendComment(button) {
    const request = new Request("https://ctihcommentserver.ctih.repl.co/comment?usr="+ document.getElementById("username").value +"&cmt=" + document.getElementById("comment").value);
    request.mode = 'no-cors';
    fetch(request, headers=headers);


}
function autoNextComment(){

    getComment();
    likedComment = false;
    try {
        document.getElementById("like").style.backgroundColor = "#272727";
    } catch (error) {
        
    }
    setTimeout(autoNextComment, 5000);
}

autoNextComment();



function getComment() {
    const response = fetch("https://ctihcommentserver.ctih.repl.co/getcomment").then(response => response.json()).then(data => {
    if(data[1] != lastComment) {
        currentUser = data[0];
        currentComment = data[1]
        console.log(data[2])
        currentLikes = data[2]
        document.getElementById("review").innerHTML = data[0] + ":" + '<i> <strong>'+'"' + data[1] + '"' +'</i> </strong>' + "♥" + currentLikes ;
    }
    if(data[1] == lastComment){
        getComment();
    }
    
        
    
})}
function toggleComment() {
    if(likedComment == false) {
        const request = new Request("https://ctihcommentserver.ctih.repl.co/like?usr="+ currentUser +"&cmt=" + currentComment);
        request.mode = 'no-cors';
        fetch(request, headers=headers);
        document.getElementById("like").style.backgroundColor = "#a83287";
        likedComment = true;
        document.getElementById("review").innerHTML = currentUser + ":" + '<i> <strong>'+'"' + currentComment + '"' +'</i> </strong>' + "♥" + (currentLikes+1) ;
        currentLikes= currentLikes+1
    } else{
        const request = new Request("https://ctihcommentserver.ctih.repl.co/unlike?usr="+ currentUser +"&cmt=" + currentComment);
        request.mode = 'no-cors';
        fetch(request, headers=headers);
        document.getElementById("like").style.backgroundColor = "#272727";
        document.getElementById("review").innerHTML = currentUser + ":" + '<i> <strong>'+'"' + currentComment + '"' +'</i> </strong>' + "♥" + (currentLikes-1)
        currentLikes= currentLikes-1 ;
        likedComment = false;
    }

}