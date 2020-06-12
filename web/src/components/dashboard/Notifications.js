
import React from 'react'

const Notifications = (props) => {
	const { notifications } = props

	return (
		<div className="notifications">
			<h2 className="mb--0">Notifications</h2>
			<small>5 Most Recent</small>
			<ul>
				{notifications && notifications.map(item => {
					return (
						<li key={item.id}>
							<div className="name text--capitalize">{item.user}</div>
							<div className="content">{item.content} on {item.time.toDate().toDateString()}</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Notifications