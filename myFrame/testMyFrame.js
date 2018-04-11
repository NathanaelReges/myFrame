scripts['myFrame/testMyFrame.js'] = function testMyFrame () {

    const onResponse = scripts['myFrame/myFrame.js'].onResponse
    const onNext = scripts['myFrame/myFrame.js'].onNext
    const onLast = scripts['myFrame/myFrame.js'].onLast

    let resultString = ''


    const arrayOfRequests = [
        ()=>{
            onResponse(() =>{
                testResult(1, 1)
            }, 'read')
        },
        ()=>{
            onResponse(()=>{
                testResult(1, 2)
            }, 'write')
        },


        ()=>{
            onNext(()=>{
                testResult(2, 1)
            }, 'read')
        },
        ()=>{
            onNext(()=>{
                testResult(2, 2)

                onNext(()=>{
                    testResult(3, 2)
                })

                onNext(()=>{
                    testResult(3, 3)
                })

                onLast(()=>{
                    testResult(4, 3)
                    showResult()
                })

                onNext(()=>{
                    testResult(3, 1)
                }, 'read')

            }, 'write')
        },
    

        ()=>{
            onLast(()=>{
                testResult(4, 1)
            }, 'read')
        },
        ()=>{
            onLast(()=>{
                testResult(4, 2)
            }, 'write')
        }
    ]


    console.log("In good conditions of temperature and pressure " + 
        "the difference in time expected for different animationFrames will match and the test will pass. " + 
        "As far as I know there isn't any other way to detect if two functions were called in different " + 
        "frames so that will have to do.")
   


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