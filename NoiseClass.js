class Noise {
    
    //Gets the values from the noise
    constructor (size, detail, scale) {
        
        if (size == undefined) {
            
            size = 8;
        }
        else if (detail == undefined) {
            
            detail = size;
        }
        else if (scale == undefined) {
            
            scale = 1;
        }
        
        this.size = size;
        this.detail = detail;
        this.scale = scale;
        
        var randNoise;
        var perlinNoises = new Array(detail);
        var scaleNoise;
        var finalNoise;
        
        var frequency;
    }
    
    get RandNoise () {
        
        return this.randNoise;
    }
    set SRandNoise (x) {
        
        this.randNoise = x;
    }
    
    get PerlinNoise () {
        
        return this.perlinNoise;
    }
    set SPerlinNoise (x) {
        
        this.perlinNoise = x; 
    }
    
    get ScaleNoise () {
        
        return this.scaleNoise;
    }
    set SScaleNoise (x) {
        
        this.scaleNoise = x;
    }
    
    get FinalNoise () {
        
        return this.finalNoise;
    }
    set SFinalNoise (x) {
        
        this.finalNoise = x;
    }
    
    get Frequency () {
        
        return this.frequency;
    }
    set SFrequency (x) {
        
        this.frequency = x;
    }
    
    get Gsize () {
        
        return this.size;
    }
    get Gdetail () {
        
        return this.detail;
    }
    get Goctaves () {
        
        return this.octaves;
    }
    get Gscale () {
        
        return this.scale;
    }
    
    //Help functions
    Animate(position, start, end) {
        
        /* Returns a value between two points based on a value between 1 and 0 */
        
        var withoutIntersept = end - start;

        withoutIntersept = withoutIntersept * position;
        withoutIntersept = withoutIntersept + start;

        return withoutIntersept;
    }
    Percent (minNumber, maxNumber, inputNumber) {
        
        return (inputNumber - minNumber)/(maxNumber - minNumber);
    }
    Ease (x) {
        
        return (6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3));
    }
    
}

//Class for one dimensional arrays
class OneD extends Noise {
    
    constructor (size, detail, scale) {
        
        super(size, detail, scale);
    }
    
    gen () {
        
        //Calls all of the noise functions to generate it completly
        this.genNoise ();
        return this.genPerlin ();
        //this.findFrequency ();
        //this.genNoiseOctaves ();
        //return this.genNoiseScale ();
    }
    array (value) {
        
        /* Creates an array with the value in the function parameter*/
        
        //Creates the array
        var theArray = new Array (Math.pow(2, super.Gsize)); 
        
        //Sets the array
        if (value != undefined) {
            
            for (var x = 0; x < theArray.length; x++) {
                
                theArray[x] = value;
            }
        }
        
        //Returns the array
        return theArray;
    }
    
    genNoise () {
        
        /* Generates noise with every value a value between 1 and 0 */
        
        //gets the array
        var noiseArray = this.array();
        
        //Sets the values
        for (var x = 0; x < noiseArray.length; x++) {
            
            noiseArray[x] = Math.random();
        }
        
        //Returns the result and sets the noiseArray to the result. 
        super.SRandNoise = noiseArray;
        return noiseArray;
    }
    noise () {
        
        return super.RandNoise; 
    }
    
    genPerlin () {
        
        /* Generates perling like noise from random noise */ 
        
        //Creates array
        var perlinArray = this.array(0);
        
        var randomArray = super.RandNoise;

        //Goes through levels of detail
        for (var x = 0; x < super.Gdetail + 1; x++) {
            
            //Goes through the sections of the level of detail
            for (var y = 0; y < Math.pow(2, x); y++) {
                
                //Goes through different array position inbetween sections
                for (var z = (perlinArray.length)/(Math.pow(2, x)) * y; z < (perlinArray.length)/(Math.pow(2, x)) * (y + 1); z++) {
                    
                    perlinArray[z] = perlinArray[z] + super.Animate(super.Ease(super.Percent(perlinArray.length / (Math.pow(2, x)) * y, perlinArray.length/(Math.pow(2, x)) * (y + 1), z)), randomArray[perlinArray.length / (Math.pow(2, x)) * y], randomArray[(perlinArray.length / (Math.pow(2, x)) * (y + 1)) % perlinArray.length])/Math.pow(2, x);
                }
            }
        }
        
        //Makes it so that the values of the perlin noise is between 1 and 0
        var min = Math.min(...perlinArray);
        var max = Math.max(...perlinArray);

        for (var x = 0; x < perlinArray.length; x++) {

            perlinArray[x] = super.Percent(min, max, perlinArray[x]); 
        } 
        
        super.SPerlinNoise = perlinArray;
        return perlinArray;
    }
    perlin () {
        
        return super.PerlinNoise;
    }
    
    findFrequency (object) {
        
        if (object === undefined) {
            
            object = super.PerlinNoise;
        }
        var isGoingUp;
        var wasGoingUp = (object[0] < object[1]);
        var prevousVal = object[0];
        var frequency = 0;
        
        for (var x = 1; x < object.length; x++) {
            
            isGoingUp = prevousVal < object[x];
            if (isGoingUp != wasGoingUp) {
                
                frequency++;
                wasGoingUp = isGoingUp;
            }
            prevousVal = object[x];
        }
        return frequency;
    }
    
    genNoiseScale () {
        
        
    }
    noiseScale () {
        
        
    }
    
    GEase (num) {
        
        return super.Ease(num);
    }
}

//Class for two dimensional arrays
class TwoD extends Noise {
    
    constructor (size, detail, scale) {
        
        super(size, detail, scale);
    }
    
    gen () {
        
        this.genNoise ();
        return this.genPerlin ();
    }
    array (value) {
        
        var theArray = new Array (Math.pow(2, super.Gsize));
        for (var x = 0; x < theArray.length; x++) {
            
            theArray[x] = new Array (Math.pow(2, super.Gsize));
            if (value != undefined)
            {
                for (var y = 0; y < theArray.length; y++) {

                    theArray[x][y] = value;
                }
            }
        }
        
        return theArray;
    }
    
    //Creates an array for random values
    genNoise () {
        
        var noiseArray = new Array (Math.pow(2, this.size));
        for (var x = 0; x < noiseArray.length; x++) {
            
            noiseArray[x] = new Array (noiseArray.length);
            for (var y = 0; y < noiseArray.length; y++) {
                
                noiseArray[x][y] = Math.random();
            }
        }
        super.SRandNoise = noiseArray;
        return noiseArray;
    }
    noise () {
        
        return super.RandNoise; 
    }
    
    genPerlin () {
        
        var perlinArray = this.array(0);
        var randomArray = super.RandNoise;
        var minArray = this.array(0);
        var maxArray = this.array(0);
        
        for (var x = 0; x < super.Gdetail + 1; x++) {
            
            for (var yx = 0; yx < Math.pow(2, x); yx++) {
                
                for (var yy = 0; yy < Math.pow(2, x); yy++) {
                    
                    for (var zx = (perlinArray.length) / (Math.pow(2, x)) * yx; zx < (perlinArray.length) / (Math.pow(2, x)) * (yx + 1); zx++) {
                        
                        for (var zy = (perlinArray.length) / (Math.pow(2, x)) * yy; zy < (perlinArray.length) / (Math.pow(2, x)) * (yy + 1); zy++) {
                            
                            perlinArray[zx][zy] = perlinArray[zx][zy] + super.Ease(super.Animate(super.Percent((perlinArray.length) / (Math.pow(2, x)) * yy, (perlinArray.length) / (Math.pow(2, x)) * (yy + 1), zy), super.Animate(super.Percent((perlinArray.length) / (Math.pow(2, x)) * yx, (perlinArray.length) / (Math.pow(2, x)) * (yx + 1), zx), randomArray[(perlinArray.length) / (Math.pow(2, x)) * yx][(perlinArray.length) / (Math.pow(2, x)) * yy], randomArray[((perlinArray.length) / (Math.pow(2, x)) * (yx + 1))%perlinArray.length][((perlinArray.length) / (Math.pow(2, x)) * yy)%perlinArray.length]), super.Animate(super.Percent((perlinArray.length) / (Math.pow(2, x)) * yx, (perlinArray.length) / (Math.pow(2, x)) * (yx + 1), zx), randomArray[(perlinArray.length) / (Math.pow(2, x)) * yx][((perlinArray.length) / (Math.pow(2, x)) * (yy + 1))%perlinArray.length], randomArray[((perlinArray.length) / (Math.pow(2, x)) * (yx + 1))%perlinArray.length][((perlinArray.length) / (Math.pow(2, x)) * (yy + 1))%perlinArray.length])));
                        }
                    }
                }
            }
        }



        for (var x = 0; x < perlinArray.length; x++) {
            
            minArray[x] = Math.min(...perlinArray[x]);
        }
        var min = Math.min(...minArray);
        
        for (var x = 0; x < perlinArray.length; x++) {
            
            maxArray[x] = Math.max(...perlinArray[x]);
        }
        
        var max = Math.max(...maxArray);
        
        for (var x = 0; x < perlinArray.length; x++) {
            
            for (var y = 0; y < perlinArray.length; y++) {
                
                perlinArray[x][y] = super.Percent(min, max, perlinArray[x][y]);
            }
        }
        
        console.log(perlinArray);
        
        super.SPerlinNoise = perlinArray;
        return perlinArray;
    }
    perlin () {
        
        return super.PerlinNoise;
    }
}