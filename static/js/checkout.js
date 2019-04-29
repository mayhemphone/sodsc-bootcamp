//STRIPE PURCHASE 
var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'auto',
    token: (token)=>{
        var items = []
        var cartItemsContainer = document.getElementsByClassName('striped')[0]
        var cartRows = document.getElementsByClassName('cart-row') 
        
        for (var i=0; i< cartRows.length; i++){
            var cartRow = cartRows[i]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var quantity = quantityElement.value
            var id = cartRow.dataset.itemId
        	var priceElement = document.getElementById('finalTotal')
        	total = parseFloat(priceElement.innerText.replace('$', ''))*100
            items.push({
                id: id,
                quantity: quantity
            })
        }
        let toSend = JSON.stringify({
                stripeTokenId: token.id,
                items: items,
                total: total
            })

        fetch('/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `main=${toSend}`
          
        }).then((res)=>{
        	console.log('')
        	console.log('')
        	console.log(items)
        	// console.log(res.json)
            return res.json()
        }).then((data)=>{
            alert(data.message)
            var cartItems = document.getElementsByClassName('striped')[0]
            while(cartItems.hasChildNodes()){
                cartItems.removeChild(cartItems.firstChild)
            }
            document.getElementById('order-summary').innerText =''
            cartItems.innerText = "Your order is complete! Thank you!"
            
        }).catch((err) => {
            console.log('Error in POST /checkout', err)
            console.log('')
        	console.log('')
        	console.log('items with error: ',items)
          })
    }
})


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
	document.getElementById('purchase').addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
    var priceElement = document.getElementById('finalTotal')
    console.log(priceElement)
    var price = parseFloat(priceElement.innerText.replace('$', '')) * 100
    console.log(price)
    stripeHandler.open({
        amount: price
    })
}


