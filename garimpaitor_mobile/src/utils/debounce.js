const debouce = (fnc, delay = 500) => {
  setTimeout(fnc, delay);
}

export default debouce;