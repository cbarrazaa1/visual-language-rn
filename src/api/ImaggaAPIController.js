import RNFS from 'react-native-fs';
const API_KEY = 'acc_74b580248e8ed72';
const API_SECRET = 'ac85ceaefb0b4ad6aded52e6ee9b9279';
const API_AUTH =
  'Basic YWNjXzc0YjU4MDI0OGU4ZWQ3MjphYzg1Y2VhZWZiMGI0YWQ2YWRlZDUyZTZlZTliOTI3OQ==';

async function getObjectRecognitionFromURI(imageURI) {
  // first create the image in the api
  const data = await RNFS.readFile(imageURI, 'base64');
  let formData = new FormData();
  formData.append('image_base64', data);

  let response = await fetch('https://api.imagga.com/v2/uploads', {
    method: 'POST',
    headers: {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      Authorization: API_AUTH,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
  let json = await response.json();
  console.log(json);
  const id = json.result.upload_id;

  // recognize image using the id from the api
  response = await fetch(
    `https://api.imagga.com/v2/tags?image_upload_id=${id}&language=es`,
    {
      method: 'GET',
      headers: {
        apiKey: API_KEY,
        apiSecret: API_SECRET,
        Authorization: API_AUTH,
        Accept: 'application/json',
      },
    },
  );
  json = await response.json();
  const tags = json.result.tags;

  // delete the image
  response = await fetch(`https://api.imagga.com/v2/uploads/${id}`, {
    method: 'DELETE',
    headers: {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      Authorization: API_AUTH,
      Accept: 'application/json',
    },
  });
  json = await response.json();

  // return top 5 of array
  return tags.slice(0, 3);
}

export default {
  getObjectRecognitionFromURI,
};
