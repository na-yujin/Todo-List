'use client';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
type TodoList = { id: number; text: string; completed: boolean };
export default function TodoListPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoList[]>([]);
  const [editState, setEditState] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<string>('');
  const [listId, setListId] = useState<number>(0);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo === '') {
      return;
    }
    setTodos([...todos, { id: listId, text: todo, completed: false }]);
    setListId((listId) => listId + 1);
    setTodo('');
  };
  const onRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const onEdit = (id: number, newText: string) => {
    setEditState(id);
    setEditTodo(newText);
  };
  const onSave = (id: number) => {
    setTodos((event) =>
      event.map((todo) =>
        todo.id === id ? { ...todo, text: editTodo } : todo,
      ),
    );
    setEditState(null);
  };
  const toggleTaskCompleted = (id: number) => {
    setTodos((event) =>
      event.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      {loading ? (
        <h1 style={{ textAlign: 'center', paddingTop: 90 }}>
          loading~ ㅇ ㅅ ㅇ
        </h1>
      ) : (
        <TodoListWrapper>
          <Title>
            Todo-List <span>({todos.length}개의 할 일이 있음)</span>
          </Title>
          <TodoListInner>
            <InputWrapper onSubmit={onSubmit}>
              <Input
                value={todo}
                type="text"
                placeholder="입력해주세요"
                onChange={onChange}
              />
              <Button>
                <Image
                  src="/gosim.png"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
                <div>전송!</div>
                <Image
                  src="/gosim.png"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
              </Button>
            </InputWrapper>
            <div>
              <ContentItemWrapper>
                {todos.map((item) => (
                  <ContentItem key={item.id}>
                    {editState === item.id ? (
                      <EditForm
                        text={editTodo}
                        onChange={(event) => setEditTodo(event.target.value)}
                        onSave={() => onSave(item.id)}
                      />
                    ) : (
                      <DefaultForm
                        item={item}
                        onEdit={() => onEdit(item.id, item.text)}
                        onRemove={() => onRemove(item.id)}
                        onToggleTask={() => toggleTaskCompleted(item.id)}
                      />
                    )}
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

type DefaultFormProps = {
  item: TodoList;
  onEdit: () => void;
  onRemove: () => void;
  onToggleTask: () => void;
};

function DefaultForm(props: DefaultFormProps) {
  const { item, onEdit, onRemove, onToggleTask } = props;
  return (
    <TodoItemWrapper>
      <div>
        <input
          id={item.id.toString()}
          type="checkbox"
          defaultChecked={item.completed}
          onChange={onToggleTask}
        />
        <div>
          <label htmlFor={item.id.toString()}>{item.text}</label>
        </div>
      </div>
      <ButtonWrapper>
        <ButtonSub onClick={onEdit}>수정</ButtonSub>
        <ButtonSub onClick={onRemove}>삭제</ButtonSub>
        {/*{item.id}*/}
      </ButtonWrapper>
    </TodoItemWrapper>
  );
}

type EditFormProps = {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

function EditForm(props: EditFormProps) {
  const { text, onChange, onSave } = props;

  return (
    <TodoItemWrapper>
      <div>
        <input
          type="text"
          value={text}
          onChange={onChange}
          placeholder="수정해주세요"
        />
      </div>
      <ButtonWrapper>
        <ButtonSub onClick={onSave}>저장</ButtonSub>
      </ButtonWrapper>
    </TodoItemWrapper>
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

  > span {
    font-size: 16px;
    font-weight: 400;
    color: #505050;
    letter-spacing: -0.05rem;
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: 0.3s all;

  &:active {
    background: #179892;
  }
`;
const ContentItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
`;
const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 10px 20px;
  border-radius: 8px;
  background: #f3e8c7;
  color: #222;
  //&:before {
  //  content: '▶';
  //  font-size: 12px;
  //  position: absolute;
  //  transform: translateX(-20px);
  //}
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const ButtonSub = styled.button`
  padding: 5px 10px;
  border-radius: 8px;
  background: #ffb01b;
  color: #fff;
  border: none;
  font-weight: 700;
  cursor: pointer;
`;

const TodoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > div {
    display: flex;
    gap: 4px;
  }
`;
