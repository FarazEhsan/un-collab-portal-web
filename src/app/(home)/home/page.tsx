'use client'

import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import SingleColumnContainer
    from '@/components/navigation/singleColumnContainer';
import CardSkeleton from "@/components/skeletons/card-skeleton";
import ListSkeleton from "@/components/skeletons/list-skeleton";
import DefaultSkeleton from "@/components/skeletons/default-skeleton";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import Radio from "@/components/form/Radio";

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

// Initialize Apollo Client
    const client = new ApolloClient({
        uri: 'http://localhost:5000/graphql', // replace with your server's URI
        cache: new InMemoryCache()
    });

// Define your query
    const QUERY = gql`
  {
  allusers {
  name
}
}
`;

// Fetch data
    client.query({query: QUERY})
        .then(response => console.log(response.data))
        .catch(error => console.error(error));


    return (
        <SingleColumnContainer>

            {/*<div className='mx-8 my-4'>*/}
            {/*    <div className='my-4'>*/}
            {/*        <h2>Typography:</h2>*/}
            {/*        <h1>Heading 1</h1>*/}
            {/*        <h2>Heading 2</h2>*/}
            {/*        <h3>Heading 3</h3>*/}
            {/*        <h4>Heading 4</h4>*/}
            {/*        <h5>Heading 5</h5>*/}
            {/*        <h6>Heading 6</h6>*/}
            {/*        <p>Paragraph</p>*/}
            {/*        <label>Label</label>*/}
            {/*    </div>*/}
            {/*    <div className='my-4'>*/}
            {/*        <h2>Buttons:</h2>*/}
            {/*        <Button classNames='mx-2'*/}
            {/*                colorType='primary'>Primary</Button>*/}
            {/*        <Button classNames='mx-2'*/}
            {/*                colorType='secondary'>Secondary</Button>*/}
            {/*        <Button classNames='mx-2'*/}
            {/*                colorType='danger'>Danger</Button>*/}
            {/*        <Button classNames='mx-2'*/}
            {/*                colorType='warning'>Warning</Button>*/}
            {/*    </div>*/}
            {/*    <div className='my-4'>*/}
            {/*        <h2>Form Elements:</h2>*/}
            {/*        <Input className='w-2/5' label='Input' name='input'*/}
            {/*               error={null}/>*/}
            {/*        <TextArea className='w-2/5' label='TextArea'*/}
            {/*                  name='textarea'*/}
            {/*                  error={null}/>*/}
            {/*        <Radio label='Radio'*/}
            {/*               subtitle='This is an optional subtitle'*/}
            {/*               name='radio' data={RadioData}*/}
            {/*               defaultChecked={RadioData[0].id}/>*/}
            {/*        <CheckBox label='Check Box'*/}
            {/*                  subtitle='This is an optional subtitle'*/}
            {/*                  name='checkboxs' data={CheckData}*/}
            {/*        />*/}
            {/*        <CommentTextArea label='Comment' name='comment'/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <CardSkeleton/>
            <ListSkeleton/>
            <DefaultSkeleton/>
        </SingleColumnContainer>
    )
}