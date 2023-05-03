import { Canvas } from "./Canvas.js";

const state = {
  color: "#00ff00",
  size: 50,
  shape: "circle"
};
const shapes = [];

const toolbarElement = document.querySelector("#toolbar");
const sizeOutputElement = document.querySelector("#size-output");
const shapeElements = document.querySelectorAll(".shape");
const canvasElement = document.querySelector("#canvas");

const canvas = new Canvas(canvasElement.getContext("2d"));

toolbarElement.addEventListener("input", handleToolbarInput);
canvasElement.addEventListener("click", handleCanvasClick);
canvasElement.addEventListener("mousemove", handleCanvasMouseMove);
window.addEventListener("resize", handlePageResize);

updateToolbarUI();
setCanvasSize();

function handleToolbarInput(event) {
  const name = event.target.name;
  const value =
    event.target.type === "range"
      ? event.target.valueAsNumber
      : event.target.value;

  state[name] = value;

  updateToolbarUI();
}

function handleCanvasClick(event) {
  const canvasRect = canvasElement.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;

  const newShape = {
    type: state.shape,
    size: state.size,
    color: state.color,
    x,
    y
  };

  shapes.push(newShape);
  canvas.render(shapes);
}

function handleCanvasMouseMove(event) {
  const canvasRect = canvasElement.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;

  const tempShape = {
    type: state.shape,
    size: state.size,
    color: state.color,
    opacity: 0.5,
    x,
    y
  };

  canvas.render([...shapes, tempShape]);
}

function handlePageResize() {
  setCanvasSize();
}

function updateToolbarUI() {
  sizeOutputElement.textContent = state.size;

  shapeElements.forEach((shapeElement) => {
    shapeElement.style.backgroundColor = state.color;
  });
}

function setCanvasSize() {
  const canvasRect = canvasElement.getBoundingClientRect();

  canvasElement.style.width = `${canvasRect.width}px`;
  canvasElement.style.height = `${canvasRect.height}px`;
  canvasElement.width = canvasRect.width;
  canvasElement.height = canvasRect.height;
}
