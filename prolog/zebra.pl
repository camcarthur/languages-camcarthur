% The Zebra Puzzle: Who owns the zebra?
% There are five houses in different colors. In each house lives a person with a different nationality. Each person drinks a different beverage, smokes a different brand of cigarettes, and keeps a different pet. Your task is to find out who owns the zebra.

% Define the houses as a list of lists in Prolog
solve(ZebraOwner) :-
    Houses = [house(_, norwegian, _, _, _),
              house(blue, _, _, _, _),
              house(_, _, _, _, _),
              house(_, _, _, _, _),
              house(_, _, _, _, _)],
    member(house(red, brit, _, _, _), Houses),
    member(house(_, swede, _, _, dog), Houses),
    member(house(_, dane, tea, _, _), Houses),
    right_of(house(_, _, _, _, _), house(green, _, coffee, _, _), Houses),
    member(house(green, _, coffee, _, _), Houses),
    member(house(_, _, _, pall_mall, birds), Houses),
    member(house(yellow, _, _, dunhill, _), Houses),
    Houses = [_, _, house(_, _, milk, _, _), _, _],
    Houses = [house(_, norwegian, _, _, _)|_],
    next_to(house(_, _, _, blend, _), house(_, _, _, _, cats), Houses),
    next_to(house(_, _, _, dunhill, _), house(_, _, _, _, horse), Houses),
    member(house(_, _, beer, blue_master, _), Houses),
    member(house(_, german, _, prince, _), Houses),
    next_to(house(_, norwegian, _, _, _), house(blue, _, _, _, _), Houses),
    next_to(house(_, _, _, blend, _), house(_, _, water, _, _), Houses),
    member(house(_, ZebraOwner, _, _, zebra), Houses).

right_of(L, R, [L, R | _]).
right_of(L, R, [_ | Rest]) :-
    right_of(L, R, Rest).

next_to(A, B, List) :-
    right_of(A, B, List).
next_to(A, B, List) :-
    right_of(B, A, List).