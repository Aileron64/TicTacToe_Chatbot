
module.exports = class TicTacToe
{
    startGame()
    {
        this.board = new Array(3);
        this.board[0] = ["_", "_", "_"];
        this.board[1] = ["_", "_", "_"];
        this.board[2] = ["_", "_", "_"];

        this.draw = false;
    }

    makeAMove(input, fCallback)
    {
        if(!this.board)
        {
            this.startGame();
            fCallback(["Starting Game", this.drawBoard(),
            "Please enter a 1,2 or 3\n Followed by A,B or C", "example \'3A\'"]); 
            return;
        }

        let output = [];
        input = input.toUpperCase();

        let x, y;
        let inputError = false;

        //Parse user input
        switch(input)
        {
            default:
                inputError = true;
                output[0] = "Square Not Found";
                output[1] = "Please enter a 1,2 or 3\n Followed by A,B or C";
                output[2] = "example \'3A\'";
            break;

            case "1A":
            case "2A":
            case "3A":
                x = parseInt(input.charAt(0)) - 1; 
                y = 0;
                break;

            case "A1":
            case "A2":
            case "A3":
                x = parseInt(input.charAt(1)) - 1; 
                y = 0;
                break;

            case "1B":
            case "2B":
            case "3B":
                x = parseInt(input.charAt(0)) - 1; 
                y = 1;
                break;

            case "B1":
            case "B2":
            case "B3":
                x = parseInt(input.charAt(1)) - 1; 
                y = 1;
                break;

            case "1C":
            case "2C":
            case "3C":
                x = parseInt(input.charAt(0)) - 1; 
                y = 2;
                break;

            case "C1":
            case "C2":
            case "C3":
                x = parseInt(input.charAt(1)) - 1; 
                y = 2;
                break;
        }

        //Checks if input was valid
        if(!inputError)
        {
            if(this.board[x][y] == "_")
            {
                this.board[x][y] = "O";

                //Computer logic
                if(!this.checkWin())
                    output[1] = this.computerTurn();
            }
            else
                output[1] = "Square is already taken"
        }

        output[0] = this.drawBoard();

        if(this.checkWin())
        {
            output.push(this.checkWin() + " Wins");
            this.board = null;
        }
        else if (this.draw)
            this.board = null;
        
        setTimeout(() => { fCallback(output); }, 1000);      
    }

    computerTurn()
    {
        //Takes center if open
        if(this.board[1][1] == "_")
        {
            this.board[1][1] = "X";
            return "That was a mistake";
        }

        //Checks for potential win
        for(let i = 0; i < 3; i++)
        {
            for(let n = 0; n < 3; n++)
            {     
                if(this.board[i][n] == "_")
                {
                    this.board[i][n] = "X";

                    if(this.checkWin())
                        return "Pathetic";
                    else
                        this.board[i][n] = "_";
                }
            }
        }

        //Checks for your potential win
        for(let i = 0; i < 3; i++)
        {
            for(let n = 0; n < 3; n++)
            {
                if(this.board[i][n] == "_")
                {
                    this.board[i][n] = "O";

                    if(this.checkWin())
                    {
                        this.board[i][n] = "X";
                        return this.randomInsult();
                    }
                    else
                        this.board[i][n] = "_";
                }
            }
        }   

        let empty = [];

        //Picks a random corner
        for(let i = 0; i < 3; i += 2)
        {   
            for(let n = 0; n < 3; n += 2)
            {
                if(this.board[i][n] == "_")
                    empty.push({ x: i, y: n});
            }
        }

        if(empty.length == 0)
        {
            //Picks a random non corner if there all taken
            for(let i = 0; i < 3; i++)
            {
                for(let n = 0; n < 3; n++)
                {
                    if(this.board[i][n] == "_")
                    
                        empty.push({ x: i, y: n});
                }
            }   
        }

        if(empty.length > 0)
        {
            let r = parseInt(Math.floor(Math.random() * empty.length));
            this.board[empty[r].x][empty[r].y] = "X";
            return this.randomInsult();
        }
        else
        {
            //Its a draw if there are no more empty spaces
            this.draw = true;
            return "Its a draw";
        }
    }

    checkWin()
    {
        for (var i = 0; i < 3; i++)
        {
            //Check Rows
            if (this.board[0][i] == "O" && this.board[1][i] == "O" && this.board[2][i] == "O")
                return "O";
            
            if (this.board[0][i] == "X" && this.board[1][i] == "X" && this.board[2][i] == "X")
                return "X";

            //Check Columns
            if (this.board[i][0] == "O" && this.board[i][1] == "O" && this.board[i][2] == "O")
                return "O";

            if (this.board[i][0] == "X" && this.board[i][1] == "X" && this.board[i][2] == "X")
                return "X";
        }

        //Check Diagonals
        if ((this.board[0][0] == "O" && this.board[1][1] == "O" && this.board[2][2] == "O")
         || (this.board[2][0] == "O" && this.board[1][1] == "O" && this.board[0][2] == "O"))
            return "O";

        if ((this.board[0][0] == "X" && this.board[1][1] == "X" && this.board[2][2] == "X")
         || (this.board[2][0] == "X" && this.board[1][1] == "X" && this.board[0][2] == "X"))
            return "X";

        return false;
    }

    drawBoard()
    {
        return " - - - A - B - C\n" +
        " 1 - - " + this.board[0][0] + " |  " + this.board[0][1] + "  |  " + this.board[0][2] + "\n" +
        " -----------------\n" +
        " 2 - - " + this.board[1][0] + "  |  " + this.board[1][1] + "  |  " + this.board[1][2] + "\n" +
        " -----------------\n" +
        " 3 - - " + this.board[2][0] + "  |  " + this.board[2][1] + "  |  " + this.board[2][2];
    }

    randomInsult()
    {
        let insults = [
            "Typical",
            "That was questionable",
            "Really?",
            "This shouldn't be that hard",
            "Was that a accident?"
        ];

        return insults[Math.floor(Math.random() * insults.length)];
    }
}