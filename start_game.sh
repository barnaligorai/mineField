#! /bin/bash

# echo '{"path":[3,13,23,33,34,35,36,46,56,57,67,77,87,86,96],"row":10,"col":10, "pos":-7}' > mineField.json
echo '{"path":[2,5,6,9,6],"row":3,"col":3, "pos":-1}' > mineField.json

# Game instructions
echo -e 'Welcome to the minefield.\n\nInstructions : There are mines hidden in diffenernt positions, you have to cross the minefield without stepping on any bomb.\nThere is only one safe path. You can take one step at a time.\n\nYou can use these four keys to move :\n\tu : upward\tr : right\td : downward\tl : left\n\nYour initial position is given. Choose your steps carefully. Wish you all the best.'

# Start game
node startGame.js 'u'
game_status=$(grep 'Over' mineField.json)

until [[ $? -eq 0 ]];do
  echo -e 'u : upward\tr : right\td : downward\tl : left\n'
  read -p 'Enter your move : ' move
  node startGame.js $move
  game_state=$(grep 'Over' mineField.json)
done
