import { mapDiv } from "../index.js";
import { inputLogic } from "../Input logiс/dropdown.js";
import { inputLogic2 } from "../Input logiс/dropdown2.js";
import { closeLogic } from "../Input logiс/closeDropDown1.js";
import { closeLogic2 } from "../Input logiс/closeDropDown2.js";
import { arrowLogicUp } from "../Input logiс/arrowsLogicUp.js";
import { arrowLogicUp2 } from "../Input logiс/arrowsLogicUp2.js";
import { mouseNavigation } from "../Input logiс/mouseClick.js";
import { mouseNavigation2 } from "../Input logiс/mouseClick2.js";
import { autocomplete } from "../Input logiс/autoComplete.js";
import { autocomplete2 } from "../Input logiс/autoComplete2.js";
import { map } from "../Map Options/map_options.js";
import { myMarkers } from "../markers/cities.js";

/* DOM elements */
let container = document.createElement("div");
let row = document.createElement("div");
let col1 = document.createElement("div");
let col2 = document.createElement("div");
let row2 = document.createElement("div");
let col1row1 = document.createElement("div");
let col1row2 = document.createElement("div");
let input = document.createElement("input");
let input2 = document.createElement("input");

/* initialise counter */
let i = 0;

/* DOM test text */
let text = document.createTextNode("TEST");
let text2 = document.createTextNode("TEST");

/* DOM classes */
container.classList.add("container");
row.classList.add("row");
col1.classList.add("col");
col2.classList.add("col");
row2.classList.add("row");
col1row1.classList.add("col");
col1row2.classList.add("col");

/* DOM Ids' */
input.id = "input";
input2.id = "input2";
col1row1.id = "col1row1";
col1row2.id = "col1row2";

/* DOM attributes */
input.setAttribute("type", "search");
input.setAttribute("autocomplete", "off");
input.setAttribute("placeholder", "From");
input2.setAttribute("type", "search");
input2.setAttribute("autocomplete", "off");
input2.setAttribute("placeholder", "To");

/* Append to col1row1-2 */
col1.append(input);
col2.append(input2);

/* Append to row2 */
row.append(col1);
row.append(col2);

/* Append to container */
container.append(row);

/* Append text to row2 */
// col1row1.append(text);
// col1row2.append(text2);

/* Append to row2 */
row2.append(col1row1);
row2.append(col1row2);

/* Append to container */
container.append(row2);

/* initialise DOM function */
function dom(map) {
  /* import first input logic */
  inputLogic();
  closeLogic();
  arrowLogicUp(i, map);
  mouseNavigation(map);
  autocomplete(map);

  /* import Second input logic */
  inputLogic2();
  closeLogic2();
  arrowLogicUp2(i, map);
  mouseNavigation2(map);
  autocomplete2(map);

  /* My cities */
  myMarkers(map);

  /* Append to divMap */
  mapDiv.append(container);
}

export {
  dom,
  container,
  row,
  col1,
  col2,
  row2,
  col1row1,
  col1row2,
  input,
  input2,
  text,
  text2,
  i,
};
