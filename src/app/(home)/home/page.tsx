'use client'
import TwoColumnContainer from "@/components/navigation/twoColumnContainer";
import PostCard from "@/components/cards/post-card";
import MultiSelectCombobox from "@/components/form/combo-box";
import {useState} from "react";
import Combobox from "@/components/form/combo-box";
import ComboBox from "@/components/form/combo-box";

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
    const people = [
        {id: 1, name: 'Durward Reynolds'},
        {id: 2, name: 'Kenton Towne'},
        {id: 3, name: 'Therese Wunsch'},
        {id: 4, name: 'Benedict Kessler'},
        {id: 5, name: 'Katelyn Rohan'},
    ]
    const images = ['https://source.unsplash.com/random', 'https://source.unsplash.com/random'];
    const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

    return (
        <TwoColumnContainer secondaryContent={<div>hello</div>}>
            {/*{*/}
            {/*    selectedData?.map(item => (*/}
            {/*        <div key={item.id}>{item.name}</div>*/}
            {/*    ))*/}
            {/*}*/}
            <ComboBox multiple={false} data={people} label='Single Select'/>
            <ComboBox multiple={true} data={people} label='Multi Select'/>
            <PostCard/>
            <div className="mt-6"></div>
            <PostCard/>
        </TwoColumnContainer>
    )
}
