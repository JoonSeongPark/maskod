import "./title.css";

const title = () => {
  const header = document.querySelector("header");
  const title = document.createElement("div");
  title.classList.add("title");

  title.innerHTML = `
  <h1>마스크 어디?</h1>
  <p>< <strong>Mask O</strong>r <strong>D</strong>isease ></p>
  `;
  header.appendChild(title);
};

export default title;
