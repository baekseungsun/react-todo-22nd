# 2주차 과제: React Todo
# 서론

안녕하세요 🙌🏻 22기 프론트엔드 운영진 **권동욱**입니다.

다들 1주차 미션 Vanilla Todo 만드시느라 수고 많으셨습니다! 1주차 미션을 통해 여러분들께서 본격적인 React 사용에 앞서 Vanilla JS로 SPA를 만들때의 불편한 점을 느끼셨을 것 이라 생각합니다.

그리하여 이번 미션은, 1주차 스터디 미션으로 주어진 Todo list 만들기를 **React**로 리팩토링하는 것 입니다!
기존에 리액트를 잘 아시던 분들께는, 조금 더 효울적인 디자인 패턴에 대해 고민할수 있는 주차가 될 것이고, 리액트를 제대로 접해보지 못하신 분들께는 기존의 어플리케이션을 리액트로 포팅하는 과정을 통해 왜 프론트엔드 시장에 리액트가 등장하게 되었고, 리액트에서 사용하는 여러가지 방식들이 왜 바닐라에 비해 효율적인지 꺠닫는 주차가 될 것이라 생각합니다.

비교적 가벼운 미션인 만큼 코드를 짜는 데 있어 여러분의 **창의성**을 충분히 발휘해보시기 바랍니다. _❕작동하기만 하면 되는 것보다 같은 코드를 짜는 여러가지 방식과 패턴에 대해 많이 고민해보시고, 본인이 작성할 수 있는 가장 창의적인 방법으로 코드를 작성해주셨으면 합니다.❕_ 여러분이 미션 수행을 하는 과정에서 한 생각과 고민만큼 스터디에서 더 많은 것을 얻어가실 수 있을 거라 기대합니다!  

또한, React 프로젝트를 생성하는 데 있어서 **Vite활용**이 필수입니다! 이유는 기존에 React 프로젝트를 생성하는 방법중 하나인 **Create React App**가 25년에 공식적으로 더 이상 지원되지 않는다고 발표했습니다. 그리고 추가적으로 공식문서에서도 Vite로 프로젝트를 생성하는 것을 권장하고 있고, 과제를 진행하면서 Vite를 활용한 프로젝트 환경 세팅과 Build Tool, 번들링 등의 지식을 습득하는 경험이 도움이 될 것이라 생각됩니다.

막히는 부분이 있더라도 우선 스스로 공부하고 찾아보면서 미션을 진행하는 방식을 권고드리지만, 미션과 관련하여 운영진의 도움이 필요하시다면 얼마든지 슬랙 Q&A 채널이나 프론트엔드 카톡방, 멘토에게 질문을 남겨 주세요!

# 미션

## 예시

- [리액트 투두 예시](https://react-todo-21th-snowy.vercel.app/)

## 미션 목표

- VSCode, Prettier를 이용하여 개발환경을 관리합니다.
- React의 기초를 이해합니다.
- React를 통한 어플리케이션 상태 관리 방법을 이해합니다.
- React Hooks에 대한 기초를 이해합니다. 
- Vite를 통한 React 프로젝트 개발환경 구축을 익힙니다.
- Styled-Components를 통한 CSS-in-JS 및 CSS Preprocessor의 사용법을 익힙니다.

## 기한

- 2025년 3월 22일 토요일 23:59까지

## Review Questions

- Virtual-DOM은 무엇이고, 이를 사용함으로서 얻는 이점은 무엇인가요?
- React.memo(), useMemo(), useCallback() 함수로 진행할 수 있는 리액트 렌더링 최적화에 대해 설명해주세요. 다른 방식이 있다면 이에 대한 소개도 좋습니다.
- React 컴포넌트 생명주기에 대해서 설명해주세요.

## 필수 요건
- 1주차 미션의 결과물을 그대로 React로 구현합니다. (‼️ todo / done 개수 잊지 마세요 ‼️)
- Styled-Component를 사용합니다.
- React Hooks만을 사용해 상태를 관리합니다.(전역 상태관리 라이브러리 사용 XX) 
- Vite를 활용하여 React 프로젝트 환경 구축을 진행합니다

## 선택 요건

- 기존 Todo-list에 여러분들이 추가하고 싶은 기능과 디자인을 자유롭게 추가해보세요. 
- TypeScript를 활용하여 프로젝트를 진행해보세요.

## 로컬 실행방법

`npm start` : 로컬에서 react application을 자동으로 리로드하여 실행시켜줍니다.

# 링크 및 참고자료

- [create react app (CRA)](https://create-react-app.dev/docs/getting-started/)
- [리액트 docs 주요 개념 1-12](https://react.dev/learn)
- [리액트 docs Hook 1-3](https://react.dev/reference/react)
- [리액트 useEffect 완벽 가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/)
- [컴포넌트 네이밍을 위한 자바스크립트 네이밍 컨벤션](https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8)
- [useState, useEffect hooks](https://velog.io/@velopert/react-hooks#1-usestate)
- [styled-component](https://styled-components.com/docs/basics#getting-started) 
- [create react app (CRA) 지원종료 공식문서](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) 
- [create react app 지원종료관련 okky 커뮤니티 게시글](https://okky.kr/articles/1527414) 
- [cra 대신에 vite로 React 프로젝트 시작하기](https://www.daleseo.com/vite-react/) 
- [Vite 실무 적용기 - 설명 + 프로젝트 설정](https://blog.hectodata.co.kr/bonjour-vite/)
