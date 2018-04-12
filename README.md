# myFrame

Just requestAnimationFrame with steroids. It is meant to help doing progressive loading of the page so showing content to the user as soon as possible and improving responsiveness.  
<br/>
**myFrame.onResponse(function, stage)**  
&ensp;Request to call a function in the response frame.  
 &ensp;&ensp; **function**  
&ensp;&ensp;&ensp;&ensp; The function to be called.  
&ensp;&ensp; **stage**  
&ensp;&ensp;&ensp;&ensp; The stage which the function will be called.  
&ensp;&ensp;&ensp;&ensp; "read" | "write"   defaults to "write".  
&ensp;&ensp;&ensp;&ensp; Functions in the read stage are called first so recalculate Style is not forced.  
 <br/>
**myFrame.onNext(function, stage)**  
&ensp;Request to call a function in the nextframe, which is the frame just after the response frame.  
&ensp;Works equals requestReponse().  
<br/>
**myFrame.onLast(function, stage)**  
&ensp;Request to call a function in the lastframe, which is the frame executed just after all the next frames are.  
&ensp;Works equals requestReponse().  
<br/> 
*If you request a frame in a function already running inside a frame and the requested frame was previously executed or is executing, a new frame is created and added to the stack of frames left and the stack will be consumed normally according to the priority order.
