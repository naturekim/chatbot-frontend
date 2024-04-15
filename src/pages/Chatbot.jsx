import { useState } from "react";
import styled from "styled-components";

import ChatForm from "../components/ChatForm";
import ChatMessage from "../components/ChatMessage";

// 구현사항
// 사용자의 질문 입력 받기(녹음버튼->텍스트 & 텍스트폼) -> 사용자의 질문 텍스트를 서버로 전송 -> 로딩화면표시 -> 서버로부터 답변 받기 -> 답변을 화면에 출력 및 오디오로 재생

function Chatbot() {
  return (
    <>
      <Layout>
        {/* 대화화면 */}
        <ChatMessage />
        {/* 하단 입력창 */}
        <ChatForm />
      </Layout>
      {/* <StatusMessage>상태표시 </StatusMessage> */}
    </>
  );
}

export default Chatbot;

const StatusMessage = styled.div`
  position: fixed;
  top: 80vh;
  margin: 0 auto;
  /* width: fit-content; */
  padding: 1rem;
  background: black;
  color: white;
  border-radius: 0.5rem;
`;

const Layout = styled.div`
  min-height: 1000vh;
  padding-top: 1rem;

  /* 하단 입력창 */
  > div:nth-child(2) {
    width: 100vw;
    position: fixed;
    bottom: 0;
    padding: 1rem 2rem;
    background: white;
    border-top: 1px solid #d5d5d5;
    display: flex;

    input {
      flex: 1;
    }
  }
`;
