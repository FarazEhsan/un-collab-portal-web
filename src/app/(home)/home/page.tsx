import TwoColumnContainer from "@/components/navigation/twoColumnContainer";
import PostCard from "@/components/cards/post-card";

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
        <TwoColumnContainer secondaryContent={<div>hello</div>}>
            <PostCard/>
        </TwoColumnContainer>
    )
}
