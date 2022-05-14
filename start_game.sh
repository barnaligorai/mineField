echo '{"path":[2,6,10,11,15,19],"row":4,"col":4, "pos":2}' > mineField.json

game_state=$(grep 'Over' mineField.json)

while [[ $? -ne 0 ]];do
  read -p 'Enter your move : ' move
  node mineField.js $move
  game_state=$(grep 'Over' mineField.json)
done
