//Returns a # between two points based on the percentage finnished. 
function Animate(position, start, end)
{
    var withoutIntersept = end - start;
    
    withoutIntersept = withoutIntersept * position;
    withoutIntersept = withoutIntersept + start;
    
    return withoutIntersept;
}

//Returns a # between 0 and 1 based on how close the # is to the min # and the max #.
function Percent (minNumber, maxNumber, inputNumber)
{
    return (inputNumber - minNumber)/(maxNumber - minNumber);
}

//Turns 1D points into a 2D points
function Graph (xMin, xMax, yMin, yMax, points)
{
    //Finds the size of the Array
    var size = points[0].length;
    
    //Finds the difference between the min and max values
    var xDifference = xMax - xMin; 
    var yDifference = yMax - xMin;
    
    //Creates array for coordinates
    var coordinates = new Array (2);
    coordinates[0] = new Array ();
    coordinates[1] = new Array ();
    var coordCount = 0;

    //Changes the x coordinates into a decimal between 0 and 1
    for (var x = 0; x < size; x++)
    {
        points[0][x] = x/size;
        points[0][x] = Animate(points[0][x], xMin, xMax);
        points[1][x] = Animate(points[1][x], yMin, yMax);
    }
    
    //Creates the var for x coord count. 
    var count = 0; 
    
    //Goes through the x values
    for (var x = xMin; x < xMax + 1; x++)
    {
        //Checks if the current position is equal to one of the x values
        if (x == points[0][count])
        {
            //Checkes if the line needs to be based off of the x axis or the y axis
            if (Math.abs(points[0][x + 1] - points[0][x]) > Math.abs(points[1][x + 1] - points[1][x])) //If diff between 'x's is > than diff between 'y's.
            {
                for (var y = points[0][x]; y < points[0][x + 1]; y++)
                {
                    coordinates[0][coordCount] = y; //sets the coord x value
                    coordinates[1][coordCount] = Animate(Percent(points[0][x], points[0][x + 1], y), points[1][x], points[1][x + 1]); //sets the coord y value
                    coordCount++;
                }
            }
            else //If diff between 'x's is not > than diff between 'y's.
            {
                if (points[1][x + 1] - points[1][x] > 0) //If diff between 'y's is positive
                {
                    for (var y = points[1][x]; y < points[1][x + 1]; y++)
                    {
                        coordinates[0][coordCount] = Animate(Percent(points[1][x], points[1][x + 1], y), points[0][x], points[0][x + 1]);
                        coordinates[1][coordCount] = y;
                        coordCount++;
                    }
                }
                else
                {
                    for (var y = points[1][x]; y > points[1][x + 1]; y--)
                    {
                        coordinates[0][coordCount] = Animate(Percent(points[1][x], points[1][x + 1], y), points[0][x], points[0][x + 1]);
                        coordinates[1][coordCount] = y;
                        coordCount++;
                    }
                }
                
                coordCount++;
            }
            
            count++;
        }
    }
    
    return coordinates;
}