import { useState, useEffect, useRef } from 'react'
import { 
    addToast, Input, Button,
    Navbar, NavbarBrand, 
    NavbarContent, Spinner, Alert
} from '@heroui/react'
import {Icon} from "@iconify/react";

import MangaCard from './components/mangacard.tsx'

import { getMangaList, searchManga } from './manga.ts'

import InstallPrompt from './components/installapp.tsx'

interface Manga {
  title: string, 
  author: string, 
  image: string, 
  rating: any
}

let offlineMangaList: any = []

if (localStorage.getItem("bookmarks")){
  offlineMangaList = JSON.parse(localStorage.getItem("bookmarks") || '[]');
}

function App() {
  // welcome toast
  const showWelcomeToast = useRef(true); 

  const [mangaData, updateMangaData]: any  = useState(null); 
  const [errorState, updateErrorState]: any = useState(false);

  const [search, updateSearch]: any = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      getMangaList().then(res => {
        updateMangaData(res.data);

        if (showWelcomeToast.current){
            if (res.success){
              addToast({
                title: "Welcome back!", 
                color: 'primary',
                variant: 'solid', 
                timeout: 2000
              })
            } else {
              addToast({
                title: "You are currently offline!",
                variant: 'solid',
                color: 'warning',
                timeout: 2000
              })
            }

      showWelcomeToast.current = false;
    } 

      updateErrorState(!res.success);
    })

      }, [])

   


  let content; 

  if (!errorState){
  
    if (loading || !mangaData?.data) {
      content = (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner />
      </div> 
      );
    } else {
      content = (
        <>
            {
            mangaData.data.map((manga: any, _: any) => {
              return <MangaCard 
            title={manga.title} 
            author={manga?.authors?.[0]?.name ? manga.authors[0].name : "Unknown"}
            image={manga.images.jpg.image_url}
            rating={manga.score}
            offline={false}
            onBookmark = {() => {
                  offlineMangaList.push({
                    title: manga.title,
                    author: manga.authors[0]?.name ?  manga.authors[0].name : "Unknown",
                    image: manga.images.jpg.image_url,
                    rating: manga.score

                  })

                  localStorage.setItem("bookmarks", JSON.stringify(offlineMangaList))
                  addToast({
                    title: "Bookmarked!", 
                    description: `${manga.title} bookmarked successfully!`, 
                    timeout: 3000, 
                    shouldShowTimeoutProgress: true,
                    color: 'success'
                  })
                }}
          />

            })
          }    
        </>
        )
    }
  } else {
      const storedBookmarks = localStorage.getItem("bookmarks");
      if (storedBookmarks){
      const parsedMangaList : any = JSON.parse(storedBookmarks);
        content = (
          <>
            <div className="w-full flex justify-end p-3">
              <Button color="danger" onClick={() => {
                  localStorage.clear();
                  offlineMangaList = []; 
                  window.location.reload();
              
            }}>Remove all</Button>
          </div>
            {
              parsedMangaList.slice().reverse().map((manga: Manga, _: any) => {
                return <MangaCard
                  title={manga.title} 
                  author={manga.author}
                  image={manga.image}
                  rating={manga.rating}
                  offline={true}/>

            })
          }
          </>
          )
    } else {
      content = (
          <>
            <div className="fixed inset-0 flex items-center justify-center">
              <p>Nothing to see here...</p>
            </div> 

          </>
      )
    }

  }

  
  return (
      <>
      <Alert color="primary"><InstallPrompt />
</Alert>
      <div className="min-h-screen">
      <Navbar maxWidth="xl">
        <NavbarBrand>
          <p className="font-bold text-inherit">Yomu</p>
        </NavbarBrand>
        
          <NavbarContent justify="end">
            <form onSubmit={
              (e) => {
                e.preventDefault();
                setLoading(true);
                searchManga(search).then(res => {

                  if (Array.isArray(res.data.data)) {
                    addToast({
                      title: `Showing results for ${search}`,
                      variant: 'solid',
                      color: 'success'
                    })
                    updateMangaData({data: res.data.data});
                  }
                  setLoading(false);
                })
              }
            }>
             <Input
                classNames={{
                  base: "max-w-xs",
                  inputWrapper: "h-9",
                }}
                placeholder="Search..."
                startContent={<Icon icon="lucide:search" className="text-default-400" width={18} />}
                type="search"
                onChange={
                  (e) => {
                    updateSearch(e.target.value)
                  }
                }
              />

            </form>
          </NavbarContent>
      </Navbar>



        <div className="max-w-md mx-auto">
          {content}
        </div>


    </div>
      </>
    );
}

export default App;
