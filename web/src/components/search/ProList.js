import React from 'react'
import { Link } from 'react-router-dom'
import ProCard from './ProCard'

const ProList = ({ pros }) => {
	// console.log(pros)

	const profiles = pros && pros.map(pro => {
		// console.log(pro);
		const profileUrl = pro.username ? pro.username : pro.id;
		if (pro.isPro !== true || pro.isApproved !== true) { return null }
		return (
			<Link className={`pro-list__card col col--6`} to={'/pro/' + pro.uid} key={pro.id}>
				<ProCard pro={pro} />
			</Link>
		)
	})

	return (
		<div className="pro-list row">
			<input type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)} />
			{profiles}
		</div>
	)
}

export default ProList