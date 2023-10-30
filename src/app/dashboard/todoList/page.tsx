'use client';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

export default function TodoListPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo === '') {
      return;
    }
    setTodos((currentArray) => [todo, ...currentArray]);
    console.log(setTodos);
    reset();
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  const reset = () => {
    setTodo('');
  };
  return (
    <div>
      {loading ? (
        <h1 style={{ textAlign: 'center', paddingTop: 90 }}>
          loading~ ㅇ ㅅ ㅇ
        </h1>
      ) : (
        <TodoListWrapper>
          <Title>Todo-List</Title>
          <TodoListInner>
            <InputWrapper onSubmit={onSubmit}>
              <Input
                value={todo}
                type="text"
                placeholder="입력해주세요"
                onChange={onChange}
              />
              <Button>전송!</Button>
            </InputWrapper>
            <div>
              <ContentItemWrapper style={{ listStyle: 'none' }}>
                {todos.map((item, index) => (
                  <ContentItem style={{ display: 'flex' }}>
                    <div key={index}>{item}</div>
                    <div>
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  </ContentItem>
                ))}
              </ContentItemWrapper>
            </div>
          </TodoListInner>
        </TodoListWrapper>
      )}
    </div>
  );
}
const TodoListWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  padding-top: 80px;
`;
const Title = styled.h2`
  font-size: 22px;
  text-align: center;
  margin-bottom: 40px;
`;
const TodoListInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputWrapper = styled.form`
  display: flex;
  gap: 8px;
`;
const Input = styled.input`
  flex-grow: 4;
  width: 0;
  border-radius: 8px;
  border: 1px solid lightseagreen;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    opacity: 0;
  }
`;
const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background: lightseagreen;
  color: #fff;
  border: none;
  font-weight: 700;
  flex-grow: 1;
  width: 0;
  cursor: pointer;
`;
const ContentItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ContentItem = styled.div`
  //border: 1px solid lightseagreen;
  padding: 10px 0 10px 30px;
  border-radius: 8px;
  background: #f3e8c7;
  color: #222;
  &:before {
    content: '▶';
    font-size: 12px;
    position: absolute;
    transform: translateX(-20px);
  }
`;
