import { Card, CardBody, CardFooter, Image, Tooltip, Button, useDisclosure } from '@heroui/react'

import { Icon } from "@iconify/react";

import MangaModal from './mangamodal.tsx';

export default function MangaCard(props: any) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <Card className="overflow-hidden m-4">
          <CardBody className="p-0 overflow-visible">
            <div className="relative">
              <Image
                alt="Manga cover"
                className="w-full object-cover h-[200px]"
                src={props.image}
                removeWrapper
              />
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-medium font-semibold">{props.title}</h4>
                  <p className="text-tiny text-default-500">{props.author}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:star" className="text-warning" />
                  <span className="text-tiny">{props.rating}</span>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0 justify-between">
          {props.offline ? "" : <Button onPress={onOpen} isIconOnly variant="light" radius="full" size="sm">
          <Icon className="text-blue-500" icon="material-symbols:expand-content" width={22} />
            </Button>}
          <Tooltip content="Add to collection">
              <Button onClick={() => {
                if (!props.offline){
              props.onBookmark();
            } else {

            }
          }} isIconOnly variant="light" radius="full" size="sm">
                {!props.offline ?    <Icon className="text-blue-500" icon="material-symbols:bookmark-outline" width={18} />
           :          <Icon className="text-blue-500" icon="material-symbols:delete-outline" width={18} />
 
            }
            </Button>
            </Tooltip>
          </CardFooter>
        </Card>

      <MangaModal isOpen={isOpen} onOpenChange={onOpenChange} author={props.author}
        title={props.title} synopsis={props.synopsis} image={props.image} themes={props.themes}
        status={props.status} genres={props.genres} rating={props.rating}
      />

    </>
  )
}
