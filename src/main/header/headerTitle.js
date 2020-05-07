import './headerTitle.css'

class HeaderTitle {
  render() {
    const body = document.querySelector('body')
    const header = document.createElement('header')
    header.id = 'header'
    header.innerHTML = '<h1>마스크 어디?</h1>'
    header.innerHTML += '<p>< <strong>Mask O</strong>r <strong>D</strong>isease ></p>'

    body.appendChild(header)
  }
}

export default HeaderTitle