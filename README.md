# PerlinNoiseLikeGenerator
Something that generates a perlin like noise. 

To open the generator, download the project and open the HTML document.

Directions are on the HTML document. 

There is no point in setting the array size larger than 8. The array size is determined by 2 rased to the power of the array size. 2 raised to the power of 8 is 256, and the size of the canvas is 256. Making the array size larger will have no effect on the output exept making the output take longer to generate. 

If you keep the array size at eight, and make the octaves less than or equal to eight, you will get a curved like look. If you keep the array size equal to the amount of octaves, the output will give a linear like look. When the noise is generated it uses a curve function to give it a smoother look. When the noise is displayed, 256 is divided by the size of the array. This will give the number of pixels that will be inbetween each array value. A linear function is used to draw inbetween the array values. So a high array value and will a low octave value should generate noise will some curves and if the values are close, the result should be linear. Note that you can not have a higher octave value than the array size and if it is, a message box will appear on the screen telling you that there is an error. 
