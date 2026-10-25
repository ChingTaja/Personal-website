---
title: The Prisoner's Dilemma and Strict Dominance
---

- **Prisoner's Dilemma**: two people can each choose what is best for themselves and end up with an outcome that is worse for both
- **Strict Dominance**: one strategy produces a better outcome than another, regardless of what the opponent chooses

### The prisoner's dilemma scenario

Imagine two suspects have been arrested\
The police believe they attempted to rob a store\
But the evidence currently proves only trespassing

To prosecute them for a more serious offense, the police need one suspect to testify against the other

The suspects are placed in separate interrogation rooms and offered these terms:

1. **Neither confesses**: each receives one month in prison for trespassing
2. **One confesses and the other stays quiet**: the confessor is treated leniently for cooperating and goes free; the silent suspect receives twelve months
3. **Both confess**: both can be prosecuted for robbery and receive eight months each

Here is the question:\
If their only goal is to minimize their own time in prison, should they confess?

For now, assume **both suspects care only about their own interests**

### Organizing the information in a payoff matrix

There is a lot of information here, but we can condense it into a simple payoff matrix\
This is the prisoner's dilemma

There are two players, Player 1 and Player 2\
Each has two strategies:

- **Confess**
- **Keep quiet**

Different strategy combinations lead to different outcomes\
Game theory usually represents each player's payoff numerically

Here, prison time is expressed as a negative number, so **a larger number means a better outcome**

| Player 1 / Player 2 | Player 2 keeps quiet | Player 2 confesses |
| --- | --- | --- |
| **Player 1 keeps quiet** | (-1, -1) | (-12, 0) |
| **Player 1 confesses** | (0, -12) | (-8, -8) |

The first number in each cell is Player 1's payoff; the second is Player 2's

For example:

- **(-1, -1)**: both spend one month in prison
- **(-12, 0)**: Player 1 spends twelve months in prison; Player 2 goes free
- **(-8, -8)**: both spend eight months in prison

### Why should Player 1 confess?

How should Player 1 respond to Player 2's choice?

**Case 1: suppose Player 2 keeps quiet**

If Player 1 also keeps quiet, the sentence is one month, with a payoff of -1\
If Player 1 confesses, there is no prison time, with a payoff of 0

Because **0 > -1**\
Player 1 should confess when Player 2 keeps quiet

**Case 2: suppose Player 2 confesses**

If Player 1 keeps quiet, the sentence is twelve months, with a payoff of -12\
If Player 1 also confesses, the sentence is only eight months, with a payoff of -8

Because **-8 > -12**\
Player 1 should still confess when Player 2 confesses

Putting the cases together:\
Whether Player 2 confesses or keeps quiet, Player 1 gets a better outcome by confessing

We therefore say:

> Player one's confess strategy strictly dominates his keep quiet strategy

In general, if strategy X gives a higher payoff than strategy Y for every possible choice by the other players, X strictly dominates Y

A rational player should not choose a strictly dominated strategy\
If confessing is always better than keeping quiet, why choose to keep quiet?

### Why do both players end up confessing?

Having established Player 1's choice, consider Player 2\
The reasoning is exactly the same

**If Player 1 keeps quiet:**

- Player 2 keeps quiet: payoff -1
- Player 2 confesses: payoff 0

Player 2 should confess

**If Player 1 confesses:**

- Player 2 keeps quiet: payoff -12
- Player 2 confesses: payoff -8

Player 2 should still confess

Confessing also strictly dominates keeping quiet for Player 2

The result: **both players confess and each spends eight months in prison**

### Why does this result seem contradictory?

Wouldn't both staying quiet and spending one month in prison be better than both confessing and spending eight months? Why do they both confess anyway?

Yes, both keeping quiet would give each a better outcome

| Outcome | Player 1 | Player 2 |
| --- | --- | --- |
| Both keep quiet | -1 | -1 |
| Both confess | -8 | -8 |

The problem is that **each can improve their own outcome by changing strategy unilaterally**

Suppose both initially plan to keep quiet:

- Player 1 can switch to confessing and improve the payoff from -1 to 0
- Player 2 has exactly the same incentive

Even if they agree in advance to keep quiet, the agreement may not hold

Once separated in the interrogation rooms and faced with the actual decision, each has a reason to confess

This is the heart of the prisoner's dilemma: **individually rational choices can lead to a collectively worse outcome for both players**

These are the basic ideas behind the prisoner's dilemma and strict dominance
