// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
// let flightPath
let markers = [];
let markers2 = [];
let arrayOne = [];
setInterval(() => {
  console.log(arrayOne);
}, 1000);
let arrayTwo = [];
// setInterval(() => {
//   console.log(arrayTwo)
// }, 1000);
let flightPaths = [];
setInterval(() => {
  // console.log(flightPaths);
}, 1000);

let arr = [
  "Aktau",
  "Aktobe",
  "Almaty",
  "Atyrau",
  "Bishkek",
  "Dubai",
  "Istanbul",
  "Karaganda",
  "Kostanay",
  "Kutaisi",
  "Kyzylorda",
  "Moscow",
  "Novosibirsk",
  "Nur-Sultan",
  "Omsk",
  "Pavlodar",
  "Semey",
  "Shymkent",
  "Tashkent",
  "Turkistan",
  "Uralsk",
];

function initMap() {
  const sydney = new google.maps.LatLng(-33.867, 151.195);

  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 5,
    mapId: "1d9c2ce4e4c0cfaa",
    disableDefaultUI: true,
  });

  let input = document.createElement("input");
  let input2 = document.createElement("input");
  input2.id = "secondInput";
  input2.setAttribute("type", "search");
  input2.setAttribute("placeholder", "To");
  input2.setAttribute("autocomplete", "off");
  input.id = "firstInput";
  input.setAttribute("type", "search");
  input.setAttribute("placeholder", "From");
  input.setAttribute("autocomplete", "off");
  let div = document.createElement("div");
  div.id = "hideThis";
  let div2 = document.createElement("div");
  div2.id = "hideThis2";
  let i = 0;
  let body = document.body;
  body.append(input, div, input2, div2);
  service = new google.maps.places.PlacesService(map);
  // Sets the map on all markers in the array.

  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  function setMapOnAll2(map) {
    for (let i = 0; i < markers2.length; i++) {
      markers2[i].setMap(map);
    }
  }
  const imageStatic = {
    url: "./Red_Circle(small).svg",
    scaledSize: new google.maps.Size(12, 25), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(-6, 0), // anchor
    labelOrigin: new google.maps.Point(59, 20),
  };

  const imageFluctuate = {
    url: "./hotspot_pulse.gif",
    scaledSize: new google.maps.Size(23, 25), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
    labelOrigin: new google.maps.Point(65, 20),
  };
  /* Event Event Event Event Event Event Event Event Event */

  input.addEventListener(
    "keyup",
    (e) => {
      div.textContent = "";

      if (e.keyCode === 8) {
        e.target.value = "";
      }
      if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
        i = 0;
      }

      let result = arr.filter((arr) =>
        arr.toLowerCase().includes(e.target.value.toLowerCase())
      );

      result.forEach((element) => {
        let createDivForResultes = document.createElement("div");
        createDivForResultes.id = "colorIt";
        let createTextForDiv = document.createTextNode(element);
        createDivForResultes.append(createTextForDiv);
        div.append(createDivForResultes);
      });

      if (result) {
        e.target.setAttribute("maxlength", result[0].length);
      }
      if (e.target.value === "") {
        div.textContent = "";
        // marker.setMap(null);
      }

      try {
        if (e.keyCode == 40 && i <= div.children.length) {
          div.children[i].style.backgroundColor = "LightSalmon";
          i++;
        }
        if (e.keyCode === 13 && arrayOne.length < 1) {
          e.target.value = div.children[i - 1].innerText;

          /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */

          service.findPlaceFromQuery(
            {
              query: div.children[i - 1].innerText,
              fields: ["name", "geometry"],
            },
            (results, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                marker = new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                });
                arrayOne.push(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                markers.push(marker);
              }
            }
          );
          /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */
          div.textContent = "";
        }
      } catch (error) {
        i = div.children.length + 1;
      }

      try {
        if (e.keyCode == 38 && i >= 0) {
          div.children[i - 2].style.backgroundColor = "LightSalmon";

          i--;
        }
      } catch (error) {
        i = 0;
      }

      for (let f = 0; f < div.children.length; f++) {
        div.children[f].addEventListener(
          "mouseenter",
          (e) => {
            e.target.style.backgroundColor = "LightSalmon";
          },
          false
        );
        div.children[f].addEventListener(
          "mouseleave",
          (e) => {
            e.target.style.backgroundColor = "white";
          },
          false
        );
        div.children[f].addEventListener(
          "click",
          (e) => {
            input.value = e.target.innerText;

            if (arrayOne.length < 1) {
              /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */

              service.findPlaceFromQuery(
                {
                  query: e.target.innerText,
                  fields: ["name", "geometry"],
                },
                (results, status) => {
                  if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    results
                  ) {
                    marker = new google.maps.Marker({
                      map,
                      position: results[0].geometry.location,
                    });
                    arrayOne.push(results[0].geometry.location);
                    map.setCenter(results[0].geometry.location);
                    markers.push(marker);
                  }
                }
              );

              /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */
              div.textContent = "";
            }
          },
          false
        );
      }

      if (result.length === 1) {
        e.target.value = result;

        if (e.keyCode === 13 && arrayOne.length < 1) {
          /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */
          service.findPlaceFromQuery(
            {
              query: e.target.value,
              fields: ["name", "geometry"],
            },
            (results, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                marker = new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                });
                arrayOne.push(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                markers.push(marker);
              }
            }
          );

          /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */
          div.textContent = "";
        }
      }
    },
    false
  );

  /* Triggers Triggers Triggers Triggers Triggers */
  /* Triggers Triggers Triggers Triggers Triggers */
  input.addEventListener("input", (e) => {
    if (e.target.value === "") {
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        input2.value = "";
        div.textContent = "";
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
  });
  input.addEventListener("click", (e) => {
    if (e.target.value === "") {
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        input2.value = "";
        div.textContent = "";
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.keyCode === 8) {
      div.textContent = "";
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
    if (e.target.value === "") {
      // marker.setMap(null);
      div.textContent = "";
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
  });
  input.addEventListener("keypress", (e) => {
    if (e.target.value === "") {
      // marker.setMap(null);
      div.textContent = "";
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
    if (e.keyCode === 8) {
      div.textContent = "";
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
  });
  input.addEventListener("keyup", (e) => {
    if (e.target.value === "") {
      div.textContent = "";
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
    if (e.keyCode === 8) {
      div.textContent = "";
      function hideMarkers() {
        setMapOnAll(null);
        setMapOnAll2(null);
        arrayOne = [];
      }
      function deleteMarkers() {
        hideMarkers();
        markers = [];
        markers2 = [];
      }
      deleteMarkers();
    }
  });
  /* Second input */

  input2.addEventListener(
    "keyup",
    (e) => {
      div2.textContent = "";

      if (e.keyCode === 8) {
        e.target.value = "";
      }
      if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
        i = 0;
      }

      let result2 = arr.filter((arr) =>
        arr.toLowerCase().includes(e.target.value.toLowerCase())
      );

      result2.forEach((element) => {
        let createDivForResultes2 = document.createElement("div");
        createDivForResultes2.id = "colorIt2";
        let createTextForDiv2 = document.createTextNode(element);
        createDivForResultes2.append(createTextForDiv2);
        div2.append(createDivForResultes2);
      });

      if (result2) {
        e.target.setAttribute("maxlength", result2[0].length);
      }
      if (e.target.value === "") {
        div2.textContent = "";
        // marker2.setMap(null);
      }

      try {
        if (e.keyCode == 40 && i <= div2.children.length) {
          div2.children[i].style.backgroundColor = "LightSalmon";
          i++;
        }
        if (e.keyCode === 13) {
          e.target.value = div2.children[i - 1].innerText;

          /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */

          service.findPlaceFromQuery(
            {
              query: div2.children[i - 1].innerText,
              fields: ["name", "geometry"],
            },
            (results, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                marker2 = new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                });
                arrayTwo.push(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                markers2.push(marker2);

                const flightPlanCoordinates = [
                  arrayOne[arrayOne.length - 1].toJSON(),
                  results[0].geometry.location,
                ];

                const flightPath = new google.maps.Polyline({
                  path: flightPlanCoordinates,
                  geodesic: true,
                  strokeColor: "#FF0000",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                });

                flightPaths.push(flightPath);

                flightPath.setMap(map);

                input2.oninput = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };

                input2.onchange = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
                input2.onkeydown = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
                input2.onkeyup = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
                input2.onkeypress = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
                input.oninput = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                    arrayOne = [];
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };

                input.onchange = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                    arrayOne = [];
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
                input.onkeydown = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                    arrayOne = [];
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
                input.onkeyup = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                    arrayOne = [];
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
                input.onkeypress = (e) => {
                  if (e.target.value === "") {
                    flightPath.setMap(null);
                    arrayOne = [];
                  }
                  if (arrayOne.length === 0) {
                    flightPath.setMap(null);
                  }
                };
              }
            }
          );
          /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */
          div2.textContent = "";
        }
      } catch (error) {
        i = div2.children.length + 1;
      }
      try {
        if (e.keyCode == 38 && i >= 0) {
          div2.children[i - 2].style.backgroundColor = "LightSalmon";

          i--;
        }
      } catch (error) {
        i = 0;
      }

      for (let f = 0; f < div2.children.length; f++) {
        div2.children[f].addEventListener(
          "mouseenter",
          (e) => {
            e.target.style.backgroundColor = "LightSalmon";
          },
          false
        );
        div2.children[f].addEventListener(
          "mouseleave",
          (e) => {
            e.target.style.backgroundColor = "white";
          },
          false
        );
        div2.children[f].addEventListener(
          "click",
          (e) => {
            input2.value = e.target.innerText;

            /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */

            service.findPlaceFromQuery(
              {
                query: e.target.innerText,
                fields: ["name", "geometry"],
              },
              (results, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  results
                ) {
                  marker2 = new google.maps.Marker({
                    map,
                    position: results[0].geometry.location,
                  });
                  arrayTwo.push(results[0].geometry.location);
                  map.setCenter(results[0].geometry.location);
                  markers2.push(marker2);

                  const flightPlanCoordinates = [
                    arrayOne[arrayOne.length - 1].toJSON(),
                    results[0].geometry.location,
                  ];

                  const flightPath = new google.maps.Polyline({
                    path: flightPlanCoordinates,
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                  });

                  flightPaths.push(flightPath);

                  flightPath.setMap(map);

                  input2.oninput = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };

                  input2.onchange = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                  input2.onkeydown = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                  input2.onkeyup = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                  input2.onkeypress = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                  input.oninput = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                      arrayOne = [];
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };

                  input.onchange = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                      arrayOne = [];
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                  input.onkeydown = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                      arrayOne = [];
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                  input.onkeyup = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                      arrayOne = [];
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                  input.onkeypress = (e) => {
                    if (e.target.value === "") {
                      flightPath.setMap(null);
                      arrayOne = [];
                    }
                    if (arrayOne.length === 0) {
                      flightPath.setMap(null);
                    }
                  };
                }
              }
            );

            /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */
            div2.textContent = "";
          },
          false
        );
      }

      if (result2.length === 1) {
        e.target.value = div2.lastElementChild.innerText;

        if (e.keyCode === 13 && flightPaths.length < 1) {
          /* SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE SERVICE */
          service.findPlaceFromQuery(
            {
              query: e.target.value,
              fields: ["name", "geometry"],
            },
            (results, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                marker2 = new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                });
                arrayTwo.push(results[0].geometry.location);
                map.setCenter(results[0].geometry.location);
                markers2.push(marker2);

                const flightPlanCoordinates = [
                  arrayOne[arrayOne.length - 1].toJSON(),
                  results[0].geometry.location,
                ];

                const flightPath = new google.maps.Polyline({
                  path: flightPlanCoordinates,
                  geodesic: true,
                  strokeColor: "#FF0000",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                });

                flightPaths.push(flightPath);
                console.log(flightPaths);
                console.log(flightPaths.length);

                flightPath.setMap(map);

                // flightPaths.slice(-1).setMap(map);
                /*
                let arry = [2, 4, 6, 8, 10, 12, 14, 16];
                console.time("array length property");
                let lastElement = arry[arry.length - 1];
                console.log(lastElement);
                console.timeEnd("array length property");
                */
                /*
                console.time("array slice method");
                let lastElement1 = arry.slice(-1);
                console.log(lastElement1);
                console.timeEnd("array slice method");
                */
                /*
                console.time("array pop method");
                let lastElement2 = arry.pop();
                console.log(lastElement2);
                console.timeEnd("array pop method");
                */

                // flightPaths[flightPaths.length - 1].setMap(map);

                // flightPaths.slice(-1).setMap(map);

                input2.oninput = (e) => {
                  if (e.target.value === "") {
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                  }
                };

                input2.onchange = (e) => {
                  if (e.target.value === "") {
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                  }
                };
                input2.onkeydown = (e) => {
                  if (e.target.value === "") {
                    // flightPaths[0].setMap(null);
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                    // flightPaths[0].setMap(null);
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                };
                input2.onkeyup = (e) => {
                  if (e.target.value === "") {
                    // flightPaths[0].setMap(null);
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                    // flightPaths[0].setMap(null);
                  }
                };
                input2.onkeypress = (e) => {
                  if (e.target.value === "") {
                    // flightPaths[0].setMap(null);
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                    // flightPaths[0].setMap(null);
                  }
                };
                input.oninput = (e) => {
                  if (e.target.value === "") {
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                  }
                };

                input.onchange = (e) => {
                  if (e.target.value === "") {
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                  }
                };
                input.onkeydown = (e) => {
                  if (e.target.value === "") {
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                  }
                };
                input.onkeyup = (e) => {
                  if (e.target.value === "") {
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                  }
                };
                input.onkeypress = (e) => {
                  if (e.target.value === "") {
                    try {
                      flightPaths[0].setMap(null);
                    } catch (error) {}

                    flightPaths = [];
                  }
                  if (arrayOne.length === 0) {
                  }
                };
              }
            }
          );
          div2.textContent = "";
        }
      }
    },
    false
  );

  /* Triggers Triggers Triggers Triggers Triggers */
  input2.addEventListener("input", (e) => {
    if (e.target.value === "") {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();
        flightPaths = [];
        markers2 = [];
      }
      deleteMarkers();
      // arrayOne = []
      // arrayTwo = []
      // flightPath.setMap(null);
    }
  });
  input2.addEventListener("click", (e) => {
    if (e.target.value === "") {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();
        flightPaths = [];
        markers2 = [];
      }
      deleteMarkers();
      // arrayOne = []
      // arrayTwo = []
      // flightPath.setMap(null);
    }
  });
  /* Triggers Triggers Triggers Triggers Triggers */

  input2.addEventListener("keydown", (e) => {
    if (e.keyCode === 8) {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();

        markers2 = [];
      }
      deleteMarkers();
    }
    if (e.target.value === "") {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();

        markers2 = [];
      }
      deleteMarkers();
    }
  });
  input2.addEventListener("keypress", (e) => {
    if (e.target.value === "") {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();

        markers2 = [];
      }
      deleteMarkers();
    }
    if (e.keyCode === 8) {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();

        markers2 = [];
      }
      deleteMarkers();
    }
  });
  input2.addEventListener("keyup", (e) => {
    if (e.target.value === "") {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();

        markers2 = [];
      }
      deleteMarkers();
    }
    if (e.keyCode === 8) {
      div2.textContent = "";
      function hideMarkers() {
        setMapOnAll2(null);
      }
      function deleteMarkers() {
        hideMarkers();

        markers2 = [];
      }
      deleteMarkers();
    }
  });
}
