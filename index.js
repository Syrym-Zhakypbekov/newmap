import { dom } from "./DOM/structure.js";
import { options } from "./Map Options/map_options.js";
import {map} from "./Map Options/map_options.js"
import {createMarkerFromInput} from "./Input logiс/firstTryService.js"

/* DOM create a map */
let mapDiv = document.createElement("div");
mapDiv.id = "map";
document.body.append(mapDiv);

/* Main Function */
window.initMap = function initMap() {
  options();
};

export { mapDiv };
