import { useState, useEffect, useRef } from 'react'
import { 
    addToast, Input, 
    Navbar, NavbarBrand, 
    NavbarContent, Spinner
} from '@heroui/react'
import {Icon} from "@iconify/react";

import MangaCard from './components/mangacard.tsx'

import { getMangaList } from './manga.ts'


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

      console.log("Error state from func: ", res.success)
      updateErrorState(!res.success);
    })

      }, [])

   


  let content; 

  if (!errorState){
    
  
    if (!mangaData?.data?.[0]?.title) {
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
            author={manga.authors[0].name}
            image={manga.images.jpg.image_url}
            rating={manga.score}
            offline={false}
            onBookmark = {() => {
                  offlineMangaList.push({
                    title: manga.title,
                    author: manga.authors[0].name,
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
      <div className="min-h-screen">
      <Navbar maxWidth="xl">
        <NavbarBrand>
          <p className="font-bold text-inherit">Yomu</p>
        </NavbarBrand>
        
          <NavbarContent justify="end">
          <Input
            classNames={{
              base: "max-w-xs",
              inputWrapper: "h-9",
            }}
            placeholder="Search..."
            startContent={<Icon icon="lucide:search" className="text-default-400" width={18} />}
            type="search"
          />
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
