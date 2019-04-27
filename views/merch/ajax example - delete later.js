if (document.getElementById('add-item')) {
		document.getElementById('add-item').addEventListener('click', function(e) {
			e.preventDefault()
			this.className = 'btn-floating halfway-fab waves-effect waves-light teal accent-4 right'
			// $(this).find('i:first').text('check')
			// fetch or ajax

			$.ajax({
				url: 'http://localhost:3000/cart/',
				method: 'POST',
				data: {
					userId: document.getElementById('hiddenUserId').getAttribute('value'),
				    merchId: document.getElementById('hiddenMerchId').getAttribute('value'),
				    size: document.getElementById('hiddenSize').getAttribute('value'),
				    sleeves: document.getElementById('hiddenSleeves').getAttribute('value')
				}
			})
			.success(res => {
				console.log('success', res)
			})
			.fail(err => {
				console.log('fail', err)
				// if response status is 401 then 
				location.href = '/auth/login'
			})
		})
	}