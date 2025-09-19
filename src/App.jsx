import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * { box-sizing: border-box; }  
    body { margin: 0; font-family: Arial, sans-serif; background: #e2e8f0; color:#0f172a;}  
    button { cursor: pointer; }
`;

//Styled components 이전 css파일에서 그대로 옮겨서 작성
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: white;
  padding: 14px 16px;
  position: relative;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 35px;
  font-weight: 600;
`;
const MenuBtn = styled.button`
  position: absolute;
  left: 16px;
  background: none;
  border: none;
  padding: 8px;
`;
const MenuIcon = styled.div`
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 24px;
    height: 2px;
    background: white;
    border-radius: 2px;
  }
  &::before {
    top: -10px;
  }
  &::after {
    top: 10px;
  }
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background: #e2e8f0;
  transform: translateX(${(p) => (p.open ? '0' : '-100%')});
  transition: transform 0.25s ease;
  z-index: 10;
`;
const DrawerInner = styled.nav`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 8px;
  font-size: 15px;
  position: relative;
  padding: 20px;
`;
const CloseBtn = styled.button`
  position: absolute;
  left: 20px;
  top: 15px;
  font-size: 30px;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
`;
const DrawerOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 110px;
  margin-top: 80px;
`;
const WeekBtn = styled.button`
  width: 120px;
  height: 30px;
  font-size: 16px;
  border-radius: 10px;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 30px;
`;
const DateBtn = styled.button`
  font-size: 20px;
  background: none;
  border: none;
`;
const TodayBtn = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  color: #0f172a;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px auto;
  background: #fff;
  border-radius: 20px;
  padding-left: 10px;
  width: 400px;
  height: 50px;
  align-items: center;
`;
const TextInput = styled.input`
  flex: 1;
  font-size: 23px;
  border: none;
  outline: none;
  background: none;
  color: #0f172a;
`;
const AddBtn = styled.button`
  font-size: 15px;
  width: 60px;
  height: 25px;
  border-radius: 13px;
  border: 2px solid black;
  background: #0f172a;
  color: white;
  margin-right: 6px;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 425px;
  width: 600px;
  margin: 0 auto;
  background: whitesmoke;
  border: 6px solid #0f172a;
  border-radius: 20px;
`;
const TopRow = styled.div`
  display: flex;
`;
const ClearBtn = styled.button`
  color: #0f172a;
  font-size: 20px;
  border-radius: 20px;
  width: 120px;
  margin: 5px 0 0 10px;
  background: #e2e8f0;
`;
const NumToDos = styled.div`
  line-height: 1.5;
  color: #0f172a;
  font-size: 18px;
  border-radius: 20px;
  width: 120px;
  margin-top: 5px;
  margin-left: auto;
  margin-right: 10px;
  background: #e2e8f0;
  border: 2px solid #0f172a;
  padding-left: 20px;
`;

const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 5px;
  max-height: 350px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  font-size: 26px;
`;

const LI = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 5px;
  border: 3px solid #0f172a;
  border-radius: 15px;
  width: 550px;
  background: #e2e8f0;
`;
const Txt = styled.span`
  margin-left: 10px;
  margin-right: auto;
  font-size: 20px;
`;
const SmallBtn = styled.button`
  border-radius: 20px;
  font-size: 15px;
  padding: 4px 10px;
  border: ${(p) => (p.outline ? '1px solid black' : 'none')};
  background: ${(p) => (p.solid ? '#0f172a' : 'none')};
  color: ${(p) => (p.solid ? 'white' : '#0f172a')};
`;
const DoneBtn = styled(SmallBtn)`
  background: ${(p) => (p.active ? 'grey' : '#0f172a')};
  color: ${(p) => (p.active ? 'black' : 'white')};
`;

const PinBtn = styled(SmallBtn)`
  background: ${(p) => (p.active ? 'crimson' : 'none')};
  color: ${(p) => (p.active ? 'white' : '#0f172a')};
`;



//Functions
const toDateKey = (d) => new Date(d).toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

export default function App() {
    // 날짜와 메뉴 상태
    const [current, setCurrent] = useState(() => new Date());
    const [open, setOpen] = useState(false);

    // 날짜별 todos 저장용
    const [byDate, setByDate] = useState(() => {
        return {};
    });

    // 현재 날짜의 todos
    const dateKey = toDateKey(current);
    const todos = byDate[dateKey] ?? [];

    // pin기준 정렬
    const sorted = useMemo(
        () => [...todos].sort((a, b) => Number(b.pinned) - Number(a.pinned)),
        [todos],
    );
    const total = todos.length;

    // 첫 로드 시
    useEffect(() => {
        const raw = sessionStorage.getItem(dateKey);
        if (raw) {
            try {
                const arr = JSON.parse(raw);
                setByDate((prev) => ({...prev, [dateKey]: arr}));
            } catch {
                /* ignore */
            }
        } else {
            setByDate((prev) => ({...prev, [dateKey]: []}));
        }
    }, []);

    // 날짜 바뀜에 따라 롣드
    useEffect(() => {
        const raw = sessionStorage.getItem(dateKey);
        if (raw) {
            try {
                const arr = JSON.parse(raw);
                setByDate((prev) => ({...prev, [dateKey]: arr}));
            } catch {
                setByDate((prev) => ({...prev, [dateKey]: []}));
            }
        } else {
            setByDate((prev) => ({...prev, [dateKey]: []}));
        }
    }, [dateKey]);


    //투두 추가
    const [text, setText] = useState('');
    const addTodo = useCallback(() => {
        const v = text.trim();
        if (!v) return;
        const next = [
            ...todos,
            { id: crypto.randomUUID?.() || String(Date.now()), text: v, done: false, pinned: false },
        ];
        setByDate((prev) => ({ ...prev, [dateKey]: next }));
        persist(next);
        setText('');
    }, [text, todos, dateKey, persist]);

    //제거
    const deleteTodo = useCallback(
        (id) => {
            const next = todos.filter((t) => t.id !== id);
            setByDate((prev) => ({ ...prev, [dateKey]: next }));
            persist(next);
        },
        [todos, dateKey, persist],
    );

    //전체삭제
    const clearAll = useCallback(() => {
        setByDate((prev) => ({ ...prev, [dateKey]: [] }));
        sessionStorage.removeItem(dateKey);
    }, [dateKey]);



}


