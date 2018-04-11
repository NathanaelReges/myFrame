# myframe

Just requestAnimationFrame with steroids.
 

### myFrame.requestResponse(function, stage)  
&ensp;request to call a function in the response frame
##### &ensp; args  
##### &ensp;&ensp; function  
&ensp;&ensp;&ensp;The function to be called  
##### &ensp;&ensp; stage  
&ensp;&ensp;&ensp;The stage wich the function will be called  
&ensp;&ensp;&ensp;"read" | "write"   defaults to write  
&ensp;&ensp;&ensp;Functions in the read stage are called first so recalculate Style is not forced  
