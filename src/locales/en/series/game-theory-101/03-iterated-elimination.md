---
title: Iterated Elimination of Strictly Dominated Strategies
---

- **IESDS: repeatedly remove strategies that are worse regardless of what the opponent chooses, then continue analyzing the smaller game**

### 1. Revisiting the prisoner's dilemma

Both players eventually confess because confessing strictly dominates keeping quiet.

**Strict dominance:** a strategy gives a higher payoff regardless of the opponent's choice.

| Player 2's choice | Player 1 confesses | Player 1 keeps quiet | Better strategy |
| --- | --- | --- | --- |
| Keep quiet | 0 | -1 | Confess |
| Confess | -8 | -12 | Confess |

Since **0 > -1** and **-8 > -12**, Player 1 chooses to confess regardless of Player 2's choice. Player 2 faces the same reasoning.

### 2. Why do we need IESDS?

In most games, the best strategy depends on the opponent's choice. There may not be one strategy that is always best.

For example:

- Against Left, choose Up.
- Against Center, choose Middle.
- Against Right, choose Down.

We need another way to analyze such games.

**The basic procedure:**

1. Find a strictly dominated strategy.
2. Remove it.
3. Reconsider both players' choices using the remaining strategies.
4. Repeat until no further elimination is possible.

### 3. The original payoff matrix

Player 1 chooses a row; Player 2 chooses a column.

| Player 1 / Player 2 | Left | Center | Right |
| --- | --- | --- | --- |
| **Up** | (13, 3) | (1, 4) | (7, 3) |
| **Middle** | (4, 1) | (3, 3) | (6, 2) |
| **Down** | (-1, 9) | (2, 8) | (8, -1) |

**How to read the payoffs**

| Example | Meaning |
| --- | --- |
| (13, 3) | Player 1 receives 13; Player 2 receives 3 |
| (3, 3) | Each player receives 3 |
| (-1, 9) | Player 1 receives -1; Player 2 receives 9 |

Compare only the payoff belonging to the player being considered:

- Player 1: the first number in each cell.
- Player 2: the second number in each cell.

**Player 1's best responses**

| Player 2 chooses | Up | Middle | Down | Player 1's best response |
| --- | --- | --- | --- | --- |
| Left | 13 | 4 | -1 | **Up** |
| Center | 1 | 3 | 2 | **Middle** |
| Right | 7 | 6 | 8 | **Down** |

Player 1's best response changes with Player 2's choice. Unlike the prisoner's dilemma, we cannot immediately identify a strategy that is always best.

Use IESDS to reduce the game step by step.

### 4. Step 1: eliminate Player 2's Right

Compare Player 2's payoffs from Center and Right.

| Player 1 chooses | Center payoff | Right payoff | Better strategy |
| --- | --- | --- | --- |
| Up | 4 | 3 | Center |
| Middle | 3 | 2 | Center |
| Down | 8 | -1 | Center |

Center is better in every case:

**4 > 3, 3 > 2, 8 > -1**

Therefore, **Center strictly dominates Right**, so remove Right.

**Reduced matrix**

| Player 1 / Player 2 | Left | Center |
| --- | --- | --- |
| **Up** | (13, 3) | (1, 4) |
| **Middle** | (4, 1) | (3, 3) |
| **Down** | (-1, 9) | (2, 8) |

Player 2 now has only Left and Center.

### 5. Step 2: eliminate Player 1's Down

With Right removed, Player 1 only needs to consider the opponent's remaining Left and Center strategies.

Compare Player 1's payoffs from Middle and Down:

| Player 2 chooses | Middle payoff | Down payoff | Better strategy |
| --- | --- | --- | --- |
| Left | 4 | -1 | Middle |
| Center | 3 | 2 | Middle |

Middle is better in both cases:

**4 > -1, 3 > 2**

Therefore, **Middle strictly dominates Down**, so remove Down.

**Reduced matrix**

| Player 1 / Player 2 | Left | Center |
| --- | --- | --- |
| **Up** | (13, 3) | (1, 4) |
| **Middle** | (4, 1) | (3, 3) |

Each player now has two strategies, reducing the game to **2 × 2**.

### 6. Step 3: eliminate Player 2's Left

Player 1's Down is gone, so Player 2 only needs to consider Up and Middle.

Compare Player 2's payoffs from Center and Left:

| Player 1 chooses | Center payoff | Left payoff | Better strategy |
| --- | --- | --- | --- |
| Up | 4 | 3 | Center |
| Middle | 3 | 1 | Center |

Center is better in every remaining case:

**4 > 3, 3 > 1**

Therefore, **Center strictly dominates Left**, so remove Left.

**Reduced matrix**

| Player 1 / Player 2 | Center |
| --- | --- |
| **Up** | (1, 4) |
| **Middle** | (3, 3) |

Player 2 now has only Center.

### 7. Step 4: eliminate Player 1's Up

With only Center remaining for Player 2, Player 1 compares Up and Middle:

| Player 1's strategy | Payoff |
| --- | --- |
| Up | 1 |
| Middle | 3 |

Since **3 > 1**, Middle strictly dominates Up, so remove Up.

**Final matrix**

| Player 1 / Player 2 | Center |
| --- | --- |
| **Middle** | **(3, 3)** |

Only **Middle–Center** remains, giving each player a payoff of 3.

### 8. The full IESDS process

1. **Original game: 3 × 3** → eliminate Player 2's Right
2. **Remaining game: 3 × 2** → eliminate Player 1's Down
3. **Remaining game: 2 × 2** → eliminate Player 2's Left
4. **Remaining game: 2 × 1** → eliminate Player 1's Up
5. **Final result: Middle–Center, payoffs (3, 3)**

| Step | Eliminated strategy | Reason |
| --- | --- | --- |
| 1 | Player 2: Right | Center strictly dominates Right |
| 2 | Player 1: Down | Middle strictly dominates Down |
| 3 | Player 2: Left | Center strictly dominates Left |
| 4 | Player 1: Up | Middle strictly dominates Up |

### 9. Important concepts and limitations

| Concept | Explanation |
| --- | --- |
| Repeated elimination | Recheck remaining strategies after each removal |
| Rational inference | Assume players avoid strictly dominated strategies and use this to reason about the opponent's choices |
| Order of elimination | The order of eliminating strictly dominated strategies does not change the final surviving set |
| Limitations | Not every game has strictly dominated strategies, and elimination may not yield a unique result |
| Next concept | When IESDS cannot continue, consider Nash equilibrium |

Continue until no strictly dominated strategies remain.

