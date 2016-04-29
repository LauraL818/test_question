function loadXML() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myFunction(xmlhttp);
    }
  };
  xmlhttp.open("GET", "data.xml", true);
  xmlhttp.send();
}

function myFunction(xml) {
  var xmlDoc = xml.responseXML
  var titles = xmlDoc.getElementsByTagName("title")
  var ratings = xmlDoc.getElementsByTagName("rating")
  var providers = xmlDoc.getElementsByTagName("provider")
  var releases = xmlDoc.getElementsByTagName("released")

  for (i = 0; i <titles.length; i++) {
    var table = document.getElementById("movieTable")

    var tr = document.createElement("tr")
    var td = document.createElement("td")
    var td1 = document.createElement("td")
    var td2 = document.createElement("td")
    var td3 = document.createElement("td")

    var txt = document.createTextNode(titles[i].innerHTML)
    var txt1 = document.createTextNode(ratings[i].innerHTML)
    var txt2 = document.createTextNode(providers[i].innerHTML)

    var date =  releases[i].innerHTML
    var newDate = date.split("-")
    var finalDate = newDate[1] + "-" + newDate[2] + "-" + newDate[0]

    var txt3 = document.createTextNode(finalDate)

    td.appendChild(txt)
    td1.appendChild(txt1)
    td2.appendChild(txt2)
    td3.appendChild(txt3)

    tr.appendChild(td)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    table.appendChild(tr)
  }
}

loadXML()
