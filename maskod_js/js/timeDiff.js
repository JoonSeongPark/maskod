// Time expression
function setTimeDiff(time) {
  const now = Date.parse(new Date());
  const date = Date.parse(`${time}`);
  const timeDiff = (now - date) / 1000;
  const sec = 60;
  const min = sec * 60;
  const hour = min * 24;

  if (timeDiff < sec) {
    return `${timeDiff} 초 전`;
  } else if (timeDiff < min) {
    return `${Math.floor(timeDiff / sec)} 분 전`;
  } else if (timeDiff < hour) {
    return `${Math.floor(timeDiff / min)} 시간 전`;
  } else {
    return `${Math.floor(timeDiff / hour)} 일 전`;
  }
}