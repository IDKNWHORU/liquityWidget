# **Project Structure**

<aside>
💡 https://github.com/liquity/dev#project-structure

</aside>

# Liquity 프로젝트 패키지 구조

## 디렉토리

- `papers` - 백서 및 수학 논문: Liquity의 Trove 포지션 순서 불변성 증명 내용 및 안정성 풀(Stability Pool) 스테이킹 공식 유도 내용이 포함되어 있습니다.
- `packages/dev-frontend/` - Liquity 프론트엔드 개발자를 위한 UI 패키지 : 개발 중 스마트 컨트랙트와의 인터페이스 역할을 위한 모든 기능을 갖춘 리액트 앱입니다.
- `packages/fuzzer/` - Liquity 미들웨어를 기반으로 한 간단하면서도 목적에 맞게 만들어진 도구 패키지로, 시스템과 무작위로 상호작용하기 위해서 사용됩니다.
- `packages/lib-base/` - 다른 `lib-` 패키지에서 공유하는 공통 인터페이스와 클래스가 포함됩니다.
- `packages/lib-ethers/` - Liquity 상태를 읽고 트랜잭션을 전송할 수 있는 [Ethers](https://github.com/ethers-io/ethers.js/) 라이브러리 기반 미들웨어입니다.
- `packages/lib-react/` - 리액트 기반앱이 Liquity 컨트랙트 상태를 조회 용도로 사용할 수 있는 Component와 [Hook](https://defineall.tistory.com/900#toc1)가 포함되어 있습니다.
- `packages/lib-subgraph/` - Liquity 상태를 읽을 수 있는 Liquity 서브그래프가 지원하는 [Apollo Client](https://github.com/apollographql/apollo-client) 기반 미들웨어입니다.
- `packages/providers/` - 프론트엔드에서 사용하는 Ethers 라이브러리 프로바이더의 서브 클래스 입니다.
- `packages/subgraph/` - 트랜잭션 히스토리 내역 같은 과거 데이터와 Liquity 상태 데이터를 조회하기 위한 [Subgraph](https://thegraph.com/) 입니다.
- `packages/contracts/` - 백엔드 개발 폴더로, Hardhat 프레임워크 프로젝트, 컨트랙트, 테스트 패키지를 포함하고 있습니다.
- `packages/contracts/contracts/` - Solidity로 작성된 코어 백엔드 스마트 컨트랙트가 포함되어 있습니다.
- `packages/contracts/test/` - Liquity 시스템의 자바 스크립트 기반 테스트 스위트입니다. 테스트는 Mocha/Chai에서 실행됩니다.
- `packages/contracts/tests/` - Liquity 시스템의 파이썬 기반 테스트 스위트입니다. 테스트는 Brownie에서 실행됩니다.
- `packages/contracts/gasTest/` - 다양한 시나리오 상황에서 Liquity 작업에 대한 가스비를 반환하는 비단정형 테스트입니다.
> 테스트 도중 특정 조건이 참인지를 확인하지 않는 테스트입니다. 테스트는 수행되나 테스트 결과에 따라 성공/실패가 결정되지 않습니다. 여기서는 다양한 시나리오에서 Liquity 작업 수행에 대한 가스비를 반환하지만, 이 값이 특정 기대값과 일치하는지 확인하지 않습니다.
이러한 테스트는 보통 성능 측정이나 벤치마킹 등, 특정 코드나 시스템의 행동을 관찰하거나 이해하는 데 도움이 될 수 있는 정보를 제공하는 데 사용됩니다.
- `packages/contracts/fuzzTests/` - Echidna 테스트와 단순한 "랜덤 작업" 테스트를 포함합니다.
- `packages/contracts/migrations/` - 스마트 컨트랙트를 블록체인에 배포하기 위한 Hardhat 스크립트가 포함되어 있습니다.
- `packages/contracts/utils/` - 외부 Hardhat 프레임워크 및 노드 스크립트 - 배포 도우미, 가스 계산기 등이 포함되어 있습니다.

백엔드 개발은 Hardhat 프레임워크에서 이루어지며, 빠른 컴파일과 테스트 실행을 위한 Hardhat EVM 네트워크에 Liquity를 배포할 수 있습니다.

## 깃헙 브랜치

2021년 1월 18일 현재, 작업 중인 현재 브랜치는 `main`입니다. `master` 는 최신 수정 사항을 포함하고 있지 않습니다.
