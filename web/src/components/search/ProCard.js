import React from 'react'

const ProCard = ({ pro }) => {
	console.log(pro);

	const renderImageURL = (photoURL, firstName, lastName) => {
		var pattern = /^((http|https|ftp):\/\/)/;
		if (!pattern.test(photoURL)) {
			// ref = storage.ref(`users/${user}/${image}`)
			return (null)
		}
		return (<img src={photoURL} alt={`Portrait of ${firstName} ${lastName}`} />)
	}

	const renderStartingCost = (online, inPerson) => {
		// const online = 
		return (
			<div>
				<h3><strong>Starting Cost Per Hour</strong></h3>
				<p>
					{online !== typeof undefined ? `$` + online + ` Online` : null}
					{inPerson !== typeof undefined ? ` $` + inPerson + ` In-Person` : null}
				</p>
			</div>
		)
	}

	return (
		<div className={`pro-card`}>
			<div className={`pro-card__inner`}>
				<div className={`pro-card__image`}>
					{renderImageURL(pro.photoURL, pro.firstName, pro.lastName)}
				</div>
				<div className={`pro-card__content`}>
					<h2 className={`pro-card__content-name`}>{pro.firstName} {pro.lastName}</h2>
					{pro.about ? pro.about.substring(0, 24) + '...' : null}
					{renderStartingCost(pro.ratesInPerson, pro.ratesOnline)}
				</div>
			</div>
		</div>
	)
}

export default ProCard