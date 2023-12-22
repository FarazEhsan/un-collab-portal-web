'use client'
import React, {useState} from 'react';
import Badge from "@/components/badge";
import ProjectSlideOver from "@/components/overlays/project-slide-over";
import CarouselModal from "@/components/modals/carousel-modal";


const data = {
    heroImage: 'https://source.unsplash.com/random',
    title: 'ProjectCard Title',
    sdgs: ['sdg1', 'sdg2', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3'],
    timeline: {from: '01/01/2021', to: '01/01/2023'},
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur faucibus tortor, id finibus lectus auctor in. Vivamus luctus iaculis dui, id posuere eros congue aliquam. In lobortis gravida iaculis. Vestibulum at ultricies arcu, eu scelerisque sem. Praesent in massa bibendum, egestas libero a, dignissim urna. Duis in mollis est. Nunc feugiat ipsum cursus urna vestibulum, sed fermentum eros mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}
const images = ['https://source.unsplash.com/random/300x300', 'https://source.unsplash.com/random/450x300']

const ProjectCard = () => {
    const [open, setOpen] = useState(false)
    const [openCarouselModal, setOpenCarouselModal] = useState(false)
    return (
        <div
             className="dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-950 p-4 cursor-pointer">

            <div onClick={() => setOpenCarouselModal(!openCarouselModal)} className="h-56">
                <img
                    src="https://source.unsplash.com/random/300x500"
                    className="h-full w-full object-cover"
                />
                <CarouselModal open={openCarouselModal}
                               setOpen={setOpenCarouselModal}/>
            </div>

            <div className="mt-4" onClick={() => setOpen(!open)}>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">{data.title}</h3>
                <div className="mb-1">
                    <div
                        className="text-sm leading-6 text-gray-900 dark:text-gray-100">{data.timeline.from} - {data.timeline.to}</div>
                </div>
                <div className="my-2">
                    {
                        data.sdgs.map((sdg, index) => (
                            <Badge key={index} text={sdg}
                                   classNames="mr-2 my-1"/>
                        ))
                    }
                </div>
                <div className="my-2">
                    <p className="text-sm leading-6 text-gray-400 ">{data.description.length > 100 ? (data.description.substring(0, 100) + '...') : data.description}</p>
                </div>
                <p className="hover:underline cursor-pointer text-sm leading-6 text-gray-400 ">Read
                    more.</p>
            </div>
            <ProjectSlideOver open={open} setOpen={setOpen}/>
        </div>
    );
};

export default ProjectCard;
