function loadXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      loadFunction(xmlhttp)
    }
  }
  xmlhttp.open("GET", "data.xml", true)
  xmlhttp.send();
}

function loadFunction(xml) {
  var xmlDoc = xml.responseXML
  var titles = xmlDoc.getElementsByTagName("title")
  var ratings = xmlDoc.getElementsByTagName("rating")
  var providers = xmlDoc.getElementsByTagName("provider")
  var releases = xmlDoc.getElementsByTagName("released")

  for (i = 0; i <titles.length; i++) {
    var table = document.getElementById("movieTable")

    // CREATES TABLE ROWS & CELLS
    var row = table.insertRow(0)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)

    // ASSIGNS TABLE ELEMENTS VALUES FROM XML
    cell1.innerHTML = titles[i].innerHTML
    cell2.innerHTML = ratings[i].innerHTML
    cell3.innerHTML = providers[i].innerHTML

    // REARRANGES DATE FORMAT
    var date =  releases[i].innerHTML
    var newDate = date.split("-")
    var finalDate = newDate[1] + "-" + newDate[2] + "-" + newDate[0]
    cell4.innerHTML = finalDate

    cell1.className = "films"
    cell2.className = "ratings"
    cell3.className = "providers"
    cell4.className = "releases"
    row.className = "table-rows"
  }
}

window.onload = function() {
  loadXML()
}

// FILTER FUNCTIONS
function searchFilms(){
  var filmFilter = document.getElementById('film')
  var userSelection = filmFilter.options[filmFilter.selectedIndex].text
  var films = document.getElementsByClassName("films")

// LOOPS THROUGH DATA AND ADD A CLASS TO HIDE ROWS THAT DO NOT MATCH SEARCH
  for(i=0; i< films.length; i++){
    var rows = films[i].parentNode
    var title = films[i].innerHTML
    var titleFirst = title.split("")
    var firstIndex = titleFirst[0]
    if(firstIndex !== userSelection){
      rows.classList.remove("table-rows");
      rows.classList.add("no");
    }
  }
}

function searchRatings(){
  var ratingsFilter = document.getElementById('rating')
  var userSelection = ratingsFilter.options[ratingsFilter.selectedIndex].text
  var ratings = document.getElementsByClassName("ratings")

  for(i=0; i< ratings.length; i++){
    var rows = ratings[i].parentNode
    var rating = ratings[i].innerHTML
    if(rating !== userSelection){
      rows.classList.remove("table-rows")
      rows.classList.add("no")
    }
  }
}

function searchProviders(){
  var providersFilter = document.getElementById('provider')
  var userSelection = providersFilter.options[providersFilter.selectedIndex].text
  var providers = document.getElementsByClassName("providers")

  for(i=0; i< providers.length; i++){
    var rows = providers[i].parentNode
    var provider = providers[i].innerHTML
    if(provider !== userSelection){
      rows.classList.remove("table-rows")
      rows.classList.add("no")
    }
  }
}

function searchReleases(){
  var releasesFilter = document.getElementById('release')
  var userSelection = releasesFilter.options[releasesFilter.selectedIndex].text
  var releases = document.getElementsByClassName("releases")

  for(i=0; i< releases.length; i++){
    var rows = releases[i].parentNode
    var fullRelease = releases[i].innerHTML
    var newRelease = fullRelease.split("-")
    var finalRelease = newRelease[2]
    if(finalRelease !== userSelection){
      rows.classList.remove("table-rows");
      rows.classList.add("no");
    }
  }
}
// END FILTER FUNCTIONS

// RESETS TABLE BY REMOVING CLASS THAT WAS CREATED BY FILTER FUNCTIONS
document.getElementById("reset").addEventListener('click',function (){
  var releases = document.getElementsByClassName("releases")
  for(i=0; i< releases.length; i++){
    var rows = releases[i].parentNode
      rows.classList.remove("no")
      rows.classList.add("table-rows")
  }
// RESETS SELECTIONS TO ORIGINAL VALUE
  var selectors = document.getElementsByTagName("select")

  for(i=0; i <selectors.length; i++){
    selectors[i].selectedIndex = 0
  }
})

// SORTS TABLE BY COLUMNS
document.getElementById("main-title").addEventListener('click',function (){
//  GRABS ONLY ROWS THAT MATCH SEARCH
  var validRows = document.getElementsByClassName('table-rows')

//  FINDS DATA TO BE STORED
  var titles = []
  var ratings = []
  var providers = []
  var releases = []

  for(i=0; i<validRows.length; i++){
    titles.push(validRows[i].childNodes[0].innerHTML)
    ratings.push(validRows[i].childNodes[1].innerHTML)
    providers.push(validRows[i].childNodes[2].innerHTML)
    releases.push(validRows[i].childNodes[3].innerHTML)
  }

//  STORES DATA TO BE SORTED
  var titleArr = []
  for(i=0; i<titles.length; i++){
    var arr = []
    var title = titles[i]
    var rating = ratings[i]
    var provider = providers[i]
    var release = releases[i]
    arr.push(title)
    arr.push(rating)
    arr.push(provider)
    arr.push(release)
    titleArr.push(arr)
  }

//  CREATES NEW SORTED ARRAY
  var newTitle = titleArr.sort()

// REPLACES ROWS WITH SORTED DATA
  for(i=1; i < validRows.length + 1; i++){
    var title = newTitle[i-1][0]
    var rating = newTitle[i-1][1]
    var provider = newTitle[i-1][2]
    var release = newTitle[i-1][3]
    validRows[i-1].childNodes[0].innerHTML = title
    validRows[i-1].childNodes[1].innerHTML = rating
    validRows[i-1].childNodes[2].innerHTML = provider
    validRows[i-1].childNodes[3].innerHTML = release
  }
})

document.getElementById("main-rating").addEventListener('click',function (){
  var validRows = document.getElementsByClassName('table-rows')

  var titles = []
  var ratings = []
  var providers = []
  var releases = []

  for(i=0; i<validRows.length; i++){
    titles.push(validRows[i].childNodes[0].innerHTML)
    ratings.push(validRows[i].childNodes[1].innerHTML)
    providers.push(validRows[i].childNodes[2].innerHTML)
    releases.push(validRows[i].childNodes[3].innerHTML)
  }

  var titleArr = []
  for(i=0; i<titles.length; i++){
    var arr = []
    var title = titles[i]
    var rating = ratings[i]
    var provider = providers[i]
    var release = releases[i]
    var newRelease = release.split("")
    var finalRelease = newRelease[2] + "-" + newRelease[1] + "-" + newRelease[0]
    arr.push(rating)
    arr.push(title)
    arr.push(provider)
    arr.push(release)
    titleArr.push(arr)
  }

  var newTitle = titleArr.sort()

  for(i=1; i < validRows.length + 1; i++){
    var title = newTitle[i-1][1]
    var rating = newTitle[i-1][0]
    var provider = newTitle[i-1][2]
    var release = newTitle[i-1][3]
    validRows[i-1].childNodes[0].innerHTML = title
    validRows[i-1].childNodes[1].innerHTML = rating
    validRows[i-1].childNodes[2].innerHTML = provider
    validRows[i-1].childNodes[3].innerHTML = release
  }
})

document.getElementById("main-provider").addEventListener('click',function (){
    var validRows = document.getElementsByClassName('table-rows')

    var titles = []
    var ratings = []
    var providers = []
    var releases = []

    for(i=0; i<validRows.length; i++){
      titles.push(validRows[i].childNodes[0].innerHTML)
      ratings.push(validRows[i].childNodes[1].innerHTML)
      providers.push(validRows[i].childNodes[2].innerHTML)
      releases.push(validRows[i].childNodes[3].innerHTML)
    }

    var titleArr = []
    for(i=0; i<titles.length; i++){
      var arr = []
      var title = titles[i]
      var rating = ratings[i]
      var provider = providers[i]
      var release = releases[i]
      var newRelease = release.split("")
      var finalRelease = newRelease[2] + "-" + newRelease[1] + "-" + newRelease[0]
      arr.push(provider)
      arr.push(title)
      arr.push(rating)
      arr.push(release)
      titleArr.push(arr)
    }

    var newTitle = titleArr.sort()

    for(i=1; i < validRows.length + 1; i++){
      var title = newTitle[i-1][1]
      var rating = newTitle[i-1][2]
      var provider = newTitle[i-1][0]
      var release = newTitle[i-1][3]
      validRows[i-1].childNodes[0].innerHTML = title
      validRows[i-1].childNodes[1].innerHTML = rating
      validRows[i-1].childNodes[2].innerHTML = provider
      validRows[i-1].childNodes[3].innerHTML = release
    }
})

document.getElementById("main-release").addEventListener('click',function (){
    // var rows = document.getElementById("movieTable").childNodes
    var validRows = document.getElementsByClassName('table-rows')

    var titles = []
    var ratings = []
    var providers = []
    var releases = []

    for(i=0; i<validRows.length; i++){
      titles.push(validRows[i].childNodes[0].innerHTML)
      ratings.push(validRows[i].childNodes[1].innerHTML)
      providers.push(validRows[i].childNodes[2].innerHTML)
      releases.push(validRows[i].childNodes[3].innerHTML)
    }

    var titleArr = []
    for(i=0; i<titles.length; i++){
      var arr = []
      var title = titles[i]
      var rating = ratings[i]
      var provider = providers[i]
      var release = releases[i]
      var newRelease = release.split("-")
      var finalRelease = newRelease[2] + "-" + newRelease[1] + "-" + newRelease[0]
      arr.push(finalRelease)
      arr.push(title)
      arr.push(rating)
      arr.push(provider)
      titleArr.push(arr)
    }
    var newTitle = titleArr.sort()

    for(i=1; i < validRows.length + 1; i++){
      var title = newTitle[i-1][1]

      var rating = newTitle[i-1][2]
      var provider = newTitle[i-1][3]
      var release = newTitle[i-1][0]
      var newRelease = release.split("-")
      var finalRelease = newRelease[2] + "-" + newRelease[1] + "-" + newRelease[0]

      validRows[i-1].childNodes[0].innerHTML = title
      validRows[i-1].childNodes[1].innerHTML = rating
      validRows[i-1].childNodes[2].innerHTML = provider
      validRows[i-1].childNodes[3].innerHTML = finalRelease
    }
})
// END SORT
