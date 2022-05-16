#! /bin/bash

echo '{"path":[3,13,23,33,34,35,36,46,56,57,67,77,87,86,96],"row":10,"col":10, "pos":3}' > mineField.json
node startGame.js 3

# echo '{"path":[2,5,6,9,6],"row":3,"col":3, "pos":2}' > mineField.json
# node startGame.js 2

game_state=$(grep 'Over' mineField.json)

until [[ $? -eq 0 ]];do
  read -p 'Enter your move : ' move
  node startGame.js $move
  game_state=$(grep 'Over' mineField.json)
done
