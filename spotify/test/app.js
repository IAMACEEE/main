const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5d55c73cd2mshe28108c7236b163p18b08bjsn54f6806473bc',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

const searchTextBox = document.getElementById('search')
const mainDump = document.getElementById('results')
var searchCount = 0

function card(sname,link,imgUrl){
  return '<a href="'+link+'"><img src="'+imgUrl+'" alt="">'+sname+'</a><hr>';
}

function search(q,type) {
  if (q.value == ''){
    searchCount+=1;
    searchTextBox.setAttribute('placeholder','Search Something'+'!!?'.repeat(searchCount));
    return;}

  searchCount=0;
  searchTextBox.setAttribute('placeholder','Search');

  fetch('https://spotify23.p.rapidapi.com/search/?q='+q.value+'&type='+type.value+'&offset=0&limit=10&numberOfTopResults=5', options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      mainDump.innerHTML = '<cite>Showing results for "'+q.value+'".</cite><hr>'
      if (type.value == 'tracks'){
        for (let i = 0; i < response.tracks.items.length; i++) {
          const track = response.tracks.items[i].data;
          mainDump.innerHTML += card(track.name,track.uri,track.albumOfTrack.coverArt.sources[1].url,);
        }
      }

    }).catch(err => console.error(err));
}