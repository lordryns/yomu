import axios from 'axios'


export async function getMangaList() {
  let response; 
  try {
    let res = await axios.get("https://api.jikan.moe/v4/manga");
    response = res.data;
  } catch (error: any) {
    return {success: false, data: error.message}
  }

  return {success: true, data: response}
}


export async function searchManga(query: string) {
  let response; 
  try {
    let res = await axios.get(`https://api.jikan.moe/v4/manga?q=${query}`)
    response = res.data;
    
  } catch (error: any) {
    return {success: false, data: error.message}
  }

  return {success: true, data: response}
}
