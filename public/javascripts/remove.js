console.log('Client-side code running');

const button = document.getElementById('remove');
const track_name = track.name;

button.addEventListener('click', function(e) {
  console.log('button was clicked and the name of the track is:' + track_name);
});