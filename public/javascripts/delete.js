//delete button
var del = document.getElementById('delete');

del.addEventListener('click', function () { fetch('quotes', { method: 'delete', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'name': 'Darth Vader' }) }).then(res => { if (res.ok) return res.json() }).then(data => { console.log(data); window.location.reload() }) });

