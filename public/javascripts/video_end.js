
if (typeof(Number.prototype.toRadians) === "undefined") {
    Number.prototype.toRadians = function() {
      return this * Math.PI / 180;
    }
  }


// check the answer of the question, displays hint if correct
function checkQuestion() {
    if ($("#answer").text().valueOf() == document.getElementById("hiddenanswer").value.valueOf()) {
        document.getElementById("questions").style.display="none";
        document.getElementById("vid2").style.display = "inline-block";
        document.getElementById("video2").play();
    }
    else {
        document.getElementById("wronganswer").style.display="inline-block";
    }
}

// change divs/elements from display:none to display:inline-block
function display(element) {
    element.style.display="inline-block";
}

// function to show the answer currently selected in another <p> tag underneath the radiobutton inputs
function showSelected(answer) {
    document.getElementById("answer").innerHTML = answer;
    document.getElementById("wronganswer").style.display="none";
    console.log(answer);
  }


// sets the videos to the start and plays them
function replay(id) {
    var vid = document.getElementById(id);
    vid.currentTime=0;
    vid.play();
}

// skips the current introduction/welcome video and displays the questions
function moveOn(element,end) {
    document.getElementById(element).style.display = "none";
    document.getElementById("video1").pause();
        if (end=='false') {
            var questions = document.getElementById("questions");
            display(questions);
        }
        else {
            display(document.getElementById("vid2"))
            document.getElementById("video2").play();
        }
}

// check the user coordinates against the challenge coordinates using Haversine Formula
// for calculating distance between two sets of coordinates
function confirm_coord(position) {
    console.log('get')
    var lat1=position.coords.latitude;
    var lon1=position.coords.longitude;

    var lat2= parseFloat($("#lat").text());
    var lon2= parseFloat($("#lon").text());

    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    // if the distance between the user and the challenge location is less than 150 metres, the user can then move on to the next challenge
    if (d>150) {
        alert("You are still "+d+" metres away")
        document.getElementById("AR").style.display="inline-block";
    }
    else {
        window.location.href='/track_loop/loop';
    }

}

// get the coordinate values of the user's current position
function getLocation() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(confirm_coord);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

Number.prototype.toRadians = function() { return this * Math.PI / 180; };