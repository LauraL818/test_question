function loadXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      loadFunction(xmlhttp);
    }
  };
  xmlhttp.open("GET", "data.xml", true);
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
    var row = table.insertRow(0)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)

    cell1.innerHTML = titles[i].innerHTML
    cell2.innerHTML = ratings[i].innerHTML
    cell3.innerHTML = providers[i].innerHTML

    cell1.className = "films"
    cell2.className = "ratings"
    row.className = "table-rows"

    var date =  releases[i].innerHTML
    var newDate = date.split("-")
    var finalDate = newDate[1] + "-" + newDate[2] + "-" + newDate[0]

    cell4.innerHTML = finalDate
  }
}

window.onload = function() {
  loadXML()
}

function searchFilms(){
  var filmFilter = document.getElementById('film')
  var userSelection = filmFilter.options[filmFilter.selectedIndex].text
  var films = document.getElementsByClassName("films")

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
console.log(userSelection)
console.log(ratings)
  for(i=0; i< ratings.length; i++){
    var rows = ratings[i].parentNode
    var rating = ratings[i].innerHTML
    if(rating !== userSelection){
      rows.classList.remove("ok");
      rows.classList.add("no");
    }
  }
}


document.getElementById("films").addEventListener('click',function (){
  console.log('clicked')
    var rows = document.getElementsByClassName('no')
    // console.log()
    // for(i=0; i<rows.length; i++){
    //   console.log(rows[i])
    //   rows[i].className = "ok"
    // }
    // rows.className.remove("no");
    // rows.className = "ok"

//     // var rows = document.getElementsByClassName('no')
//     // console.log(rows)
//     // rows.className = "ok"
//     // console.log(rows)
//     // var films = document.getElementsByClassName("films")

   })
