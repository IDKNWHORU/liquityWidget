# ABI 저장 관련

<aside>
💡 2안으로 채택

</aside>

1. near 컨트랙트로 ABI를 저장하는 방안

BOS에 내장되어 있는 [Near.call](http://Near.call) 형식으로 저장하고 Near.view 함수를 이용하여 불러오기

[NEAR API | NEAR Documentation](https://docs.near.org/ko/bos/api/near)

1. 필요한 ABI만 컨트랙트에 첨부하는 방안
- ABI : 고정값, 변동값 없음

문제 상황

컴포넌트 props에 ABI 넘기는 상황에서 publish나 save 할 때 비용이 발생
