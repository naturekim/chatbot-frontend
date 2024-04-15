import axios from "axios";
import { useEffect, useState } from "react";
import { TiMicrophoneOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/messageSlice";
import styled from "styled-components";

// 오디오녹음버튼, 텍스트 변환, 서버에 전송, 메세지 추가
function ChatForm() {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  let count = 0;
  const reply = [
    "청년소득세감면은 국세청에서 제공하는 혜택으로, 청년들의 소득세를 일정 부분 감면해주는 제도입니다. 신청 방법은 다음과 같습니다",
    "가상 환경을 사용할 때 주의할 점이 있는데, 가상 환경을 만들고 나서 폴더(디렉터리)를 다른 곳으로 이동시키면 활성화가 안 됩니다.",
    "가상 환경을 활성화할 때는 아나콘다 설치 폴더의 Scriptsactivate에 가상 환경 이름을 지정하여 실행해야 합니다",
  ];
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleRecord = () => {
    const recognition = new window.webkitSpeechRecognition();
    setTranscript("");
    setRecording(true);

    recognition.onstart = () => {
      setRecording(true);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onend = () => {
      setRecording(false);
      setProcessing(false);
    };

    recognition.start();
  };

  const handleChange = (event) => {
    setTranscript(event.target.value);
  };

  const handleAddMessage = (text) => {
    dispatch(addMessage(text));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transcript.trim() === "") return;

    // 유저 메세지 추가
    handleAddMessage({
      isReply: false,
      content: transcript,
    });

    setLoading(true);

    axios
      .post("http://localhost:5000/send-voc", {
        raw_data: transcript,
      })
      .then((결과) => {
        console.log("클릭");
        console.log(결과);
        // 상담원 메세지 추가
        handleAddMessage({
          isReply: true,
          content: 결과.data.messages,
        });
        setLoading(false); // 요청 완료 후 로딩 상태 변경
        // 스피커 출력
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(결과.data.messages);
        synth.speak(utterance);
      })
      .catch(() => {
        console.log("실패함");
        // 임시 코드
        // 상담원 메세지 추가
        handleAddMessage({
          isReply: true,
          content: reply[0],
        });
        count += 1;
        setLoading(false); // 요청이 실패한 경우에도 로딩 상태 변경
        // 스피커 출력
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(결과.data.messages);
        // \ 임시 코드
      });
    setTranscript("");
  };

  return (
    <div>
      {/* {recording ? "Recording..." : "Record"} */}
      {/* {processing && <p>Processing...</p>} */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <CircleButton onClick={handleRecord} disabled={recording || processing}>
        <TiMicrophoneOutline />
      </CircleButton>
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        value={transcript}
        placeholder="질문을 입력해주세요"
      />
      <button onClick={handleSubmit}>질문하기</button>
    </div>
  );
}

export default ChatForm;

const CircleButton = styled.button`
  padding: 0.9rem;
  border-radius: 3rem;
  color: ${(props) => (props.disabled ? "white" : "grey")};
  background: ${(props) => (props.disabled ? "#4180dd" : "none")};
  margin-right: 1rem;
  font-size: 1.5rem;

  &:hover {
    /* color: #4180dd; */
    /* background: none; */
  }
`;
