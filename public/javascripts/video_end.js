function checkQuestion() {
    if ($("#answer").text()=="yes") {
        document.getElementById("questions").style.display="none";
        document.getElementById("vid2").style.display = "inline-block";
        document.getElementById("video2").play();
    }
    else {
        document.getElementById("wronganswer").style.display="inline-block";
    }
}


function display(element) {
    element.style.display="inline-block";
}

function showSelected(answer) {
    document.getElementById("answer").innerHTML = answer;
    currentanswer = answer;
  }

function replay(id) {
    var vid = document.getElementById(id);
    vid.currentTime=0;
    vid.play();
}

function moveOn(element,end) {
    document.getElementById(element).style.display = "none";
        if (end=='false') {
            var questions = document.getElementById("questions");
            display(questions);
        }
        else {
            display(document.getElementById("vid2"))
            document.getElementById("video2").play();
        }
}