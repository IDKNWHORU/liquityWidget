개발 시 불편사항

# Near Contract vs Ethereum Contract

<aside>
💡 해결책 : 니어 내장 api 중, Ethers.js 라이브러리 사용

</aside>

[Ethers.js](https://github.com/teamGarlicUnicorn/LiquityWidget/blob/main/docs/Ethersjs.md)

Etherscan : Contract 업로드 시 verify(스마트 컨트랙트를 업로드한 개발자가 해당 컨트랙트의 소스 코드와 컴파일된 코드의 일치성을 검증하는 기능) 확인을 받으면 이더스캔 내부에서 컨트랙트 코드 조회 가능

[nearblocks](https://nearblocks.io/) : 컨트랙트 내부 코드 조회 불가능, 사용하고 싶은 컨트랙트의 퍼블릭 github repository 를 검색해야하는 번거로움이 있음.

![image](https://github.com/teamGarlicUnicorn/LiquityWidget/assets/49608580/0ff6f9a2-0438-4aed-906c-c1f6042dd0d2)

near([nearblocks.io](http://nearblocks.io/))

![image](https://github.com/teamGarlicUnicorn/LiquityWidget/assets/49608580/0d4e31c7-483e-4df6-9b77-1a462cc748f4)

![image](https://github.com/teamGarlicUnicorn/LiquityWidget/assets/49608580/e1e92c21-f25f-4bf2-98c5-cfd31ef93236)

# Developer Retrospective

1. Debugging 어렵
  - 개발자 의도대로 코드가 왜 실행이 안되는지 찾는 과정에서 console.log 일일이 확인해야함
2. Not support external Library
  - 기능별로 라이브러리가 여러개 있어서 선별해서 쓸수있었음
  - 외부 라이브러리를 임포트기능이 없어서 편리하게 쓰던걸 못써서 불편했다.
  > ex 지갑을 연결하거나 TX 보내는 상황
3. 스마트 컨트랙트 조회나 TX 보내는 중간 과정 (like encoding) 의
  - 불편한 작업들을 처리해줬는데  BOS 는 그렇지 않았다.
