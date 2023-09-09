# Core System Architecture

<aside>
💡 https://github.com/liquity/dev#core-system-architecture
해당 챕터 일부 번역하였습니다.

</aside>

# 코어 시스템 아키텍쳐

코어 Liquity 시스템은 이더리움 블록체인에 배포할 수 있는 몇가지 스마트 컨트랙트로 구성되어 있습니다. 

모든 어플리케이션 로직과 데이터는 이러한 컨트랙트에 포함되어 있기 때문에 웹 서버에서 실행되는 별도의 데이터베이스나 백엔드 로직이 필요하지 않습니다. 사실상 이더리움 네트워크가 Liquity 백엔드 역할을 합니다. 따라서 모든 잔고와 컨트랙트 데이터는 공개 데이터입니다.

이 시스템은 관리자 키(admin key) 또는 거버넌스가 별도로 존재하지 않습니다. 시스템이 한번 배포되면, 완전히 자동화되고 탈중앙화되며 어떠한 사용자도 시스템에 대한 특별한 권한이나 통제권을 보유하지 않습니다.

세 가지 주요 컨트랙트인 `BorrowerOperations.sol, TroveManager.sol, StabilityPool.sol`은 사용자를 대상으로 하는 퍼블릭 함수와 대부분의 내부 시스템 로직을 포함하고 있습니다. 이 세 가지 컨트랙트는 함께 Trove  포지션 상태 업데이트와 시스템 내 ETH 및 LUSD 토큰의 이동을 제어합니다.

## [코어 스마트 컨트랙트 목록](https://github.com/liquity/dev#core-smart-contracts)

`BorrowerOperations.sol` - the `LQTYStaking` contract. 대출자가 자신의 Trove 포지션과 상호 작용하는 기본 기능을 포함합니다: Trove 생성, ETH 담보 추가 증액 / 출금, 스테이블 코인(LUSD) 발행 및 상환 기능이 있습니다. 또한 발행 수수료를 `LQTYStaking` 컨트랙트에 전송합니다. `BorrowerOperations` 함수는 `TroveManager` 함수를 호출하여 필요시 Trove 상태를 업데이트하도록 요청합니다. 또한 필요한 경우 다양한 풀로의 호출을 통해 풀이나 사용자간의 Ether/토큰 이동을 요청합니다.

`TroveManager.sol` - 청산 및 상환 기능을 포함합니다. 상환 수수료를 `LQTYStaking` 컨트랙트에 전송합니다. 또한 각 Trove의 상태, 즉 Trove 포지션의 담보와 부채 상태에 대한 기록을 포함합니다. `TroveManager` 는 가치(예: ETH/기타 토큰)를 보유하지 않습니다. `TroveManager` 함수는다양한 유동성 풀을 호출하여 필요시 유동성 풀 간의 ETH/토큰이 이동하도록 지시합니다.

`LiquityBase.sol` - `TroveManager`와 `BorrowerOperations` 모두 상위 컨트랙트인 LiquityBase에서 상속받으며, 이는 전역 상수와 몇 가지 공통 함수를 포함합니다.

`StabilityPool.sol` - 다음과 같은 안정성 풀(Stability Pool) 운영을 위한 기능을 포함합니다 : 예치, 복리 예치금 인출, ETH 및 LQTY 누적 수익 인출.

`LUSDToken.sol` - 스테이블 코인 토큰 컨트랙트로, EIP-2612으로 ERC-20 대체가능 토큰 표준을 구현하며, 안정성 풀과 0번째 주소(Address 0)과 같이 직접 이체를 통해 자금을 받아서는 안 되는 주소로의 (실수에 의한) 이체를 차단하는 메커니즘을 갖추고 있습니다. 이 컨트랙트에서 LUSD 토큰을 발행, 소각, 이체합니다.

`SortedTroves.sol` - 각각의 담보 비율(ICR)에 따라 Trove 소유자의 주소를 정렬하여 저장하는 이중 연결 리스트입니다. Trove 소유자의 ICR에 기반하여 Trove를 올바른 위치에 삽입하고 다시 삽입합니다.

`PriceFeed.sol` - 시스템이 담보 비율을 계산하는 데 사용하는 현재의 ETH:USD 가격을 얻는 기능을 포함합니다.

`HintHelpers.sol` - 대출자 운영과 상환에 제공될 정확한 Hint를 계산하기 위한 읽기 전용 기능을 포함하는 도우미 컨트랙트입니다.

## [개별 담보 비율(ICR)에 따른 Trove 정렬 리스트 유지하기](https://github.com/liquity/dev#keeping-a-sorted-list-of-troves-ordered-by-icr)

Liquity는 특정 데이터 구조에 의존합니다: 개별 담보 비율(ICR, 즉 USD로 표현된 담보량을 LUSD로 표현된 부채량으로 나눈 값)에 따라 정렬된 Trove의 양방향 연결 리스트입니다.

이 정렬 리스트는 가스 효율적인 상환 순서와 liquidateTroves 순서에 있어 중요하며, 이 두 가지 모두 ICR이 낮은 순서로 Trove를 대상으로 합니다.

정렬된 양방향 연결 리스트는 `SortedTroves.sol`에서 찾을 수 있습니다.

노드는 시스템의 활성 Trove에 매핑되며 - ID 속성은 Trove 소유자의 주소입니다. 리스트는 효율적인 O(1) 삽입을 위해 위치 힌트를 받아들입니다 - 자세한 내용은 [힌트](https://github.com/liquity/dev#supplying-hints-to-cdp-operations) 섹션을 참조하십시오.

ICR은 런타임에 동적으로 계산되며 노드에 저장되지 않습니다. 이는 활성 Trove의 ICR이 동적으로 변하기 때문인데, 다음과 같은 경우입니다:

ETH:USD 가격이 변하면, 모든 Trove의 담보의 USD가 변합니다
부채와 담보를 활성 Trove에 재분배하는 청산이 발생합니다
리스트는 청산으로 인한 담보와 부채의 재분배가 모든 활성 Trove의 순서를 유지한다는 사실에 의존합니다(비록 MCR 위의 각 활성 Trove의 ICR이 감소하더라도).

재분배가 발생해도 순서가 유지된다는 사실은 바로 명백하지 않습니다: 이 사항이 Liquity에서 유지되는 것을 보여주는 [수학적 증명](https://github.com/liquity/dev/blob/main/papers)을 참조하십시오.

현재 ICR에 기반하여 삽입된 노드는, 원시 담보와 부채가 변하지 않는 한, 청산 이익이 누적됨에 따라 동료에 대한 올바른 위치를 유지할 것입니다.

노드는 또한 ETH:USD 가격 변동에 따라 정렬된 상태를 유지합니다, 이는 가격 변동이 각 Trove의 담보 가치를 동일한 비율로 변화시키기 때문입니다.

따라서, 노드는 Trove 작업이 발생할 때 - 소유자가 담보나 부채를 추가하거나 제거할 때 - 정렬된 리스트에 재삽입되어야만 합니다.

## [Liquity 시스템 내 ETH 흐름](https://github.com/liquity/dev#flow-of-ether-in-liquity)

![image](https://github.com/teamGarlicUnicorn/LiquityWidget/assets/49608580/cf6499b5-9b20-4b58-aea7-af3195b4dbb9)

Liquity 시스템 내 ETH는 4가지 유동성 풀, 즉 the ActivePool, the DefaultPool, the StabilityPool and the CollSurplusPool 에 이어 LQTYStaking 컨트랙트에 관리됩니다.

어떠한 기능이 이루어지면, ETH는 3가지 중 한 방법으로 전송됩니다:

- 사용자에서 유동성 풀로
- 유동성 풀에서 사용자로
- 유동성 풀에서 다른 유동성 풀로

ETH 정보는 개별적으로 기록되지만, 유동성 풀에서 집계되어 저장됩니다. 담보와 부채가 있어 활성화된 Trove는 TroveManager에 그의 Ether 담보 액수를 uint 형태로 저장하는 struct 자료형이 있지만, 실제 ETH는 ActivePool 컨트랙트 잔고에 있습니다.

마찬가지로, StabilityPool은 모든 예치자에 대한 청산에서 발생한 총계적인 ETH 수익을 보유하고 있습니다.

LQTYStaking은 상환 수수료로부터 오는 ETH를 받습니다.

## [Liquity 시스템 내 LUSD 토큰 흐름도](https://github.com/liquity/dev#flow-of-lusd-tokens-in-liquity)

![image](https://github.com/teamGarlicUnicorn/LiquityWidget/assets/49608580/2f055322-f1e5-4a1e-914a-e164e4a47a90)

사용자가 생성한 Trove에서 부채 발행 시 LUSD 토큰은 사용자 주소로 발행되어 해당 Trove에 부채 정보가 기록됩니다. 반대로, 사용자가 Trove의 LUSD 부채를 상환하게 되면, 사용자 주소에서 LUSD가 소각되어 Trove의 부채가 감소합니다.

상환 과정에서는 상환자의 잔액에서 LUSD가 소각되고 상환된 Trove에 대한 부채가 줄어듭니다.

안정성 풀(Stability Pool)과 관련된 청산 작업은 안정성 풀 잔고에서 토큰을 소각하고 청산된 Trove의 LUSD 부채를 감소시킵니다.

LUSD가 한 Liquity 컨트랙트로부터 전송되거나 Liquity 컨트랙트로 전송되는 유일한 시점은 사용자가 LUSD를 안정성 풀에 예치하거나, 안정성 풀로부터 출금 시 이루어집니다.
