import BaseCard from "../components/BaseCard";

function Message(props){
    return (
        <BaseCard className='message'>
            <h3>From: {props.sender}</h3>
            <h5>Title: {props.title}</h5>
            <p>Content: {props.content}</p>
        </BaseCard>
    );
}

export default Message;