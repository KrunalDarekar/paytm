const Balance = ({balance}) => {
    
    const formattBalace = (bal) => {
        let formattedBalace = "";
        let count = 0;
        while(bal) {
            const a = bal % 10;
            formattedBalace = String(a) + formattedBalace
            bal = Math.floor (bal/10)
            if(count == 2) {
                formattedBalace = "," + formattedBalace
            } else if ( count > 2 && count % 2 == 0 ) {
                formattedBalace = "," + formattedBalace
            }
            count++
        }
        if( formattedBalace[0] == ",") {
            formattedBalace = formattedBalace.slice(1)
        }
        return formattedBalace
    }

    return (
        <div className="text-lg font-bold flex px-6 mt-8 mb-4">
            <p className="mr-4">Your balance</p>
            <p>Rs {formattBalace(balance)}</p>
        </div>
    )
}

export default Balance