document.querySelectorAll('form.wpcf7-form[data-static-contact]').forEach(function (form) {
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var output = form.querySelector('.wpcf7-response-output');
		var submitBtn = form.querySelector('.wpcf7-submit');
		if (submitBtn) submitBtn.disabled = true;

		fetch(form.getAttribute('action'), {
			method: 'POST',
			body: new FormData(form),
			headers: { Accept: 'application/json' }
		})
			.then(function (res) {
				if (res.ok) {
					form.classList.remove('invalid');
					form.classList.add('sent');
					if (output) {
						output.textContent = 'Thank you for your message. It has been sent.';
						output.setAttribute('aria-hidden', 'false');
					}
					form.reset();
				} else {
					throw new Error('Form submission failed');
				}
			})
			.catch(function () {
				form.classList.add('invalid');
				if (output) {
					output.textContent = 'There was an error trying to send your message. Please try again later.';
					output.setAttribute('aria-hidden', 'false');
				}
			})
			.finally(function () {
				if (submitBtn) submitBtn.disabled = false;
			});
	});
});
