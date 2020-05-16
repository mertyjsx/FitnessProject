import React from 'react'
import { Link } from 'react-router-dom'
import ProCard from './ProCard'

const ProList = ({ pros }) => {
	// console.log(pros)
	return (
		<div className="pro-list row">
			{pros && pros.map(pro => {
				console.log(pro);
				const profileUrl = pro.username ? pro.username : pro.id;
				if (pro.isPro === false || pro.isApproved === false) { return null }
				return (
					<Link className={`pro-list__card col__6`} to={'/pro/' + profileUrl} key={pro.id}>
						<ProCard pro={pro} />
					</Link>
				)
			})}
		</div>
	)
}

export default ProList