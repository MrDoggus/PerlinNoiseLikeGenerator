function Start ()
{
    var ctx = document.getElementById('canvas').getContext('2d');
    return ctx;
}

function Size()
{
    var size = new Array (4);
    size[0] = 0;
    size[1] = 256;
    size[2] = 0;
    size[3] = 256;
    return size;
}

//Makes a single point on the canvas
function DrawPixel (pixelx, pixely)
{
    var ctx = Start();
    ctx.fillRect(pixelx, pixely, 1, 1);
}

//Draws a line between two points
function drawLine (xPosOne, yPosOne, xPosTwo, yPosTwo)
{
    
    //Creates a varable to hold the length between PosOne and PosTwo
    var xTotal = xPosTwo - xPosOne;
    var yTotal = yPosTwo - yPosOne;
    
    //Holds the percent finnished with the line for the for loop. 
    var percent;
    
    if (yTotal/xTotal > 0)
    {
        if (yTotal/xTotal > 1) //greater than 1
        {
            //Generates the line
            for (var y = yPosOne; y < yPosTwo; y++)
            {
                percent = Percent(yPosOne, yPosTwo, y);
                DrawPixel(Animate(percent, xPosOne, xPosTwo), y);
            }
        }
        else // between 1 and 0
        {
            //Generates the line.
            for (var x = xPosOne; x < xPosTwo; x++)
            {
                percent = Percent(xPosOne, xPosTwo, x);
                DrawPixel(x, Animate(percent, yPosOne, yPosTwo));
            }
        }
    }
    else
    {
        if (yTotal/xTotal < -1) //less than -1
        {
            //Switches y positions
            var ytemp = yPosOne;
            yPosOne = yPosTwo;
            yPosTwo = ytemp;
            
            //Switches x positions
            var xtemp = xPosOne;
            xPosOne = xPosTwo;
            xPosTwo = xtemp;
            
            //Generates the line
            for (var y = yPosOne; y < yPosTwo; y++)
            {
                percent = Percent(yPosOne, yPosTwo, y);
                DrawPixel(Animate(percent, xPosOne, xPosTwo), y);
            }
        }
        else //between 0 and -1
        {
            //Generates the line
            for (var x = xPosOne; x < xPosTwo; x++)
            {
                percent = Percent(xPosOne, xPosTwo, x);
                DrawPixel(x, Animate(percent, yPosOne, yPosTwo));
            }
        }
    }
}

//Clears the Canvas
function ClearCanvas (xMin, xMax, yMin, yMax)
{
    var ctx = Start ();
    ctx.clearRect(xMin, yMin, xMax + 1, yMax + 1)
}