# **Liquidation and the Stability Pool**

<aside>
💡 https://github.com/liquity/dev#liquidation-and-the-stability-pool

</aside>

# 청산 및 안정성 풀(Stability Pool)

Liquity는 다음과 같은 우선순위로 2단계 청산 매커니즘을 활용합니다 :

1. LUSD 토큰을 포함한 안정성 풀(Stability Pool)을 이용하여, 담보 부족 Trove 포지션을 상쇄합니다
2. 안정성 풀이 비어있는 경우, 담보 부족 Trove를 다른 차입자(borrowers)에게 재분배합니다.

Liquity 시스템은 주로 안정성 풀에 있는 LUSD를 활용하여 담보 미달 부채를 흡수합니다. 즉, 청산된 차입자의 부채를 상환하는데 사용됩니다.

Liquity를 이용하는 사용자 누구나 안정성 풀에 LUSD 토큰을 예치할 수 있습니다. 이를 통해 청산된 Trove에서 담보를 얻을 수 있습니다. 청산이 일어나면, 청산된 부채는 안정성 풀에 있는 동일한 양의 LUSD와 같이 소각되며(결과적으로 소각됨), 청산된 ETH는 안정성 풀에 예치한 이용자들에게 그들이 LUSD를 입금한 만큼 비례하여 분배됩니다.

안정성 풀 예치자들은 청산으로 인한 순이익을 기대할 수 있습니다. 왜냐하면, 대부분의 경우에는 청산된 ETH의 가치는 청산된 부채의 가치보다 크기 때문입니다. (청산된 Trove 포지션은 ICR(individual collateralization ratio)이 110%보다 약간 낮을 가능성이 높기 때문입니다.)

청산된 부채가 안정성 풀의 LUSD 금액보다 높을 경우, Liquity 시스템은 가능한 많은 부채를 안정성 풀에 있는 토큰으로 취소할려고 한 다음, 남아있는 청산된 담보와 부채를 모든 활성 Trove에 재분배합니다.

누구든 전역 `liquidateTroves()`함수를 호출할 수 있으며, 이 함수는 담보 부족 Trove 포지션을 확인하고 청산할 수 있습니다. 또는 사용자 지정 Trove 주소 목록과 함께 `batchLiquidateTroves()` 를 호출하여 청산을 시도할 수 있습니다.
