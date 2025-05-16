import {  Image, Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, Button } from "@heroui/react";

export default function MangaModal(props: any) {
  return (
    <>
      <Modal scrollBehavior="inside" backdrop="blur" placement="center" isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {
            (onClose) => (
              <>
              <ModalHeader className="flex flex-col gap-1">
                  {props.title}
                  <Image 
                    src={props.image}                 
                    className="w-full object-cover h-[200px]"
                    altName="Manga image"
                    removeWrapper
                   />

                </ModalHeader>
              <ModalBody>
                  {props.synopsis}
                  <b>Rating: {props.rating}</b>
                  <b>Status: {props.status}</b>
                  <b>Genres: {props.genres.map(genre => genre.name).join(', ')}</b>
                  <b>Author: {props.author}</b>
                  <b>Themes: {props.themes.map(theme => theme.name).join(', ')}</b>
                </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
               
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  )
}
