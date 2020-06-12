import React, { Component, createContext } from 'react'
import { db } from '../config/fbConfig'

const DefaultState = {
	proActiveListings: [],
	filter: {}
}

const ProActiveListingsContext = createContext(DefaultState)

export const ProActiveListingsConsumer = ProActiveListingsContext.Consumer

export class ProActiveListingsProvider extends Component {

	static applyFilter(listings, filter) {
		const { businessCity, pph, name } = filter
		let result = listings
		if (pph) {
			console.log('here', pph, result);
			// result = result.filter(item => item.pph.startsWith(pph))
			result = result.filter(item => {
				var proRates = []
				item.ratesInPersonChef && proRates.push(parseInt(item.ratesInPersonChef))
				item.ratesOnlineChef && proRates.push(parseInt(item.ratesOnlineChef))
				item.ratesInPersonFitnessTrainer && proRates.push(parseInt(item.ratesInPersonFitnessTrainer))
				item.ratesOnlineFitnessTrainer && proRates.push(parseInt(item.ratesOnlineFitnessTrainer))
				item.ratesInPersonMassageTherapist && proRates.push(parseInt(item.ratesInPersonMassageTherapist))
				item.ratesOnlineMassageTherapist && proRates.push(parseInt(item.ratesOnlineMassageTherapist))
				item.ratesInPersonNutritionist && proRates.push(parseInt(item.ratesInPersonNutritionist))
				item.ratesOnlineNutritionist && proRates.push(parseInt(item.ratesOnlineNutritionist))
				// console.log('each', item, proRates, pph, proRates.some(el => el < pph))
				if (proRates.some(el => el < pph)) {
					return item
				}
				// item.ratesInPersonChef.some(el => el < pph)
			})
		}
		if (name) {
			result = result.filter(item => {
				if (item.firstName.toLowerCase().includes(name.toLowerCase()) || item.lastName.toLowerCase().includes(name.toLowerCase())) {
					return item
				}
			})
		}
		if (businessCity) {
			// console.log('city', businessCity, result);
			result = result.filter(item => {
				// console.log('here', businessCity, item.businessCity.toLowerCase().startsWith(businessCity));
				if (item.businessCity.toLowerCase().includes(businessCity.toLowerCase())) {
					return item
				}
			})
		}
		return result
	}

	state = DefaultState

	componentDidMount() {
		const $this = this;
		var allUsers = db.collection('users')

		allUsers.get()
			.then(collection => {
				const docs = collection.docs
				docs.forEach(function (doc) {
					if (doc.exists) {
						// console.log('data', doc.data().isPro);
						if (doc.data().isPro === true && doc.data().isApproved === true) {
							var pro = $this.state.proActiveListings.concat(doc.data())
							$this.setState({
								proActiveListings: pro
							})
						}
					} else {
						console.log('No doc exists!');
					}
				});
			}).catch(function (error) {
				console.log("Error getting collection:", error);
			});
	}

	getProByCity = city => {
		const { proActiveListings } = this.state
		return proActiveListings.find(pro => pro.businessCity === city)
	}

	updateFilter = filter => {
		this.setState({
			filter
		})
	}

	render() {
		const { children } = this.props
		const { proActiveListings, filter } = this.state

		const filteredListings = ProActiveListingsProvider.applyFilter(
			proActiveListings,
			filter
		)

		return (
			<ProActiveListingsContext.Provider
				value={{
					allListings: proActiveListings,
					proActiveListings: filteredListings,
					updateFilter: this.updateFilter,
					getProByCity: this.getProByCity
				}}
			>
				{children}
			</ProActiveListingsContext.Provider>
		)
	}

}