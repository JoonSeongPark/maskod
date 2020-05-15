import title from "./title/title";
import AddressSelect from "./addressSelect/addressSelect";
import AddressType from "./addressType/addressType";

import "./header.css";

const header = () => {
  const body = document.querySelector("body");
  const header = document.createElement("header");
  body.appendChild(header);

  title();

  const addressSelect = new AddressSelect();
  addressSelect.render();
  addressSelect.setTopArea();
  // addressSelect.eventListener();

  const addressType = new AddressType();
  addressType.render();

  header.innerHTML += `
  <hr style="width: 90vw; max-width: 1200px;" />
  `;
};

export default header;
