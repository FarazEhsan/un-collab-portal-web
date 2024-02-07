"use client";
import React, {useState} from "react";
import Badge from "@/components/badge";
import ProjectSlideOver from "@/components/overlays/project-slide-over";


export type Project = {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    relatedSDGs: SDG[];
    pictures: [string];
};

export type SDG = {
    name: string;
};

interface ProjectCardProps {
    project: Project,
    onUpdateProfile: () => void
}

const ProjectCard = ({project, onUpdateProfile}: ProjectCardProps) => {
    const [open, setOpen] = useState(false);
    const [openCarouselModal, setOpenCarouselModal] = useState(false);
    console.log(project)
    return (
        <div
            className="relative h-fit bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-950 cursor-pointer">
            <div className="m-4" onClick={() => setOpen(!open)}>
                {
                    project?.pictures?.length ? (
                        <div className="h-56 mb-4">
                            <img
                                src={project?.pictures[0]}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        ''
                    )
                }
                <div className="cursor-pointer">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                        {project?.name}
                    </h3>
                    <div className="mb-1">
                        <div
                            className="text-sm leading-6 text-gray-900 dark:text-gray-100">
                            {project?.startTime} - {project?.endTime}
                        </div>
                    </div>
                    <div className="my-2">
                        {project?.relatedSDGs?.map((sdg, index) => (
                            <Badge key={index} text={sdg?.name}
                                   classNames="mr-2 my-1"/>
                        ))}
                    </div>
                    <div className="my-2">
                        <p className="text-sm leading-6 text-gray-400 ">
                            {project?.description?.length > 100
                                ? project?.description?.substring(0, 100) + "..."
                                : project?.description}
                        </p>
                    </div>

                    {
                        project?.description?.length > 100 ?
                            (
                                <p className="hover:underline cursor-pointer text-sm leading-6 text-gray-400 ">
                                    Read more.
                                </p>
                            )
                            :
                            ''
                    }

                </div>
            </div>
            <ProjectSlideOver open={open} setOpen={setOpen} project={project}
                              onUpdateProfile={onUpdateProfile}/>
        </div>
    );
};

export default ProjectCard;
