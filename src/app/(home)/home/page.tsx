'use client'
import TwoColumnContainer from "@/components/navigation/twoColumnContainer";
import PostCard from "@/components/cards/post-card";
import {useState} from "react";
import CreatePostSlideOver from "@/components/overlays/create-post-slide-over";

export default function Home() {
    const [openCreatePostSlideOver, setOpenCreatePostSlideOver] = useState(false);
    const secondaryColumnContent =
        <div>
            <button
                onClick={() => setOpenCreatePostSlideOver(!openCreatePostSlideOver)}
                className="bg-custom-orange hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-custom-orange text-gray-900 rounded-md font-semibold py-2 px-3 w-full">
                Create New Post
            </button>
            <CreatePostSlideOver open={openCreatePostSlideOver} setOpen={setOpenCreatePostSlideOver}/>
        </div>

    return (
        <TwoColumnContainer secondaryContent={secondaryColumnContent}>
            {/*{*/}
            {/*    selectedData?.map(item => (*/}
            {/*        <div key={item.id}>{item.name}</div>*/}
            {/*    ))*/}
            {/*}*/}
            {/* <ComboBox multiple={false} items={people} selectedData={selectedPerson} setSelectedData={setSelectedPerson} label='Single Select'/>
            <ComboBox multiple={true} items={people} selectedData={selectedPeople} setSelectedData={setSelectedPeople} label='Multi Select'/> */}
            <PostCard/>
            <div className="mt-6"></div>
            <PostCard/>
        </TwoColumnContainer>
    )
}
