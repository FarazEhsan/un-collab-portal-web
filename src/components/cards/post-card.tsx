'use client'
import React, {useState} from 'react';
import CarouselModal from "@/components/modals/carousel-modal";
import CommentSection from "@/components/cards/comment-section";


const data = {
    heroImage: 'https://source.unsplash.com/random',
    username: 'Username',
    time: '2 hours ago',
    title: 'Post Title...',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur faucibus tortor, id finibus lectus auctor in. Vivamus luctus iaculis dui, id posuere eros congue aliquam. In lobortis gravida iaculis. Vestibulum at ultricies arcu, eu scelerisque sem. Praesent in massa bibendum, egestas libero a, dignissim urna. Duis in mollis est. Nunc feugiat ipsum cursus urna vestibulum, sed fermentum eros mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    comments: [
        {
            id: 1,
            parentId: null,
            comment: 'comment 1',
            user: 'user1',
        }, {
            id: 2,
            parentId: 1,
            comment: 'comment 2: child comment of 1',
            user: 'user2',
        }, {
            id: 3,
            parentId: 2,
            comment: 'comment 3: child comment of 2',
            user: 'user3',
        }, {
            id: 4,
            parentId: null,
            comment: 'comment 4',
            user: 'user4',
        }, {
            id: 5,
            parentId: 2,
            comment: 'comment 5: child comment of 2',
            user: 'user5',
        }, {
            id: 6,
            parentId: 5,
            comment: 'comment 6: child comment of 5',
            user: 'user6',
        },{
            id: 7,
            parentId: 6,
            comment: 'comment 7: child comment of 6',
            user: 'user7',
        },
    ]
}


const PostCard = () => {
    const [openCarouselModal, setOpenCarouselModal] = useState(false)
    return (
        <div
            className="dark:bg-gray-900 dark:hover:bg-gray-800 hover:bg-gray-200 bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-950 p-4">
            {/*Image*/}


            {/*Post Body*/}
            <div className="">
                <div className="flex flex-row items-center">
                    <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <div className="ml-2">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Username</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2
                            hours ago</p>
                    </div>

                </div>
                    <h2 className="mt-4 text-lg font-medium leading-7 text-gray-900 dark:text-gray-100">Title...</h2>

            </div>

            <div onClick={() => setOpenCarouselModal(!openCarouselModal)}
                 className="h-96 rounded-md">
                <img
                    src="https://source.unsplash.com/random/300x500"
                    className="h-full w-full object-contain rounded-md"
                />
                <CarouselModal open={openCarouselModal}
                               setOpen={setOpenCarouselModal}/>
            </div>

            <div className="mt-6">
                <p className="text-base leading-6 text-gray-800 dark:text-gray-200">{(data.description.substring(0, 225) + '...')}</p>
            </div>

            {/*Reactions*/}
            <div>

            </div>

            {/*Comments*/}
            {/*<div className="mt-6">*/}
            {/*    <CommentSection comments={data.comments}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default PostCard;