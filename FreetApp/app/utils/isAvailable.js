export default isAvailable = (url) => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, 'Request timed out');
  });

  const request = fetch(url);

  return Promise
    .race([timeout, request])
    .then(response => true)
    .catch(error => false);
}
