scripts['myFrame/testMyFrame.js'] = function testMyFrame () {

    const requestResponse = scripts['myFrame/myFrame.js'].requestResponse
    const requestNext = scripts['myFrame/myFrame.js'].requestNext
    const requestLast = scripts['myFrame/myFrame.js'].requestLast

    let resultString = ''


    const arrayOfRequests = [
        ()=>{
            requestResponse(() =>{
                testResult(1, 1)
            }, 'read')
        },
        ()=>{
            requestResponse(()=>{
                testResult(1, 2)
            }, 'write')
        },


        ()=>{
            requestNext(()=>{
                testResult(2, 1)
            }, 'read')
        },
        ()=>{
            requestNext(()=>{
                testResult(2, 2)

                requestNext(()=>{
                    testResult(3, 2)
                })

                requestNext(()=>{
                    testResult(3, 3)
                })

                requestLast(()=>{
                    testResult(4, 3)
                    showResult()
                })

                requestNext(()=>{
                    testResult(3, 1)
                }, 'read')

            }, 'write')
        },
    

        ()=>{
            requestLast(()=>{
                testResult(4, 1)
            }, 'read')
        },
        ()=>{
            requestLast(()=>{
                testResult(4, 2)
            }, 'write')
        }
    ]


    console.log("DISCLAIMER: In good contditions of tremperature and presssure the diference in time expected " +
        "for diferente animationFrames will match and as far as I know there isn't any other way to detect " +
        "if two functions were called in diferent frames so that will have to do.")
   


    let lastResult = false

    function testResult (frameNumber, funNumber) {
        const currResult = {frameNumber, funNumber, time: Date.now()}
        
        
        if(!lastResult) { //isEmpty  
            lastResult = currResult
            resultString += JSON.stringify(currResult) + ' ok first\n'
            return 
        }

            
        if(currResult.frameNumber < lastResult.frameNumber){
            console.log(currResult)
            throw "Frame in wrong order"

        }
        else if(currResult.frameNumber > lastResult.frameNumber){
            
            if(currResult.time - lastResult.time < 10){
                console.log(currResult)
                throw "This fun should be executed in another frame"

            }
            else {
                resultString += JSON.stringify(currResult) + ' ok newFrame\n'
            }

        }
        else {
            
            if(currResult.funNumber < lastResult.funNumber){
                console.log(currResult)
                throw "Function in wrong order"

                
            }
            else if(currResult.funNumber > lastResult.funNumber){
                
                if(currResult.time - lastResult.time > 10){
                    console.log(currResult)
                    throw "This fun either took too long or was executed in another frame but shouldn't be"
    
                }
                else {
                    resultString += JSON.stringify(currResult) + ' ok  newFun\n'
                }

            }
            else {
                console.log(currResult)
                throw "For some reason this function was executed twice"

            }

        }

        lastResult = currResult

    }

    
    shuffle(arrayOfRequests)

    arrayOfRequests.forEach(x=>x())

    function showResult () {
        document.body.innerText = resultString
    }


    function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
	}




}