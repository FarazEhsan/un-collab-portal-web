import SingleColumnContainer
    from '@/components/navigation/singleColumnContainer';
import {Carousel} from "flowbite-react";

export default function Home() {
    const RadioData = [
        {id: 'email', title: 'Email'},
        {id: 'sms', title: 'Phone (SMS)'},
        {id: 'push', title: 'Push notification'},
    ]
    const CheckData = [
        {id: 'email1', title: 'Email', checked: true},
        {id: 'sms1', title: 'Phone (SMS)', checked: false},
        {id: 'push1', title: 'Push notification', checked: true},
    ]

    const images = ['https://source.unsplash.com/random', 'https://source.unsplash.com/random']
    return (
        <SingleColumnContainer>

            {/*<ImageCarousel>*/}
            {/*    {[...images.map((s) => (*/}
            {/*        <img src={s} className="object-contain"/>*/}
            {/*    ))]}*/}
            {/*</ImageCarousel>*/}


                <Carousel slide={false}>
                    <div className="flex items-center justify-center">
                        <img src="https://source.unsplash.com/random/1300x1300" className="
                        object-contain"/>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src="https://source.unsplash.com/random/500x300" className="
                        object-contain"/>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src="https://source.unsplash.com/random/300x500" className="
                        object-contain"/>
                    </div>
                </Carousel>

        </SingleColumnContainer>
    )
}
