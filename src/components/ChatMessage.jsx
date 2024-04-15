import styled from "styled-components";
import { useSelector } from "react-redux";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useEffect, useRef } from "react";

// 오디오 재생기능
function ChatMessage() {
  const messages = useSelector((state) => state.messages);
  const listRef = useRef(null);
  // const [isSpeaking, setIsSpeaking] = useState(false);

  //처음 렌더링 되거나 배열 값이 바뀔때마다 실행
  // useEffect(() => {
    // 리스트의 마지막 요소에 스크롤 위치 조정
  //   listRef.current.scrollTop = listRef.current.scrollHeight;
  // }, [messages]);

  return (
    <div ref={listRef}>
      {messages.map((message, index) =>
        message.isReply ? (
          <ReplyMessageComponent
            key={index}
            
            text={message.content}
          />
        ) : (
          <UserMessageComponent
            key={index}
            // ref={listRef}
            text={message.content}
          />
        )
      )}
    </div>
  );
}

export default ChatMessage;

const UserMessageComponent = ({ text }) => {
  return <UserMessage>{text}</UserMessage>;
};

const ReplyMessageComponent = ({ text }) => {
  return (
    <ReplyMessage>
      {text}
      <SmallButton
        onClick={() => {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(text);
          synth.speak(utterance);
        }}
      >
        <HiOutlineSpeakerWave />
      </SmallButton>
    </ReplyMessage>
  );
};

const Message = styled.div`
  display: flex;
  align-items: center;
  padding: 1.1rem;
  margin: 2rem;
  width: fit-content;
  line-height: 1.4rem;
  max-width: 500px;
  border-bottom-right-radius: 2rem;
  border-bottom-left-radius: 2rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const UserMessage = styled(Message)`
  background: white;
  color: #4180dd;
  border-top-right-radius: 2rem;
`;

const ReplyMessage = styled(Message)`
  background: #4180dd;
  color: white;
  border-top-left-radius: 2rem;
  /* 우측정렬 */
  margin-left: auto;
`;

const SmallButton = styled.button`
  margin: 0 0.5rem;
  font-size: 1.3rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
