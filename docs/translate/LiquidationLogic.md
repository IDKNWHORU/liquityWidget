# Liquidation Logic

<aside>
💡 https://github.com/liquity/dev#liquidation-logic

</aside>

# 청산 로직

청산의 정확한 동작 방식은 청산되는 Trove의 개별 청산 비율(ICR)과 전역 Liquity 시스템 조건에 의해 달라집니다. 여기서 전역 Liquity 시스템 조건은 Liquity 시스템의 총 담보 비율(TCR), 안정성 풀(Stability Pool)의 규모 등이 포함됩니다.

다음은 일반 모드(Normal Mode)와 리커버리 모드(Recovery Mode)에서 단일 Trove의 청산 로직입니다. `SP.LUSD` 변수는 안정성 풀에서 LUSD 토큰을 의미합니다.

## 일반 모드(Normal Mode)의 청산 로직 : TCR ≥ 150%

| 조건 | 청산 동작 방식 |
| --- | --- |
| ICR < MCR & SP.LUSD >= trove.debt |  Trove 부채에 해당하는 안정성 풀의 LUSD는 Trove 부채와 상쇄됩니다. Trove 포지션의 ETH 담보물은 안정성 풀 예치자 간 공유됩니다. |
| ICR < MCR & SP.LUSD < trove.debt | 안정성 풀의 총 LUSD가 Trove 부채와 동일한 금액으로 상쇄됩니다. Trove 담보 중 일부(전체 부채 대비 상쇄 부채의 비율과 동일)가 안정성 풀 예치자에게 분배됩니다. 잔여 부채와 담보(ETH 가스 보상비 제외)는 활성 Trove에 재분배됩니다. |
| ICR < MCR & SP.LUSD = 0 | ETH 가스 보상비를 제외한 모든 부채와 담보가 활성 Trove에 재분배됩니다. |
| ICR >= MCR | 청산 프로세스 미동작 |

## 리커버리 모드(Recovery Mode)의 청산 로직 : TCR < 150%

| 조건 | 청산 동작 방식 |
| --- | --- |
| ICR <=100% | ETH 가스 보상비를 제외한 모든 부채와 담보가 활성 Trove에 재분배됩니다. |
| 100% < ICR < MCR & SP.LUSD > trove.debt | Trove 부채에 해당하는 안정성 풀의 LUSD는 Trove 부채와 상쇄됩니다. Trove 포지션의 ETH 담보물은 안정성 풀 예치자 간 공유됩니다. |
| 100% < ICR < MCR & SP.LUSD < trove.debt | 안정성 풀의 총 LUSD가 Trove 부채와 동일한 금액으로 상쇄됩니다. Trove 담보 중 일부(전체 부채 대비 상쇄 부채의 비율과 동일)가 안정성 풀 예치자에게 분배됩니다. 잔여 부채와 담보(ETH 가스 보상비 제외)는 활성 Trove에 재분배됩니다. |
| MCR <= ICR < TCR & SP.LUSD >= trove.debt |  안정성 풀의 총 LUSD가 동일한 금액의 Trove의 부채로 상쇄됩니다. 1.1 * debt와 동일한 달러 가치의 ETH 담보물 일부가 안정성 풀 예치자들에게 분배됩니다. 타 활성 Trove는 재분배 해당사항이 없습니다.  개별 담보 비율이 1.1을 초과했기 때문에, 해당 Trove는 담보잔액이 남게되며, CollSurplusPool에 전송되어 차용자(대출자)가 청구 가능합니다. 이런 과정을 거친 후 해당 Trove 포지션은 종료됩니다. |
| MCR <= ICR < TCR & SP.LUSD < trove.debt | 청산 프로세스 미동작 |
| ICR >= TCR | 청산 프로세스 미동작 |
