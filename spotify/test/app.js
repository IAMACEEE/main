const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5d55c73cd2mshe28108c7236b163p18b08bjsn54f6806473bc",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const searchTextBox = document.getElementById("search");
const mainDump = document.getElementById("results");
var searchCount = 0;

function card(temp1, temp2, temp3) {
  return (
    '<a href="' +
    temp2 +
    '"><img src="' +
    temp3 +
    '" alt="">' +
    temp1 +
    "</a><hr>"
  );
}

function songs(eresponse) {
  console.log("songs");
  mainDump.innerHTML += '<h2 id="songs">Songs</h2>';
  for (let i = 0; i < eresponse.tracks.items.length; i++) {
    let track = eresponse.tracks.items[i].data;
    mainDump.innerHTML += card(
      track.name,
      track.uri,
      track.albumOfTrack.coverArt.sources[1].url
    );
  }
}

function playlists(eresponse) {
  console.log("plalists");
  mainDump.innerHTML += '<h2 id="playlists">Playlists</h2>';
  for (let i = 0; i < eresponse.playlists.items.length; i++) {
    let playlist = eresponse.playlists.items[i].data;
    mainDump.innerHTML += card(
      playlist.name,
      playlist.uri,
      playlist.images.items[0].sources[0].url
    );
  }
}

function artists(eresponse) {
  console.log("artists");
  mainDump.innerHTML += '<h2 id="artists">Artists</h2>';
  for (let i = 0; i < eresponse.artists.items.length; i++) {
    let artist = eresponse.artists.items[i].data;
    mainDump.innerHTML += card(
      artist.profile.name,
      artist.uri,
      artist.visuals.avatarImage.sources[1].url
    );
  }
}

function albums(eresponse) {
  console.log("albums");
  mainDump.innerHTML += '<h2 id="albums">Albums</h2>';
  for (let i = 0; i < eresponse.albums.items.length; i++) {
    let album = eresponse.albums.items[i].data;
    mainDump.innerHTML += card(
      album.name,
      album.uri,
      album.coverArt.sources[1].url
    );
  }
}

function genres(eresponse) {
  console.log("genres");
  mainDump.innerHTML += '<h2 id="genres">Genres</h2>';
  for (let i = 0; i < eresponse.genres.items.length; i++) {
    let genre = eresponse.genres.items[i].data;
    mainDump.innerHTML += card(
      genre.name,
      genre.uri,
      genre.image.sources[0].url
    );
  }
}

function podcasts(eresponse) {
  console.log("podcasts");
  mainDump.innerHTML += '<h2 id="podcasts">Podcasts</h2>';
  for (let i = 0; i < eresponse.podcasts.items.length; i++) {
    let podcast = eresponse.podcasts.items[i].data;
    mainDump.innerHTML += card(
      podcast.name,
      podcast.uri,
      podcast.coverArt.sources[1].url
    );
  }
}

function episodes(eresponse) {
  console.log("episodes");
  mainDump.innerHTML += '<h2 id="episodes">Episodes</h2>';
  for (let i = 0; i < eresponse.episodes.items.length; i++) {
    let episode = eresponse.episodes.items[i].data;
    mainDump.innerHTML += card(
      episode.name,
      episode.uri,
      episode.coverArt.sources[1].url
    );
  }
}

function users(eresponse) {
  console.log("users");
  mainDump.innerHTML += '<h2 id="users">Profiles</h2>';
  for (let i = 0; i < eresponse.users.items.length; i++) {
    let user = eresponse.users.items[i].data;
    mainDump.innerHTML += card(
      user.displayName,
      user.uri,
      user.image.smallImageUrl
    );
  }
}

function search(q, type) {
  if (q.value == "") {
    searchCount += 1;
    searchTextBox.setAttribute(
      "placeholder",
      "Search Something" + "!!?".repeat(searchCount)
    );
    return;
  }

  searchCount = 0;
  searchTextBox.setAttribute("placeholder", "Search");

  fetch(
    "https://spotify23.p.rapidapi.com/search/?q=" +
      q.value +
      "&type=" +
      type.value +
      "&offset=0&limit=10&numberOfTopResults=5",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      // let multi = { 'tracks': songs(response), 'playlists': playlists(response) };
      mainDump.innerHTML =
        '<cite>Showing results for "' + q.value + '".</cite>';

      switch (type.value) {
        case "tracks":
          songs(response);
          break;
        case "playlists":
          playlists(response);
          break;
        case "artists":
          artists(response);
          break;
        case "albums":
          albums(response);
          break;
        case "genres":
          genres(response);
          break;
        case "podcasts":
          podcasts(response);
          break;
        case "episodes":
          episodes(response);
          break;
        case "users":
          users(response);
          break;
        default:
          songs(response);
          playlists(response);
          artists(response);
          albums(response);
          genres(response);
          podcasts(response);
          episodes(response);
          users(response);
      }

      // if (type.value == "multi") {
      //   for (i in multi) {
      //     multi[i];
      //   }
      // } else {
      //   console.log(type.value)
      //   multi[type.value];
      // }

      // if (type.value == 'tracks'){
      //   mainDump.innerHTML += '<div id="songs">'
      //   for (let i = 0; i < response.tracks.items.length; i++) {
      //     const track = response.tracks.items[i].data;
      //     mainDump.innerHTML += card(track.name,track.uri,track.albumOfTrack.coverArt.sources[1].url,);
      //   }
      //   mainDump.innerHTML += '</div>'
      // }
    })
    .catch((err) => console.error(err));
}
