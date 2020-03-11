
if (typeof(Number.prototype.toRadians) === "undefined") {
    Number.prototype.toRadians = function() {
      return this * Math.PI / 180;
    }
  }

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


function display(element) {
    element.style.display="inline-block";
}

function showSelected(answer) {
    document.getElementById("answer").innerHTML = answer;
    document.getElementById("wronganswer").style.display="none";
    console.log(answer);
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

function confirm_coord(position) {
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
    if (d>150) {
        alert("You are still "+d+" metres away")
        document.getElementById("AR").style.display="inline-block";
    }
    else {
        window.location.href='/track_loop/loop';
    }

}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(confirm_coord);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

Number.prototype.toRadians = function() { return this * Math.PI / 180; };