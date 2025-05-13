import { useState, useEffect, useRef } from 'react'
import { 
    addToast, Button, Input, 
    Navbar, NavbarBrand, 
    NavbarContent, Spinner
} from '@heroui/react'
import {Icon} from "@iconify/react";

import MangaCard from './components/mangacard.tsx'

import { getMangaList } from './manga.ts'


function App() {
  // welcome toast
  const showWelcomeToast = useRef(true); 

  useEffect(() => {
    if (showWelcomeToast.current) {
      addToast({
        title: "Welcome back!", 
        variant: 'solid',
        color: 'primary', 
        timeout: 2000 
      })
      showWelcomeToast.current = false;
    }
  }, [])


  const [mangaData, updateMangaData] = useState(null); 
  const [errorState, updateErrorState] = useState(false);

  useEffect(() => {
    getMangaList(updateErrorState).then(res => {
      updateMangaData(res);
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
            mangaData.data.map((manga, index) => {
              return <MangaCard 
            title={manga.title} 
            author={manga.authors[0].name}
            image={manga.images.jpg.image_url}
            rating={manga.score}
          />

            })
          }    
        </>
        )
    }
  } else {
    content = "You are currently offline!"
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
