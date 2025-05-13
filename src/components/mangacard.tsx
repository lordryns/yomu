import { Card, 
    CardBody, CardFooter, Image, Tooltip, Button } from '@heroui/react'

import { Icon } from "@iconify/react";


export default function MangaCard(props: any) {
  return (
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
          <CardFooter className="pt-0 justify-end">
            <Tooltip content="Add to collection">
              <Button isIconOnly variant="light" radius="full" size="sm">
                <Icon className="text-blue-500" icon="material-symbols:bookmark-outline" width={18} />
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>

  )
}
