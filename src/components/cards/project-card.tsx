"use client";
import React, { useState } from "react";
import Badge from "@/components/badge";
import ProjectSlideOver from "@/components/overlays/project-slide-over";
import CarouselModal from "@/components/modals/carousel-modal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";


export type Project = {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  relatedSDGs: SDG[];
};

type SDG = {
  name: string;
};
// const data = {
//     heroImage: 'https://source.unsplash.com/random',
//     title: 'ProjectCard Title',
//     sdgs: ['sdg1', 'sdg2', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3'],
//     timeline: {from: '01/01/2021', to: '01/01/2023'},
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur faucibus tortor, id finibus lectus auctor in. Vivamus luctus iaculis dui, id posuere eros congue aliquam. In lobortis gravida iaculis. Vestibulum at ultricies arcu, eu scelerisque sem. Praesent in massa bibendum, egestas libero a, dignissim urna. Duis in mollis est. Nunc feugiat ipsum cursus urna vestibulum, sed fermentum eros mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
// }
const images = [
  "https://source.unsplash.com/random/300x300",
  "https://source.unsplash.com/random/450x300",
];

const ProjectCard = (project:Project) => {
  const [open, setOpen] = useState(false);
  const [openCarouselModal, setOpenCarouselModal] = useState(false);
  return (
    <div className="relative pt-6 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-950">
      <div className="absolute inset-0 flex items-start justify-end opacity-0 hover:opacity-100">
        <button className="px-4 pt-1 text-custom-blue hover:text-custom-teal font-medium flex items-center">
          <PencilSquareIcon className="h-5 w-5 inline" />
          Edit
        </button>
      </div>

      <div className="m-4" onClick={() => setOpen(!open)}>
        <div className="h-56">
          <img
            src="https://unhabitatstaticfiles.blob.core.windows.net/webfiles/tirana_school_street_programme.jpg"
            className="h-full w-full object-cover"
          />
          <CarouselModal
            open={openCarouselModal}
            setOpen={setOpenCarouselModal}
          />
        </div>

        <div className="mt-4 cursor-pointer">
          <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
            {project.name}
          </h3>
          <div className="mb-1">
            <div className="text-sm leading-6 text-gray-900 dark:text-gray-100">
              {project.startTime} - {project.endTime}
            </div>
          </div>
          <div className="my-2">
            {project.relatedSDGs.map((sdg, index) => (
              <Badge key={index} text={sdg.name} classNames="mr-2 my-1" />
            ))}
          </div>
          <div className="my-2">
            <p className="text-sm leading-6 text-gray-400 ">
              {project.description.length > 100
                ? project.description.substring(0, 100) + "..."
                : project.description}
            </p>
          </div>
          <p className="hover:underline cursor-pointer text-sm leading-6 text-gray-400 ">
            Read more.
          </p>
        </div>
      </div>
      <ProjectSlideOver open={open} setOpen={setOpen} />
    </div>
  );
};

export default ProjectCard;
