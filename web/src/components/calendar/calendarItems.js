import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { Button } from 'semantic-ui-react'

const CalendarItems = ({ name, left, Click, blocked, blockedobj, item, Click2, Element }) => {
	return (
		<Element name={name} className="block-days">
			{
				blocked ? (
					<div className="row block-days__row">
						<div className="col col--2 block-days__dates">
							{left}
						</div>
						<div className="col col--10 block-days__btns">
							<Button className="button button--full" onClick={() => Click(item)}>Unblock Day</Button>
						</div>
					</div>
				) : (
						<div className="row block-days__row">
							<div className="col col--2 block-days__dates">
								{left}
							</div>
							<div className="col col--10 block-days__btns">
								{!blockedobj && <Button onClick={() => Click(item)}>Block Day</Button>}
								<Button className={blockedobj ? "button--full" : ""} onClick={() => Click2(item)}>
									{blockedobj ? `${blockedobj.from}-${blockedobj.to} ` : "Block Hour"}
								</Button>
							</div>
						</div>
					)
			}
		</Element>
	)
}

export default CalendarItems