import axios from 'axios'


export async function getMangaList(errorState: any) {
  let response; 
  try {
    let res = await axios.get("https://api.jikan.moe/v4/manga");
    response = res.data;
  } catch (error: any) {
    errorState(true);
    return error.message
  }

  return response
}
